import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../utills/redux/action';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { postApi } from '../../utills/api';
import { USER_API } from '../../utills/constant';
import { ManageError, ToastMessage } from '../../utills/common';
import ButtonSpinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import SelectBox from '../../components/common/SelectBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';

const options = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
];

const SignUpPage = ({ handleToggle }) => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'student',
    label: 'Student',
  });
  const navigateTo = useNavigate();
  const [loader, setLoader] = useState(false);
  const [pwdShow, setPwdShow] = useState({
    password: false,
    c_password: false,
  });

  const userRegistration = async data => {
    try {
      setLoader(true);
      const Response = await postApi(USER_API.SIGN_UP, data);
      setLoader(false);
      if (Response.statusCode == 200) {
        ToastMessage(Response.message, 's');
        handleToggle('login');
      } else {
        ToastMessage(Response.message);
      }
    } catch (error) {
      ManageError(error);
      setLoader(false);
    }
  };
  const changePwdShow = key => {
    setPwdShow({
      ...pwdShow,
      [key]: !pwdShow[key],
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      c_password: '',
      name: '',
      role: 'student',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      role: Yup.string().required('Role is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password:
        Yup.string()
          .required('Password is required.')
          .min(6, 'Password is too short - should be 6 chars minimum.')
          .matches(/[a-zA-Z0-9]{6,30}/, 'Password can only contain letters and numbers'),
      c_password: Yup.string()
        .required('Confirm password is required.')
        .oneOf([Yup.ref('password')], 'Passwords must match')

    }),
    onSubmit: values => {
      // dispatch(Login(values, Navigate));
      delete values.c_password;
      userRegistration(values);


    },
  });

  return (
    <>
      <AuthFormContainer
        title='Register your account'>
        <form onSubmit={formik.handleSubmit}>
          {[
            { title: 'Name', field: 'name', type: 'text' },
            { title: 'Email', field: 'email', type: 'email' },
            {
              title: 'Password',
              field: 'password',
              type: pwdShow['password'] ? 'text' : 'password',
            },
            {
              title: 'Confirm Password',
              field: 'c_password',
              type: pwdShow['c_password'] ? 'text' : 'password',
            },
            { title: 'Role', field: 'role', type: 'select' },
          ].map(({ title, field, type }, index) => {
            return (

              type === 'select' ?
                <SelectBox
                  key={index}
                  parentClass='auth-input-box'
                  value={selectedOption}
                  options={[...options]}
                  handleChange={e => {
                    setSelectedOption(e);
                    formik.setFieldValue(field, e.value);
                  }}

                />

                :
                <InputBox
                  key={index}
                  type={type}
                  title={title}
                  value={formik.values[field]}
                  placeholder={`Enter ${`${title}`.toLowerCase()}`}
                  name={field}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={{ show: formik.touched[field] && formik.errors[field], msg: formik.errors[field] }}
                  parentClass='auth-input-box'
                  labelClass='sr-only'
                  errorClass='form-error-text'
                  prepend={['password', 'c_password'].includes(field) &&
                    <div className='input-group-prepend'>
                      <span
                        className='input-group-text cursor-pointer'
                        id='inputGroupPrepend'
                        onClick={() => changePwdShow(field)}
                      >
                        <i
                          className={`fa fa-eye${pwdShow[field] ? '' : '-slash'
                            }`}
                        ></i>
                      </span>
                    </div>}
                />
            );
          })}

          <Button
            varient={'block'}
            disabled={loader}
            loader={loader}
            class_name='login-btn mb-4 mt-4'
            title="Sign Up"
            id='login'
          />
        </form>
        <p className='login-card-footer-text'>
          already have an account?{' '}
          <span
            className='text-reset cursor-pointer text-underline'
            onClick={() => handleToggle('login')}
          >
            Login here

          </span>


        </p>
      </AuthFormContainer>

    </>
  );
};

export default SignUpPage;
