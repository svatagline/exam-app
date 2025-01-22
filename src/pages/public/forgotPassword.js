import React, { useState } from 'react'; 
import { isBlankSpace, ToastMessage } from '../../utills/common';
import { postApi } from '../../utills/api';
import { USER_API } from '../../utills/constant';
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import AuthFormContainer from '../../components/common/AuthFormContainer';
import useForm from '../../utills/hooks/formValidationHook';

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

    const initialValues = {
        email: email
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
        return errors;
    };

    const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
        initialValues,
        validate
    );
    return (
        <>
            <AuthFormContainer
                title='Forgot Password'>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(() => userLogin(values)) }}>
                    {[
                        { title: 'Email', field: 'email', type: 'email' },
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