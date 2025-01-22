

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonModal } from '../../components/common/CommonModal';
import { GetStudentList } from '../../utills/redux/action';
import { TEACHER_API } from '../../utills/constant';
import { getApi } from '../../utills/api';
import { ManageError } from '../../utills/common'; 
import Button from '../../components/common/Button';
import CommonTable from '../../components/common/CommonTable';
import PrivetPageContainer from '../../components/common/PrivetPageContainer';


const ViewElement = ({ studentDetails, handleClose }) => {
  const [s_detail, setS_detail] = useState({})

  const { name, email, Result } = s_detail

  useEffect(() => {
    if (studentDetails[0]) {
      setS_detail(studentDetails[0])
    } 
  }, [studentDetails])
  return (
    <div
      style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}
    >
      <div className='d-flex flex-column gap-3'  >

        <table id="common-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
        <table id="common-table">

          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {Result && Result.length > 0 && Result?.map((item, index) => (
              <tr key={index}>
                <td>{item.subjectName}</td>
                <td>{item.score}</td>
                <td>{item.rank}</td>
              </tr>
            ))}
            {Result && Result.length == 0 &&
              <tr >
                <td colSpan={3} className='text-center'>No result found</td>
              </tr>
            }


          </tbody>
        </table>
        {/* {name},{email}   */}

        <Button
          varient={'dark'}
          title="Close"
          onClickFunction={handleClose} />
      </div>
    </div>
  );
};


const StudentList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [loader, setLoader] = useState({
    listLoder: false,
    addEditLoader: false,
    deleteLoader: false,
    fatchRecordLoader: false,
  })
  const handleLoader = (type, value) => {
    setLoader({ ...loader, [type]: value })
  }
  const handleClose = () => {
    setShow(false);
    setStudentDetails({});
  };
  const handleShow = () => setShow(true);
  const userData = useSelector(state => state.globalState.user);
  const recordlist = useSelector(state => state.globalState.studentList);



  const onViewDetail = async (record) => {
    handleLoader('fatchRecordLoader', record._id)
    try {
      const response = await getApi(
        `${TEACHER_API.VIEW_STUDENT_DETAILS}${record._id}`, userData
      )
      handleLoader('fatchRecordLoader', false)
      if (response.statusCode === 200) {
        setStudentDetails(response?.data);
        handleShow();
      } else {
        ManageError(response)
      }
    } catch (error) {
      ManageError(error)
    }
  };

  const getData = () => {
    handleLoader('listLoder', true)
    let afterFetch = () => {
      handleLoader('listLoder', false)
    };
    dispatch(GetStudentList(userData, afterFetch));
  };

  useEffect(() => {
    getData();
  }, []);

  const test = () => {
  };

  const BadgeWrapper = ({record}) => {
    return (
      <>
        <h5 className='table-badge'> <div className={`w-100 badge badge-${record.status !== 'Active' ? 'secondary' : "success"}`}>{record.status}</div></h5>
      </>
    )
  }
  return (
    <>
      <PrivetPageContainer title="Student List">
        <CommonTable
          row={[
            { title: "Name", fieldName: "name", },
            { title: "Status", fieldName: "status", className: "statusColumn", Wrapper: BadgeWrapper },
            {
              title: "Action",
              fieldName: "action",
              className: 'actionColumn',
              actionList: [
                {
                  title: "View",
                  varient: 'primary',
                  disabled: loader.fatchRecordLoader,
                  loader: loader.fatchRecordLoader,
                  handleClick: (record) => onViewDetail(record),
                  className: 'm-auto'

                }, 
              ]
            }]}
          data={currentItems}
          totalRecord={recordlist  }
          loader={loader.listLoder}
          setCurrentItems={setCurrentItems}
          itemsPerPage={10}
        />
      </PrivetPageContainer>


      <CommonModal
        show={show}
        handleClose={handleClose}
        children={
          <ViewElement
            studentDetails={studentDetails}
            handleClose={handleClose}
          /> 
        }
        title={'View Details'}

      />
    </>
  );
};

export default StudentList;



