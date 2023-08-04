import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('employee') || JSON.stringify({isLoggedIn: false,simple: [],admin: [],super: []}))
const saveToLocalStorage = (state) => localStorage.setItem('employee', JSON.stringify(state))
export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addSimple: (state, action) => {
      state.isLoggedIn = true
      state.simple = [action.payload,...state.simple]
      saveToLocalStorage({...state})
    },
    addAdmin: (state, action) => {
      state.isLoggedIn = true
      state.admin = [action.payload,...state.admin]
      saveToLocalStorage({...state})
    },
    addSuper: (state, action) => {
      state.isLoggedIn = true
      state.super = [action.payload,...state.super]
      saveToLocalStorage({...state})
    },
  },
})

export const { addSimple, addAdmin, addSuper } = employeeSlice.actions

export default employeeSlice.reducer