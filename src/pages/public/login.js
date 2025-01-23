import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../utills/redux/action';
import { useDispatch } from 'react-redux'; 
import {   isBlankSpace, ManageError, ToastMessage } from '../../utills/common';
import { postApi } from '../../utills/api';
import { USER_API } from '../../utills/constant'; 
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';
import useForm from '../../utills/hooks/formValidationHook';

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
  const initialValues = {
    email: "",
    password: "",
  }
  const validate = (formValues) => {
    const errors = {};  
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
    return errors;
  };

  const { values , errors,setFieldTouch,  handleChange, handleBlur, handleSubmit } = useForm(
    initialValues,
    validate
  );
  useEffect(() => {
    setEmail(values.email);
  }, [values.email]);
  return (
    <>
      <AuthFormContainer
        title='Sign into your account'>

        <form onSubmit={(e) => { e.preventDefault(); setFieldTouch('all', true); handleSubmit(() => userLogin(values)) }}>
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
                value={values[field]}
                placeholder={`Enter ${`${title}`.toLowerCase()}`}
                name={field}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={{ show: errors[field], msg: errors[field] }}
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
