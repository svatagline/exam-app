
import { getApi, postApi, privetDeleteApi, privetpostApi, privetPutApi } from '../api';
import { ManageError, ToastMessage } from '../common';
import { STUDENT_API, TEACHER_API, USER_API } from '../constant';
import { increment, decrement, login, users, exam, add_exam, update_exam, delete_exam, view_exam, student_list } from './slice';

export const ApiCall = params => dispatch => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'x-api-key': 'DEMO-API-KEY',
  });
  // return "$&{"result"}"

  getApi(
    'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1',
  )
    .then(res => {
      dispatch(increment(res[0].height));
    })
    .catch(err => {
      console.log('error', err);
    });
};
export const Login = (params) => dispatch => {
  localStorage.setItem('user', JSON.stringify({ ...params }));
  dispatch(login(params));
  
};
export const SignUp = (params, Action) => dispatch => {

  postApi(
    USER_API.SIGN_UP, params
  )
    .then(res => {
      dispatch(login({ ...res[0], ...params }));
      Action();
    })
    .catch(err => {
      console.log('error', err);
    });
};
export const GetUserList = data => dispatch => {
  getApi(
    'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1',
  )
    .then(res => {
      // dispatch(users(data));
    })
    .catch(err => {
      console.log('error', err);
    });
};
export const GetExamList = (userData,afterFetch) => dispatch => {
  getApi(
    `${TEACHER_API.VIEW_EXAM}`, userData
  )
    .then(res => {
      if (res.statusCode === 200) {
        dispatch(exam(res?.data));
      }else{
         ManageError(res)
      }
      afterFetch()
    })
    .catch(err => {
      ManageError(err)
      afterFetch()
    });

};
export const AddExam = (data, userData, afterFetch) => dispatch => {
  privetpostApi(
    `${TEACHER_API.CREATE_EXAM}`, data, userData,
  )
    .then(res => {
      // dispatch(add_records(data));
      if (res.statusCode === 200) {
        dispatch(add_exam(res.data));
        ToastMessage(res.message, 's');
        afterFetch()
      } else {
        ToastMessage(res.message, 'e');
        afterFetch({isError:true}) 

      } 

    })
    .catch(err => {
      afterFetch({isError:true}) 
      ManageError(err)
      console.log('error', err);
    });

};
export const ViewExam = (id, userData) => {

  getApi(
    `${TEACHER_API.VIEW_EXAM_DETAILS}${id}`, userData
  )
    .then(res => {
      console.log(`viewExam`, res)
      return res
    })
    .catch(err => {
      ManageError(err, 'e');
      console.log('error', err);
      return err
    });
};
 


export const UpdateExam = (data, userData, afterFetch) => dispatch => {
  let update_records = { ...data }
  delete update_records._id; 
  privetPutApi(
    `${TEACHER_API.EDIT_EXAM}${data._id}`, update_records, userData,
  )
    .then(res => {
      // dispatch(add_records(data));
      if (res.statusCode === 200) {
        dispatch(update_exam(res.data));
        ToastMessage(res.message, 's');
        afterFetch()
      } else {
        ToastMessage(res.message, 'e');
        afterFetch({isError:true}) 
      } 

    })
    .catch(err => {
      afterFetch({isError:true}) 
      ManageError(err)
      console.log('error', err);
    });

};

 

export const DeleteExam = (data, userData, afterFetch) => dispatch => {  
  privetDeleteApi(
    `${TEACHER_API.DELETE_EXAM}${`data._id`}`, {}, userData,
  )
    .then(res => {
      // dispatch(add_records(data));
      if (res.statusCode === 200) { 
        dispatch(delete_exam(data));
        ToastMessage(res.message, 's');
        afterFetch()
      } else {
        afterFetch({isError:true}) 
        ToastMessage(res.message, 'e'); 
      }  
    })
    .catch(err => {
      ManageError(err)
      afterFetch({isError:true}) 
      console.log('error', err);
    }); 
};


export const GetStudentList = (userData,afterFetch) => dispatch => {
  getApi(
    `${TEACHER_API.STUDENTS_LIST}`, userData
  )
    .then(res => {
      if (res.statusCode === 200) {
        dispatch(student_list(res?.data));
      }else{
        ToastMessage(res.message)
      }
      afterFetch()
    })
    .catch(err => {
      ManageError(err)
      afterFetch()
    });

};
export const GetStudentExamList = (userData,afterFetch) => dispatch => {
  getApi(
    `${STUDENT_API.VIEW_EXAM}`, userData
  )
    .then(res => {
      if (res.statusCode === 200) {
        dispatch(exam(res?.data));
      }else{
        ToastMessage(res.message)
      }
      afterFetch()
    })
    .catch(err => {
      ManageError(err)
      afterFetch()
    });

};