import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ManageError, ToastMessage } from '../../utills/common';
import { publicpostApi } from '../../utills/api';
import { USER_API } from '../../utills/constant';
import ButtonSpinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';

const NewPasswordPage = ({ handleToggle }) => {
    const navigateTo = useNavigate();
    const getParams = useLocation()
    const [loader, setLoader] = useState(false)
    const [token, setToken] = useState('')
    const [pwdShow, setPwdShow] = useState({
        password: false,
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
            const response = await publicpostApi(USER_API.RENEW_PWD + token, data)
            setLoader(false)
            if (response.statusCode == 200) {
                ToastMessage(response.message, 's')
                navigateTo('/')
            } else {
                ToastMessage(response.message)

            }
        } catch (error) {
            setLoader(false)
            ManageError(error)
        }

    }
    const formik = useFormik({
        initialValues: {
            password: '',
            c_password: '',
        },
        validationSchema: Yup.object({
            password:
                Yup.string()
                    .required('Password is required.')
                    .min(6, 'Password is too short - should be 6 chars minimum.')
                    .matches(/[a-zA-Z0-9]{6,30}/, 'Password can only contain letters and numbers'),
            c_password: Yup
                .string()
                .required('Confirm password is required.')
                .oneOf([Yup.ref('password')], 'Passwords must match')

        }),
        onSubmit: values => {
            // dispatch(Login(values, Navigate));
            const body = {
                Password: values.password,
                ConfirmPassword: values.c_password
            }
            renewPassword(body)
        },
    });

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
                title='Set New Password'>
                <form onSubmit={formik.handleSubmit}>
                    {[
                        { title: 'Password', field: 'password', type: 'password' },
                        { title: 'Confirm Password', field: 'c_password', type: 'password' },
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
                        title="Submit"
                        id='login'
                    />
                </form>

                <p className="login-card-footer-text">
                    <span className="text-reset cursor-pointer text-underline" onClick={() => navigateTo('/')}>
                        Login here
                    </span>
                </p>
            </AuthFormContainer>

        </>
    );
};

export default NewPasswordPage;