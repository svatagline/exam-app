
// Router 

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { DashboardLayout } from './components/common/DashboardLayout';
import { LoginLayout } from './components/common/LoginLayout';
import ExamList from './pages/private/exam_list';
import StudentList from './pages/private/student_list';
import AuthPage from './pages/public/auth';
import NewPasswordPage from './pages/public/newPassword';
import { userData, getUserInfo } from './utills/common'
import ResetPasswordPage from './pages/public/resetPassword';
import ApplyExam from './pages/private/apply_exam';
import Unauthorized from './pages/public/unauthorized';
import PageNotFound from './pages/public/pageNotFound';
import { ToastContainer } from 'react-toastify';
// Mock Authentication Function
const isAuthenticated = () => {
  const user = userData();
  return user && user.token;
};
const TeacherRoute = (props) => {
  const teacherRoute = ['studentList', 'examList']
  return teacherRoute.includes(props.path) && getUserInfo() == 'teacher' ? (
    <DashboardLayout>{props.children}</DashboardLayout>
  ) : (
    <Navigate to='/unauthorized' />
  );
};
const StudentRoute = (props) => {
  const studentRoute = ['applyExam']
  return studentRoute.includes(props.path) && getUserInfo() == 'student' ? (
    <DashboardLayout>{props.children}</DashboardLayout>
  ) : (
    <Navigate to='/unauthorized' />
  );
};
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? (
    <>
    <ToastContainer /> 
    {children}
    </>
  ) : (
    <Navigate to='/' />
  );
};
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? (
    getUserInfo() == 'student' ? <Navigate to='/applyExam' /> : <Navigate to='/examList' />

  ) : (
    <LoginLayout>{children}</LoginLayout>
  );
};
const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public Route */}

          {/* Redirect to Dashboard if Logged In */}
          <Route
            path='/'
            element={
              <PublicRoute  >
                <AuthPage />
              </PublicRoute>
            }
          />

          <Route
            path='/newPassword'
            element={
              <PublicRoute  >
                <NewPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path='/resetPassword'
            element={
              <PrivateRoute path={'resetPassword'}>
                <ResetPasswordPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/examList'
            element={
              <PrivateRoute  >
                <TeacherRoute path={'examList'}>
                  <ExamList />
                </TeacherRoute>
              </PrivateRoute>
            }
          />
          <Route
            path='/studentList'
            element={
              <PrivateRoute    >
                <TeacherRoute path={'studentList'}>
                  <StudentList />
                </TeacherRoute>

              </PrivateRoute>
            }
          />

          <Route
            path='/applyExam'
            element={
              <PrivateRoute   >
                <StudentRoute path={'applyExam'}>
                  <ApplyExam />
                </StudentRoute>
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={

              <PageNotFound />
            }
          />
          <Route
            path='/unauthorized'
            element={
              <Unauthorized />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;