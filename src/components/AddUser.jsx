import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { MdClear } from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css';
import styles from './component.module.css'
import { formatDate, isValidEmail, isValidName, isValidPhoneNumber } from '../helpers';
import { addUser, editUser } from '../store/employee';
const initialData = {
    firstname: "",
    lastname: "",
    state: "nomalum",
    email: "",
    address: "",
    phonenumber: "",
    reason: ""
}
function AddUser({ active, setActive, editedData }) {
    const [user, setUser] = useState(initialData);
    const isLoggedIn = useSelector((state) => state.employee.isLoggedIn);
    const loggedPerson = useSelector((state) => state.employee[isLoggedIn[0]?.type || isLoggedIn?.type]);
    let personType = loggedPerson.filter((user) => user.type === isLoggedIn[0]?.type || isLoggedIn?.type)[0]?.type;
    let personId = loggedPerson.findIndex((user) => user.email === isLoggedIn[0]?.email || isLoggedIn?.email);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (active) {
            setUser((prevState)=> (editedData ? { ...prevState,...editedData} : initialData));
        }
    }, [active, editedData]);
    const handleInputChange = (e) => {
        setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = isValidEmail(user.email) && isValidPhoneNumber(user.phonenumber) && isValidName(user.firstname) && isValidName(user.lastname);
        if (isValid) {
          let newUser = {
            id: new Date().getTime().toString(),
            ...user,
            timestamp: formatDate(new Date(Date.now())),
          };
    
          if (editedData) {
            dispatch(editUser({ updatedUser: newUser, personType: personType, personId: personId, userId: editedData.id }));
          } else {
            dispatch(addUser({ personType: personType, personId: personId, newUser }));
          }
    
          setUser(initialData);
          setActive(false);
        } else {
          toast.info('Something is wrong!!!');
        }
      };
    return (
        <div className={active ? styles.add__active : styles.add}>
            <div className={styles.add__block}>
                <h2 className="form__title">User Info</h2>
                <button className="closeBtn" onClick={() => setActive(false)}><MdClear /></button>
                <form onSubmit={onSubmit} className="form">
                    <div>
                        <input
                            type="text"
                            placeholder='First Name *'
                            name='firstname'
                            value={user.firstname}
                            onChange={handleInputChange}
                            required />
                        <input
                            type="text"
                            placeholder='Last Name *'
                            name='lastname'
                            value={user.lastname}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div>
                        <select
                            name='state'
                            value={user.state}
                            onChange={handleInputChange}>
                            <option value="nomalum">Noma'lum</option>
                            <option value="sotuv">Sotuv</option>
                            <option value="uchrashuv">Uchrashuv</option>
                            <option value="boglanish">Bog'lanib bo'lmadi</option>
                            <option value="rad">Rad Etildi</option>
                        </select>
                        <input
                            type="text"
                            placeholder='Address *'
                            name='address'
                            value={user.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {user.state === 'uchrashuv'
                        ? (<textarea name='reason' value={user.reason} placeholder="Aniq Manzil Kiriting" onChange={handleInputChange} required></textarea>)
                        : user.state === 'rad'
                        && (<textarea name='reason' value={user.reason} placeholder="Sabab Kiriting" onChange={handleInputChange} required></textarea>)}
                    <input
                        type="text"
                        placeholder='Email Address *'
                        name='email'
                        value={user.email}
                        onChange={handleInputChange}
                        required />
                    <input
                        type="text"
                        placeholder='Phone Number *'
                        name='phonenumber'
                        value={user.phonenumber}
                        onChange={handleInputChange}
                        required />
                    <button type='submit' className="blueBtn">{editedData ? 'Save Changes' : 'Add User'}</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddUser