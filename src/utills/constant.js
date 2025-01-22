export const  API_BASE_URL  = `https://examination.onrender.com/`
export const USER_API = {
    LOGIN:`users/Login`,
    SIGN_UP:`users/SignUp`,
    FORGOT_PWD:`users/ForgotPassword`,
    RENEW_PWD:`https://examination.onrender.com/users/ForgotPassword/Verify?token=`,
    RESET_PWD:`users/ResetPassword`,
    GET_USER_DETAILS:`users/GetUserDetails`,
    UPDATE_USER_DETAILS:`users/UpdateUserDetails`,
    GET_EXAM_LIST:`exams/GetExamList`,
    GET_EXAM_DETAILS:`exams/GetExamDetails`,
}
export const TEACHER_API = {
     VIEW_EXAM:'dashboard/Teachers/viewExam',
     VIEW_EXAM_DETAILS:'dashboard/Teachers/examDetail?id=',
     DELETE_EXAM:'dashboard/Teachers/deleteExam?id=',
     CREATE_EXAM:'dashboard/Teachers/Exam',
     EDIT_EXAM:'dashboard/Teachers/editExam?id=',
     STUDENTS_LIST:'dashboard/Teachers',
     VIEW_STUDENT_DETAILS:'dashboard/Teachers/viewStudentDetail?id=',
}
export const STUDENT_API = {
     VIEW_EXAM:'student/studentExam',
     GET_EXAM_PAPER:'student/examPaper?id=',
     GIVE_EXAM:'student/giveExam?id=',
     GET_STUDENT_PROFILE:'student/getStudentDetail',
     STUDENT_PROFILE:'student/studentProfile',
     
}