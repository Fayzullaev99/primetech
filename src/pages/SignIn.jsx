import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isValidEmail } from '../helpers';
import { signIn } from '../store/employee';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './pages.module.css';

const initialData = {
  email: '',
  password: '',
  type: 'simple',
};

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const employees = useSelector((state) => state.employee[formData.type]);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const isValidSignIn = isValidEmail(formData.email) &&
      employees.some((user) => user.password === formData.password) &&
      employees.some((user) => user.type === formData.type) &&
      employees.some((user) => user.email === formData.email);

    if (isValidSignIn) {
      const loggedPerson = employees.filter((user) => user.email === formData.email);
      navigate('/');
      setFormData(initialData);
      dispatch(signIn(loggedPerson));
    } else {
      toast.info('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2 className="brand">
          <span>Prime </span>Tech
        </h2>
        <p className="form__title">Sign In</p>
        <form onSubmit={onSubmit} className="form">
          <input
            type="text"
            placeholder="Email Address *"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password *"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <select name="type" value={formData.type} onChange={handleInputChange}>
            <option value="simple">Simple User</option>
            <option value="admin">Admin</option>
            <option value="super">Super Admin</option>
          </select>
          <button type="submit" className="blueBtn">Sign In</button>
        </form>
        <Link to="/signup" className={styles.sign__link}>Don't have an account? Sign Up</Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
