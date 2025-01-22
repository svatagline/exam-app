import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import {   useSelector } from 'react-redux'; 
import { isBlankSpace, logOut, ManageError, ToastMessage } from '../../utills/common';
import {  privetpostApi,  } from '../../utills/api';
import { USER_API } from '../../utills/constant'; 
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';
import useForm from '../../utills/hooks/formValidationHook';

const ResetPasswordPage = () => {
    const getParams = useLocation()
    const navigateTo = useNavigate();
    const [loader, setLoader] = useState(false)
    const [token, setToken] = useState('')
    const userData = useSelector(state => state.globalState.user);
    const [pwdShow, setPwdShow] = useState({
        password: false,
        n_password: false,
        c_password: false,
    })


    const changePwdShow = (key) => {
        setPwdShow({
            ...pwdShow,
            [key]: !pwdShow[key]
        })
    }
    const renewPassword = async (data) => {
        setLoader(true)

        try {
            const response = await privetpostApi(USER_API.RESET_PWD, data, userData)

            setLoader(false)
            if (response.statusCode == 200) {
                ToastMessage(response.message, 's')
                logOut()
            } else {
                ToastMessage(response.message)

            }
        } catch (error) {
            setLoader(false)
            ManageError(error)
        }
    }
   

    const onReset = (values) => {
        const body = {
            oldPassword: values.password,
            Password: values.n_password,
            ConfirmPassword: values.c_password
        }
        renewPassword(body)
    }

    const initialValues = {
        password: '',
        n_password: '',
        c_password: '',
    }
    const validate = (formValues) => {
        const errors = {};

        if (!formValues.password) {
            errors.password = "Password is required.";
        } else if (!isBlankSpace(formValues.password)) {
            errors.password = "Password cannot be blank or contain only spaces.";
        } else if (`${formValues.password}`.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        } else if (!/[a-zA-Z0-9]{6,30}/.test(formValues.password)) {
            errors.password = "Password can contain first 6 letters and numbers.";
        }
        if (!formValues.n_password) {
            errors.n_password = "New password is required.";
        } else if (!isBlankSpace(formValues.n_password)) {
            errors.n_password = "New password cannot be blank or contain only spaces.";
        } else if (`${formValues.n_password}`.length < 6) {
            errors.n_password = "New password must be at least 6 characters.";
        } else if (!/[a-zA-Z0-9]{6,30}/.test(formValues.n_password)) {
            errors.n_password = "New password can contain first 6 letters and numbers.";
        }
        if (!formValues.c_password) {
            errors.c_password = "Confirm password is required.";
        } else if (formValues.c_password !== values.n_password) {
            errors.c_password = "Confirm password should be match with new password.";
        }
        return errors;
    };

    const { values,   errors, handleChange, handleBlur, handleSubmit } = useForm(
        initialValues,
        validate
    );
    useEffect(() => {
        if (getParams && getParams?.search) {
            const allParams = getParams.search.split("?")
            allParams.forEach((param) => {
                if (param.includes('token=')) {
                    setToken(param.split('=')[1])
                }
            })
        }

    }, [getParams])
    return (
        <>
            <AuthFormContainer
                title='Reset Password'
                navigationElement={
                    <div onClick={() => navigateTo(-1)} className='go-back  cursor-pointer'><i className={`fa fa-arrow-left`}></i> Go back page </div>
                }
            >  
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(() => onReset(values)) }}>
                    {[
                        { title: 'Current Password', field: 'password',  type: pwdShow['password'] ? 'text' : 'password', },
                        { title: 'New Password', field: 'n_password',  type: pwdShow['n_password'] ? 'text' : 'password', },
                        { title: 'Confirm Password', field: 'c_password',  type: pwdShow['c_password'] ? 'text' : 'password', },
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
                                error={{ show:  errors[field], msg: errors[field] }}
                                parentClass='auth-input-box'
                                labelClass='sr-only'
                                errorClass='form-error-text'
                                prepend={['password', 'c_password', 'n_password'].includes(field) &&
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
                        title="Submit"
                        id='login'
                    />
                </form>
            </AuthFormContainer>

        </>
    );
};

export default ResetPasswordPage;