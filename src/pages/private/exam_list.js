

import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonModal } from '../../components/common/CommonModal';
import { AddExam, DeleteExam, GetExamList, UpdateExam } from '../../utills/redux/action';
import { TEACHER_API } from '../../utills/constant';
import { getApi } from '../../utills/api';
import { ManageError, setUpdate } from '../../utills/common';
import { FormElement } from '../../components/exam_list/FormElement';
import Button from '../../components/common/Button';
import CommonTable from '../../components/common/CommonTable';
import PrivetPageContainer from '../../components/common/PrivetPageContainer';


const RemoveRecordElement = ({ deleteRecord, onSubmit, handleClose, loader }) => {
  const handleSubmit = () => {
    onSubmit({ ...deleteRecord, isDelete: true });
  };
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <div className='d-flex flex-column gap-3'>
        <h4>Are you sure you want to delete this record?</h4>

        <div className="d-flex  justify-content-end gap-3">
          <Button
            varient={'dark'}
            title="No"
            onClickFunction={handleClose}
          />
          <Button
            varient={'primary'}
            disabled={loader}
            loader={loader}
            title="Yes"
            type='submit'
            onClickFunction={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const rawLoaderData = {
  listLoder: false,
  addEditLoader: false,
  deleteLoader: false,
  fatchRecordLoader: false,
}
const ExamList = ({ user }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [updateRecord, setUpdateRecord] = useState({});
  const [deleteRecord, setDeleteRecord] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [loader, setLoader] = useState({ ...rawLoaderData })
  const handleLoader = (type, value) => {
    setLoader({ ...loader, [type]: value })
  }
  const handleClose = () => { 
    setShow(false);
    setLoader(rawLoaderData)
    setUpdate(() => {
      setUpdateRecord({});
      setDeleteRecord({});
    })


  };
  const handleShow = () => setShow(true);
  const userData = useSelector(state => state.globalState.user);
  const recordlist = useSelector(state => state.globalState.recordList);


  const onSubmit = record => {
    let afterFetch = ({ isError }) => { 
      if (isError) {
        if (record.isDelete) { 
          handleLoader('deleteLoader', false)
        } else { 
          handleLoader('addEditLoader', false)
        }
      } else {
        if (record.isDelete) {
          handleLoader('deleteLoader', false)
        } else { 
          handleLoader('addEditLoader', false)
        }
        handleClose()
      }

    }

    if (record.isDelete) {
      dispatch(DeleteExam(record, userData, afterFetch));
      handleLoader('deleteLoader', true)
    } else {
      handleLoader('addEditLoader', true)
      if (record?._id) {
        dispatch(UpdateExam({ _id: record._id, notes: record.notes, questions: record.questions, subjectName: record.subjectName }, userData, afterFetch));
      } else {
        dispatch(AddExam(record, userData, afterFetch));
      }
    }
  };
  const onUpdate = async (record) => {
    handleLoader('fatchRecordLoader', record._id)
    try {
      const response = await getApi(
        `${TEACHER_API.VIEW_EXAM_DETAILS}${record._id}`, userData
      )
      handleLoader('fatchRecordLoader', false)
      if (response.statusCode === 200) {
        setUpdateRecord({ ...record, questions: response?.data?.questions });
        handleShow();
      } else {
        ManageError(response)
      }
    } catch (error) {
      handleLoader('fatchRecordLoader', false)
      ManageError(error)
    }
  };
  const onDelete = record => {
    setDeleteRecord({ ...record });
    handleShow();
  };
  const getData = () => {

    handleLoader('listLoder', true)
    let afterFetch = () => {
      handleLoader('listLoder', false)
    };
    dispatch(GetExamList(userData, afterFetch));
  }
  useEffect(() => {
    getData();
  }, []);



  return (
    <>
      <PrivetPageContainer
        title="Manage Exams"
        headerAction={
          <Button
            varient={'primary'}
            title="Add Exams"
            onClickFunction={handleShow}
          />
        }
      >
        <CommonTable
          row={[{ title: "Exam Name", fieldName: "subjectName" },
          {
            title: "Action",
            fieldName: "action",
            className: 'examTableActionCol',
            actionList: [
              {
                title: "Edit",
                varient: 'primary',
                disabled: loader.fatchRecordLoader,
                loader: loader.fatchRecordLoader,
                handleClick: (record) => onUpdate(record)
              },
              {
                title: "Delete",
                varient: 'danger',
                handleClick: (record) => onDelete(record)
              }
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
        size={deleteRecord && deleteRecord._id ? "md" : "xl"}
        children={
          deleteRecord._id ? (
            <RemoveRecordElement
              deleteRecord={deleteRecord}
              setDeleteRecord={setDeleteRecord}
              onSubmit={onSubmit}
              handleClose={handleClose}
              loader={loader.deleteLoader}
            />
          ) : (
            <FormElement
              updateRecord={updateRecord}
              setUpdateRecord={setUpdateRecord}
              onSubmit={onSubmit}
              handleClose={handleClose}
              loader={loader.addEditLoader}
            />
          )
        }
        title={
          deleteRecord && deleteRecord._id
            ? 'Delete Exam'
            : updateRecord && updateRecord._id
              ? 'Update Exam'
              : 'Add Exam '
        }
      />
    </>
  );
};

export default memo(ExamList);



