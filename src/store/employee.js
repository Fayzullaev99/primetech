import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('employee') || JSON.stringify({isLoggedIn:{loggedIn:false,email:"",type:""
},simple: [],admin: [],super: []}))
const saveToLocalStorage = (state) => localStorage.setItem('employee', JSON.stringify(state))
export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addSimple: (state, action) => {
      state.isLoggedIn = {loggedIn:true,...action.payload}
      state.simple = [action.payload,...state.simple]
      saveToLocalStorage({...state})
    },
    addAdmin: (state, action) => {
      state.isLoggedIn = {loggedIn:true,...action.payload}
      state.admin = [action.payload,...state.admin]
      saveToLocalStorage({...state})
    },
    addSuper: (state, action) => {
      state.isLoggedIn = {loggedIn:true,...action.payload}
      state.super = [action.payload,...state.super]
      saveToLocalStorage({...state})
    },
    signOut: (state) => {
      state.isLoggedIn ={loggedIn:false}
      saveToLocalStorage({...state})
    },
    signIn: (state,action) => {
      state.isLoggedIn = {loggedIn:true,...action.payload}
      saveToLocalStorage({...state})
    },
    addUser: (state,action) => {
      let newUser = action.payload.newUser
      let type = action.payload.personType
      let idx = action.payload.personId
      state[type][idx].users = [...state[type][idx].users,newUser]
      saveToLocalStorage({...state})
    },
    editUser: (state, action) => {
      const { updatedUser, personType, personId, userId } = action.payload;

      const userIndex = state[personType][personId].users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        const updatedUsers = [...state[personType][personId].users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...updatedUser };

        state[personType][personId].users = updatedUsers;
        saveToLocalStorage(state);
      }
    },
    editEmployee: (state, action) => {
      const { updatedUser, personType, userId } = action.payload;
      const userIndex = state[personType].findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        const updatedUsers = [...state[personType]];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex],...updatedUser };
        state[personType] = updatedUsers;
        saveToLocalStorage(state);
      }
    },
    deleteUser: (state, action) => {
      const { personType, personId, userId } = action.payload;
      const updatedUsers = state[personType][personId].users.filter(
        (user) => user.id !== userId
      );
      state[personType][personId].users = updatedUsers;
      saveToLocalStorage(state);
    },
  },
})

export const { addSimple, addAdmin, addSuper, signOut, signIn, addUser, editUser, deleteUser,editEmployee, } = employeeSlice.actions

export default employeeSlice.reducer