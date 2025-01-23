import React, { useState } from 'react';
import { postApi } from '../../utills/api';
import { USER_API } from '../../utills/constant';
import { isBlankSpace, ManageError, ToastMessage } from '../../utills/common';
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import SelectBox from '../../components/common/SelectBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';
import useForm from '../../utills/hooks/formValidationHook';

const options = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
];

const SignUpPage = ({ handleToggle }) => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'student',
    label: 'Student',
  });
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



  const onRegister = (values) => {
    const allValues = { ...values };
    delete allValues.c_password;
    userRegistration(allValues);
  }
  const initialValues = {
    email: '',
    password: '',
    c_password: '',
    name: '',
    role: 'student',
  }
  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = "Name is required.";
    } else if (!isBlankSpace(formValues.name)) {
      errors.name = "Name cannot be blank or contain only spaces.";
    }
    if (!formValues.role) {
      errors.role = "Role is required.";
    } else if (!isBlankSpace(formValues.role)) {
      errors.role = "Role cannot be blank or contain only spaces.";
    }
    if (!formValues.email) {
      errors.email = "Email is required.";
    } else if (!isBlankSpace(formValues.email)) {
      errors.email = "Email cannot be blank or contain only spaces.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Invalid email address.";
    }
    if (!formValues.password) {
      errors.password = "Password is required.";
    } else if (!isBlankSpace(formValues.password)) {
      errors.password = "Password cannot be blank or contain only spaces.";
    } else if (`${formValues.password}`.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (!/[a-zA-Z0-9]{6,30}/.test(formValues.password)) {
      errors.password = "Password can contain first 6 letters and numbers.";
    }
    if (!formValues.c_password) {
      errors.c_password = "Confirm password is required.";
    } else if (formValues.c_password !== values.password) { 
      errors.c_password = "Confirm password should be match with password.";
    }
    return errors;
  };

  const { values, setFieldValue, errors, handleChange,setFieldTouch, handleBlur, handleSubmit } = useForm(
    initialValues,
    validate
  );
  return (
    <>
      <AuthFormContainer
        title='Register your account'>
        <form onSubmit={(e) => { e.preventDefault(); setFieldTouch('all', true); handleSubmit(() => onRegister(values)) }}>
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
                    setFieldValue(field, e.value);
                  }}

                />

                :
                <InputBox
                  key={index}
                  type={type}
                  title={title}
                  value={values[field]}
                  placeholder={`Enter ${`${title}`.toLowerCase()}`}
                  name={field}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={{ show: errors[field], msg: errors[field] }}
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
