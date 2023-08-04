import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isValidEmail} from '../helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './pages.module.css'

const initialData = {
  email: "",
  password: "",
  type: "simple"
}

function SignIn() {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(initialData);
  const employees = useSelector((state) => state.employee[employee.type])
  // const dispatch = useDispatch()
  const handleInputChange = (e) => {
    setEmployee(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const onSubmit = (e) => {
    e.preventDefault()
    const checkPerson = isValidEmail(employee.email) && 
    employees.some((user) => user.password === employee.password) && 
    employees.some((user) => user.type === employee.type) && 
    employees.some((user) => user.email === employee.email)
    if (checkPerson) {
      navigate('/')
      setEmployee(initialData);
    } else {
      toast.info("Something is wrong!!!")
    }
  };
  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2 className={styles.sign__brand}><span>Prime </span>Tech</h2>
        <p className={styles.sign__title}>Sign In</p>
        <form onSubmit={onSubmit} className={styles.sign__form}>
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
          <select value={employee.type} onChange={handleInputChange} className={styles.sign__select}>
            <option value="simple">Simple User</option>
            <option value="admin">Admin</option>
            <option value="superAdmin">Super Admin</option>
          </select>
          <button type='submit' className={styles.sign__submit}>Sign In</button>
        </form>
        <Link to="/signup" className={styles.sign__link}>Don't have an account? Sign Up</Link>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignIn