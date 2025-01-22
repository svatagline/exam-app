

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonModal } from '../../components/common/CommonModal';
import { GetStudentExamList } from '../../utills/redux/action';
import { STUDENT_API } from '../../utills/constant';
import { getApi, privetpostApi } from '../../utills/api';
import { ManageError, ToastMessage } from '../../utills/common';
import Button from '../../components/common/Button';
import RadioInput from '../../components/common/RadioInput';
import InputBox from '../../components/common/InputBox';
import CommonTable from '../../components/common/CommonTable';
import PrivetPageContainer from '../../components/common/PrivetPageContainer';


const FormElement = ({ examPaperDetails, onSubmit, handleClose, loader }) => {
  const [formFieldData, setFormFieldData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [examName, setExamName] = useState('')
  const [currentForm, setCurrentForm] = useState(formFieldData[currentIndex])
  const [questionLength, setQuestionLength] = useState(0)
  const [showError, setShowError] = useState(false)


  const onHandleNextPrev = (next) => {

    if (next) {
      if (currentForm?.answer) {
        setShowError(false)
        setCurrentIndex(currentIndex + 1)
        setCurrentForm(formFieldData[currentIndex + 1])
      } else {
        setShowError(true)
      }
    } else {
      setCurrentIndex(currentIndex - 1)
      setCurrentForm(formFieldData[currentIndex - 1])
    }

  }

  const onHandleSubmit = () => {
    if (currentForm?.answer) {
      setShowError(false)
      const bodyData = formFieldData.map((i) => { return { question: i._id, answer: i.answer } })
      onSubmit(bodyData)

    } else {
      setShowError(true)
    }

  }
  useEffect(() => {
    setQuestionLength(formFieldData.length - 1)
  }, [formFieldData])

  useEffect(() => {
    if (examPaperDetails && examPaperDetails._id) {
      const reformedQuestionList = examPaperDetails?.questions?.map((q) => {
        return {
          question: q.question,
          _id: q._id,
          option1: q.options[0],
          option2: q.options[1],
          option3: q.options[2],
          option4: q.options[3],
        }
      })
      setFormFieldData(reformedQuestionList)
      setCurrentForm(reformedQuestionList[currentIndex])
      setExamName(examPaperDetails.subjectName)
    }
  }, [examPaperDetails]);


  const handleChange = ({ name, value }) => {
    setFormFieldData(formFieldData.map((formValue, index) => index == currentIndex ? { ...formValue, answer: name } : formValue))
    setCurrentForm({ ...currentForm, answer: name })
  }
  return (
    <div
      style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}
    >
      <div className='d-flex flex-column gap-3' >
        {/* Name Field */}
        <div className='form-group' >
          <label htmlFor='exampleInputEmail1'  >{'Exam name'}</label>
          <>
            <InputBox
              type={'text'}
              title={'Exam name'}
              value={examName}
              placeholder={`Enter exam name`}
              name={'examName'}
              disabled={true}
            />
            {(currentIndex == questionLength && [null, ''].includes(examName)) ? (
              <div style={{ color: 'red' }}>{`Exam name is required`}</div>
            ) : null}
          </>
        </div>
        {[
          { name: `Q${currentIndex + 1}. ${currentForm?.question}`, field: 'question', type: 'text' },
          { name: currentForm?.option1 ? currentForm?.option1 : "", field: 'option1', type: 'text' },
          { name: currentForm?.option2 ? currentForm?.option2 : "", field: 'option2', type: 'text' },
          { name: currentForm?.option3 ? currentForm?.option3 : "", field: 'option3', type: 'text' },
          { name: currentForm?.option4 ? currentForm?.option4 : "", field: 'option4', type: 'text' },
        ].map(({ name, field, type }, index) => {
          return (
            <div className='form-group' key={index}>
              {
                field == 'question'
                  ?
                  <>
                    <label htmlFor='exampleInputEmail1'>{name}</label>
                  </>
                  :
                  <>
                    <RadioInput
                      handleChange={(e) => handleChange(e.target)}
                      isChecked={currentForm?.answer === name}
                      title={name}
                      name={name}
                    />

                  </>
              }

            </div>
          );
        })}
        {!currentForm?.answer && showError ? (
          <div style={{ color: 'red' }}>{`please choose any one option`}</div>
        ) : null}


        <div className='d-flex justify-content-between w-100' >
          <Button
            varient={'primary'}
            disabled={currentIndex == 0}
            title="Previous"
            onClickFunction={() => onHandleNextPrev()}
          />
          <Button
            varient={'primary'}
            disabled={currentIndex == questionLength}
            title="Next"
            onClickFunction={() => onHandleNextPrev(true)}
          />
        </div>

        {currentIndex == questionLength &&

          <Button
            varient={'primary'}
            disabled={loader}
            loader={loader}
            title="Submit"
            onClickFunction={onHandleSubmit}
          />
        }

        <Button
          varient={'dark'}
          title="Close"
          onClickFunction={handleClose}
        />
      </div>
    </div>
  );
};


