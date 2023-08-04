import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isValidEmail, isValidName, isValidPhoneNumber } from '../helpers';
import { addSimple, addAdmin, addSuper } from '../store/employee';
import 'react-toastify/dist/ReactToastify.css';
import styles from './pages.module.css'

const initialData = {
  name: "",
  family: "",
  email: "",
  password: "",
  phone: "",
  type: "simple"
}

function SignUp() {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(initialData);
  const employees = useSelector((state) => state.employee[employee.type])
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    setEmployee(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const onSubmit = (e) => {
    e.preventDefault()
    const isValid = isValidEmail(employee.email) && isValidPhoneNumber(employee.phone) && isValidName(employee.name) && isValidName(employee.family)
    if (isValid) {
      let newEmployee = {
        id: new Date().getTime().toString(),
        ...employee,
        deadline: null,
        users: [],
        timestamp: new Date().toLocaleDateString(),
      }
      if (employee.type === 'simple') {
        if (employees.some((user) => user.email === employee.email)) {
          toast.warn("this email has already")
        } else {
          dispatch(addSimple(newEmployee))
          navigate('/')
          setEmployee(initialData);
        }
      } else if (employee.type === 'admin') {
        if (employees.some((user) => user.email === employee.email)) {
          toast.warn("this email has already")
        } else {
          dispatch(addAdmin(newEmployee))
          navigate('/')
          setEmployee(initialData);
        }
      } else if (employee.type === 'super') {
        if (employees.some((user) => user.email === employee.email)) {
          toast.warn("this email has already")
        } else {
          dispatch(addSuper(newEmployee))
          navigate('/')
          setEmployee(initialData);
        }
      }
    } else {
      toast.info("Something is wrong!!!")
    }
  };
  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2 className={styles.sign__brand}><span>Prime </span>Tech</h2>
        <p className={styles.sign__title}>Sign Up</p>
        <form onSubmit={onSubmit} className={styles.sign__form}>
          <div className={styles.sign__fullname}>
            <input
              type="text"
              placeholder='First Name *'
              name='name'
              value={employee.name}
              onChange={handleInputChange}
              required />
            <input
              type="text"
              placeholder='Last Name *'
              name='family'
              value={employee.family}
              onChange={handleInputChange}
              required />
          </div>
          <input
            type="text"
            placeholder='Email Address *'
            name='email'
            value={employee.email}
            onChange={handleInputChange}
            required />
          <input
            type="password"
            placeholder='Password *'
            name='password'
            value={employee.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder='Phone Number *'
            name='phone'
            value={employee.phone}
            onChange={handleInputChange}
            required />
          <select name='type' value={employee.type} onChange={handleInputChange} className={styles.sign__select}>
            <option value="simple">Simple User</option>
            <option value="admin">Admin</option>
            <option value="super">Super Admin</option>
          </select>
          <button type='submit' className={styles.sign__submit}>Sign In</button>
        </form>
        <Link to="/signin" className={styles.sign__link}>Don't have an account? Sign In</Link>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp