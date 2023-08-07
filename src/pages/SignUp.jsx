import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, isValidEmail, isValidName, isValidPhoneNumber } from '../helpers';
import { addSimple, addAdmin, addSuper } from '../store/employee';
import 'react-toastify/dist/ReactToastify.css';
import styles from './pages.module.css';

const initialData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  phonenumber: '',
  position:"",
  type: 'simple'
};

function SignUp() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initialData);
  const employees = useSelector((state) => state.employee[employee.type]);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setEmployee((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValidInput = isValidEmail(employee.email) && isValidPhoneNumber(employee.phonenumber)
      && isValidName(employee.firstname) && isValidName(employee.lastname);

    if (isValidInput) {
      const newEmployee = {
        id: new Date().getTime().toString(),
        ...employee,
        deadline: null,
        users: [],
        timestamp: formatDate(new Date(Date.now())),
      };

      if (employees.some((user) => user.email === employee.email)) {
        toast.warn('This email is already taken.');
      } else {
        switch (employee.type) {
          case 'simple':
            dispatch(addSimple(newEmployee));
            break;
          case 'admin':
            dispatch(addAdmin(newEmployee));
            break;
          case 'super':
            dispatch(addSuper(newEmployee));
            break;
          default:
            break;
        }
        navigate('/');
        setEmployee(initialData);
      }
    } else {
      toast.info('Please fill in valid details.');
    }
  };

  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2 className="brand">
          <span>Prime </span>Tech
        </h2>
        <p className="form__title">Sign Up</p>
        <form onSubmit={onSubmit} className="form">
          <div>
            <input
              type="text"
              placeholder="First Name *"
              name="firstname"
              value={employee.firstname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name *"
              name="lastname"
              value={employee.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Email Address *"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password *"
            name="password"
            value={employee.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Phone Number *"
            name="phonenumber"
            value={employee.phonenumber}
            onChange={handleInputChange}
            required
          />
          <select name="type" value={employee.type} onChange={handleInputChange}>
            <option value="simple">Simple User</option>
            <option value="admin">Admin</option>
            <option value="super">Super Admin</option>
          </select>
          <button type="submit" className="blueBtn">Sign Up</button>
        </form>
        <Link to="/signin" className={styles.sign__link}>Don't have an account? Sign In</Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;