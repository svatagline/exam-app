import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../utills/redux/action';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserInfo, ManageError, ToastMessage } from '../../utills/common';
import { postApi } from '../../utills/api';
import { USER_API } from '../../utills/constant';
import ButtonSpinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';

const LoginPage = ({ handleToggle, setEmail }) => {
  const navigateTo = useNavigate();
  const navigateToDashboard = (url) => navigateTo(url);
  const [loader, setLoader] = useState(false);
  const [pwdShow, setPwdShow] = useState(false);
  const dispatch = useDispatch();

  const userLogin = async data => {
    try {
      setLoader(true);
      const loginResponse = await postApi(USER_API.LOGIN, data);
      setLoader(false);

      if (loginResponse.statusCode == 200) {
        ToastMessage(loginResponse.message, 's');
        localStorage.setItem('user', JSON.stringify(loginResponse.data));
        dispatch(Login(loginResponse.data));
        if (loginResponse?.data?.role == 'teacher') {
          navigateToDashboard('/examList')
        } else {
          navigateToDashboard('/applyExam')
        }
      } else {
        ToastMessage(loginResponse.message);
      }
    } catch (error) {
      ManageError(error);
      setLoader(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-zA-Z0-9]{6,30}/, 'Password can only contain letters and numbers'),
    }),
    onSubmit: values => {
      // dispatch(Login(values, Navigate));
      userLogin(values);
    },
  });
  useEffect(() => {
    setEmail(formik.values.email);
  }, [formik.values.email]);
  return (
    <>
      <AuthFormContainer
        title='Sign into your account'>

        <form onSubmit={formik.handleSubmit}>
          {[
            { title: 'Email', field: 'email', type: 'email' },
            {
              title: 'Password',
              field: 'password',
              type: pwdShow ? 'text' : 'password',
            },
          ].map(({ title, field, type }, index) => {
            return (

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
                errorClass='form-error-text'
                labelClass='sr-only'
                prepend={field === 'password' &&
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text cursor-pointer'
                      id='inputGroupPrepend'
                      onClick={() => setPwdShow(!pwdShow)}
                    >
                      <i
                        className={`fa fa-eye${pwdShow ? '' : '-slash'
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
            title="Login"
            id='login'
          />
        </form>
        <span
          className='forgot-password-link cursor-pointer text-underline'
          onClick={() => handleToggle('forgotpwd')}
        >
          Forgot password?
        </span>
        <p className='login-card-footer-text'>
          Don't have an account?{' '}
          <span
            className='text-reset cursor-pointer text-underline'
            onClick={() => handleToggle('signup')}
          >
            Register here
          </span>
        </p>
      </AuthFormContainer>

    </>
  );
};

export default LoginPage;
