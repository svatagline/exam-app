import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastMessage } from '../../utills/common';
import { postApi } from '../../utills/api';
import { USER_API } from '../../utills/constant';
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';

const ForgotPasswordPage = ({ handleToggle, email }) => {
    const [loader, setLoader] = useState(false)
    const userLogin = async (data) => {
        setLoader(true)
        const response = await postApi(USER_API.FORGOT_PWD, data)
        setLoader(false)

        if (response.statusCode == 200) {
            ToastMessage(response.message, 's')
            handleToggle('/')
        } else {
            ToastMessage(response.message)
        }
    }
    const formik = useFormik({
        initialValues: {
            email: email
        },
        validationSchema: Yup.object({

            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: values => {
            // dispatch(Login(values, Navigate));
            userLogin(values)

        },
    });
    return (
        <>
            <AuthFormContainer
                title='Forgot Password'>

                <form onSubmit={formik.handleSubmit}>
                    {[
                        { title: 'Email', field: 'email', type: 'email' },
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
                    <span className="text-reset cursor-pointer text-underline" onClick={() => handleToggle('login')}>
                        Login here
                    </span>
                </p>
            </AuthFormContainer>


        </>
    );
};

export default ForgotPasswordPage;