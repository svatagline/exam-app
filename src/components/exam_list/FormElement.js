import { useEffect, useState } from "react";
import { isBlankSpace, setUpdate, ToastMessage, trim } from "../../utills/common";
import useForm from "../../utills/hooks/formValidationHook";
import { examFormRawData, FieldRawData } from "../../utills/exam/formRawData";
import Button from "../common/Button";
import InputBox from "../common/InputBox";

export const FormElement = ({ updateRecord, setUpdateRecord, onSubmit, handleClose, loader }) => {
    // const [formFieldData, setFormFieldData] = useState(examFormRawData)
    const [formFieldData, setFormFieldData] = useState(FieldRawData)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [questionList, setQuestionList] = useState([])
    const [startUpdate, setStartUpdate] = useState(false)
    const [examName, setExamName] = useState('')
    const [notes, setNotes] = useState('')
    const [questionLength, setQuestionLength] = useState(0)
    const [isUpdateForm, setIsUpdateForm] = useState(false)
    const [currentForm, setCurrentForm] = useState(formFieldData[currentIndex])
    const [showErr, setShowErr] = useState(false)

    // custom form 

    const initialValues = {
        question: trim(currentForm['question']),
        answer: trim(currentForm['answer']),
        option1: trim(currentForm['option1']),
        option2: trim(currentForm['option2']),
        option3: trim(currentForm['option3']),
        option4: trim(currentForm['option4']),
    }
    const validate = (formValues) => {
        const errors = {};
        const matchQue = questionList.filter((i, index) => index !== currentIndex)
        if (!formValues.question) {
            errors.question = "Question is required.";
        } else if (!isBlankSpace(formValues.question)) {
            errors.question = "Question cannot be blank or contain only spaces.";
        } else if (matchQue.includes(formValues.question)) {
            errors.question = "Question should not match with another question.";
        }
        if (!formValues.answer) {
            errors.answer = "Answer is required.";
        } else if (!isBlankSpace(formValues.answer)) {
            errors.answer = "Answer cannot be blank or contain only spaces.";
        } else if (![values.option1, values.option2, values.option3, values.option4].includes(formValues.answer)) {

            errors.answer = "Answer must match one of the options.";
        }
        if (!formValues.option1) {
            errors.option1 = "Option 1 is required.";
        } else if (!isBlankSpace(formValues.option1)) {
            errors.option1 = "Option 1 cannot be blank or contain only spaces.";
        } else if ([values.option2, values.option3, values.option4].includes(formValues.option1)) {
            errors.option1 = "Each option should be uniq.";
        }
        if (!formValues.option2) {
            errors.option2 = "Option 2 is required.";
        } else if (!isBlankSpace(formValues.option2)) {
            errors.option2 = "Option 2 cannot be blank or contain only spaces.";
        } else if ([values.option1, values.option3, values.option4].includes(formValues.option2)) {
            errors.option2 = "Each option should be uniq.";
        }
        if (!formValues.option3) {
            errors.option3 = "Option 3 is required.";
        } else if (!isBlankSpace(formValues.option3)) {
            errors.option3 = "Option 3 cannot be blank or contain only spaces.";
        } else if ([values.option2, values.option1, values.option4].includes(formValues.option3)) {
            errors.option3 = "Each option should be uniq.";
        }
        if (!formValues.option4) {
            errors.option4 = "Option 4 is required.";
        } else if (!isBlankSpace(formValues.option4)) {
            errors.option4 = "Option 4 cannot be blank or contain only spaces.";
        } else if ([values.option2, values.option3, values.option1].includes(formValues.option4)) {
            errors.option4 = "Each option should be uniq.";
        }

        return errors;
    };

    const { values, setValues, setFieldValue, setFieldTouch, errors, setErrors, handleChange, handleBlur, handleSubmit } = useForm(
        initialValues,
        validate
    );

    const submitForm = (values, params) => {
        if (currentIndex === questionLength || params.submitWithUpdate) {
            if (![examName, notes].includes("")) {
                const formBody = formFieldData.map((rec, i) => {
                    return ((i !== questionLength) || params.submitWithUpdate) ?
                        {
                            question: rec.question,
                            answer: rec.answer,
                            options: [rec.option1, rec.option2, rec.option3, rec.option4]
                        } :
                        {
                            question: values.question,
                            answer: values.answer,
                            options: [values.option1, values.option2, values.option3, values.option4]
                        }
                })

                if (updateRecord && updateRecord._id) {
                    onSubmit({ ...updateRecord, subjectName: examName, questions: formBody, notes: [notes] });

                } else {
                    onSubmit({ subjectName: examName, questions: formBody, notes: [notes] });

                }
            }
        } else {
            setShowErr(false);
            setFieldTouch('all', false);
            setFormFieldData(formFieldData.map((formValue, index) => index == currentIndex ? { id: formValue.id, ...values } : formValue))
            setCurrentIndex(currentIndex + 1)
            setValues(formFieldData[currentIndex + 1])
        }
    };
    // custom form 



    useEffect(() => {
        setFormFieldData(formFieldData.map((formValue, index) => index == currentIndex ? { id: formValue.id, ...values } : formValue))

    }, [values]);

    const onHandlePrev = () => {
        setShowErr(false);
        setFieldTouch('all', false);
        setCurrentIndex(currentIndex - 1)
        setValues(formFieldData[currentIndex - 1])
        setErrors({})
    }

    useEffect(() => {
        setQuestionLength(formFieldData.length - 1)
        if (formFieldData && formFieldData.length > 0) {
            setQuestionList(formFieldData.map((i) => i.question))
        }
    }, [formFieldData])

    useEffect(() => {
        if (updateRecord && updateRecord._id) {
            const reformedQuestionList = updateRecord.questions.map((q) => {
                return {
                    id: q.id,
                    question: trim(q.question),
                    answer: trim(q.answer),
                    option1: trim(q.options[0]),
                    option2: trim(q.options[1]),
                    option3: trim(q.options[2]),
                    option4: trim(q.options[3]),
                }
            })
            setFormFieldData(reformedQuestionList)
            setValues(reformedQuestionList[currentIndex])
            setCurrentForm(reformedQuestionList[currentIndex])
            setNotes(updateRecord.notes[0])
            setExamName(updateRecord.subjectName)
        }
    }, [updateRecord]);
    const test = () => {
        // testForm()
        console.log(showErr)
    }

    const handleUpdate = () => {
        handleSubmit(submitForm, { submitWithUpdate: true })
    }
    const handlePreUpdate = () => {
        if (isUpdateForm) {
            handleUpdate()
        } else {
            ToastMessage('No updates found in form')
        }
    }
    useEffect(() => {
        if (startUpdate) {
            setIsUpdateForm(true)
        }
    }, [formFieldData, notes, examName])
    useEffect(() => {
        setUpdate(() => setStartUpdate(true))
    }, [])
    return (
        <div
            style={{ padding: '20px', maxWidth: '100%', margin: 'auto' }}
        >
            <div className='d-flex flex-column gap-3' >
                {/* Name Field */}
                <InputBox
                    type={'text'}
                    title={'Exam name'}
                    value={examName}
                    placeholder={`Enter exam name`}
                    name={'examname'}
                    handleChange={(e) => setExamName(e.target.value)}
                    error={{ show: showErr && ((currentIndex == questionLength) || (updateRecord && updateRecord._id)) && [null, ''].includes(examName), msg: 'Exam name is required' }}
                />
                <div className="row">
                    {[
                        { title: `Question ${currentIndex + 1}`, field: 'question', type: 'text' },
                        { title: 'Answer', field: 'answer', type: 'text' },
                        { title: 'Option 1', field: 'option1', type: 'text' },
                        { title: 'Option 2', field: 'option2', type: 'text' },
                        { title: 'Option 3', field: 'option3', type: 'text' },
                        { title: 'Option 4', field: 'option4', type: 'text' },
                    ].map(({ title, field, type }, index) => {
                        return (
                            <div className='col-xl-6 col-md-12' key={index}> 
                                <InputBox
                                    type={type}
                                    title={title}
                                    value={values[field]}
                                    className='form-control'
                                    placeholder={`Enter ${`${title}`.toLowerCase()}`}
                                    name={field}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    error={{ show: showErr, msg: errors[field] }}
                                />
                            </div>

                        );
                    })}
                </div>

                <InputBox
                    type={'text'}
                    title={'Notes'}
                    value={notes}
                    placeholder={`Enter notes`}
                    name={'notes'}
                    handleChange={(e) => setNotes(e.target.value)}
                    error={{ show: showErr && ((currentIndex == questionLength) || (updateRecord && updateRecord._id)) && [null, ''].includes(notes), msg: 'Notes is required' }}
                />


                {/* Email Field */}

                <div className='d-flex justify-content-between w-100' >
                    <Button
                        varient="primary"
                        disabled={currentIndex == 0}
                        title="Previous"
                        onClickFunction={onHandlePrev}
                    />
                    <Button
                        varient="primary"
                        disabled={currentIndex == questionLength}
                        title="Next"
                        onClickFunction={() => { setFieldTouch('all', true); setShowErr(true); handleSubmit(submitForm) }}
                    />
                </div>

                {(currentIndex == questionLength || (updateRecord && updateRecord._id) || loader) &&
                    <Button
                        varient="primary"
                        disabled={loader}
                        loader={loader}
                        title="Submit"
                        onClickFunction={() => { setFieldTouch('all', true); setShowErr(true); (updateRecord && updateRecord._id) ? handlePreUpdate() : handleSubmit(submitForm) }}
                    />
                }

                <Button
                    varient="dark"
                    title="Close"
                    onClickFunction={handleClose}
                />
            </div>
        </div>
    );
};