const ApplyExam = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [examPaperDetails, setExamPaperDetails] = useState({});
  const [loader, setLoader] = useState({
    listLoder: false,
    examSubmitLoader: false,
  })
  const handleLoader = (type, value) => {
    setLoader({ ...loader, [type]: value })
  }
  const handleClose = () => {
    setShow(false);
    setExamPaperDetails({});
  };
  const handleShow = () => setShow(true);
  const userData = useSelector(state => state.globalState.user);
  const recordlist = useSelector(state => state.globalState.recordList);


  const onSubmit = async (record) => {
    handleLoader('examSubmitLoader', true)
    try {
      const response = await privetpostApi(
        `${STUDENT_API.GIVE_EXAM}${examPaperDetails._id}`, record, userData
      )
      handleLoader('examSubmitLoader', false)
      if (response.statusCode === 200) {
        ToastMessage(response?.message, "s")
        handleClose()
      } else {
        ManageError(response)
      }
    } catch (error) {
      handleLoader('examSubmitLoader', false)
      ManageError(error)
    }
  };


  const onGetExamPaper = async (record) => {
    handleLoader('fatchRecordLoader', record._id)
    try {
      const response = await getApi(
        `${STUDENT_API.GET_EXAM_PAPER}${record._id}`, userData
      )
      handleLoader('fatchRecordLoader', false)
      if (response.statusCode === 200) {
        setExamPaperDetails({ ...record, questions: response?.data });
        handleShow();
      } else {
        ManageError(response)
      }
    } catch (error) {
      handleLoader('fatchRecordLoader', false)
      ManageError(error)
    }
  };

  const GetData = () => {
    handleLoader('listLoder', true)
    let afterFetch = () => {
      handleLoader('listLoder', false)
    };
    dispatch(GetStudentExamList(userData, afterFetch));
  };

  useEffect(() => {
    GetData();
  }, []);


  return (
    <>
      <PrivetPageContainer title="Exams List">
        <CommonTable
          row={[
            { title: "Subject name", fieldName: "subjectName", },
            {
              title: "Action",
              fieldName: "action",
              className: 'actionColumn',
              actionList: [
                {
                  title: "Give exam",
                  varient: 'primary',
                  disabled: loader.fatchRecordLoader,
                  loader: loader.fatchRecordLoader,
                  handleClick: (record) => onGetExamPaper(record),
                  className: 'm-auto'

                },

              ]
            }]}
          data={currentItems}
          totalRecord={recordlist}
          loader={loader.listLoder}
          setCurrentItems={setCurrentItems}
          itemsPerPage={10}
        />
      </PrivetPageContainer>


      <CommonModal
        show={show}
        handleClose={handleClose}
        children={
          <FormElement
            examPaperDetails={examPaperDetails}
            onSubmit={onSubmit}
            handleClose={handleClose}
            loader={loader.examSubmitLoader}
          />

        }
        title={'Give Exam'
        }
      />
    </>
  );
};

export default ApplyExam;



