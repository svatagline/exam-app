import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../utills/redux/action';
// import { postApi } from '../utills/common';
import { useDispatch } from 'react-redux';
import LoginPage from './login';
import SignUpPage from './signup';
import ForgotPasswordPage from './forgotPassword';
// import { apiCall, Login } from '../utills/redux/action';
// import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigateTo = useNavigate();
  const Navigate = () => navigateTo('/dashboard');
  const [email,setEmail]= useState("")
  const [currentPage, setCurrentPage] = useState('login')


  const handleToggle = (page) => {
    if (page) {
      setCurrentPage(page)
    }
  };
  return (
    <>
      {

        currentPage == 'signup' ? <SignUpPage
          handleToggle={handleToggle}
        /> :
        currentPage == 'forgotpwd' ? <ForgotPasswordPage
          handleToggle={handleToggle}
          email={email}
        /> :
          <LoginPage
            handleToggle={handleToggle}
            setEmail={setEmail}
          />
      }

    </>
  );
};

export default AuthPage;