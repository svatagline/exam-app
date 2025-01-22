
import { createSlice } from '@reduxjs/toolkit';
import { userData } from '../common';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    value: 0,
    user: userData() || {},
    userList: [],
    recordList:[],
    examDetail:{},
    studentList:[],
  },
  reducers: {
    increment: (state, action) => {
      state.value = action.payload; 
    },
    decrement: state => {
      state.value -= 1;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    users: (state, action) => {
      state.userList = action.payload;
    },
    exam: (state, action) => {
      state.recordList = action.payload;
    },

    add_exam: (state, action) => {
      state.recordList =[...state.recordList, action.payload];
    },
    view_exam: (state, action) => {
      state.examDetail =action.payload;
    },
    update_exam: (state, action) => {
      state.recordList =state.recordList.map((item) => item._id === action.payload._id ? action.payload : item); ;
    },
    delete_exam: (state, action) => {
      state.recordList =state.recordList.filter((item) => item._id !== action.payload._id );
    },
    student_list: (state, action) => {
      state.studentList = action.payload;
    },
  },
});

export const { increment, decrement, login, users,exam,add_exam,update_exam,view_exam,
  delete_exam,student_list } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;




