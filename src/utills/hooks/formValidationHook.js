import { useState } from "react";
import { trim } from "../common";

const useForm = (initialValues, validate) => {
  const [values, updateValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateValues((prevValues) => ({ ...prevValues, [name]: value }));  
    console.log(touched)
    if (touched[name] || touched['all']) {  
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target; 
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateField(name, values[name]);
  };

  const validateField = (name, value) => {
    const validationErrors = validate({ [name]: value }); 
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || "",
    }));
  };
  const setValues = (values) => {
   updateValues({...values})
  };
  const setFieldValue = (name,value) => {
   updateValues({...values,[name]:value})
  };
  const setFieldTouch = (name,value=true) => {
    setTouched({...values,[name]:value})
  };

  const handleSubmit = (callback,params={submitWithUpdate:false}) =>   { 
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
     
      callback(values,params);
    }
  };

 
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue, 
    setErrors,
    setFieldTouch
  };
};

export default useForm;
