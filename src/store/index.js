import { configureStore } from '@reduxjs/toolkit'
import employee from './employee'

const store = configureStore({
  reducer: {
    employee,
  },
})

export default store