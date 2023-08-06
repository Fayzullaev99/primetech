import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { MdClear } from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css';
import styles from './component.module.css'
import { formatDate, isValidEmail, isValidName, isValidPhoneNumber } from '../helpers';
import { addUser, editUser } from '../store/employee';
const initialData = {
    name: "",
    family: "",
    state: "nomalum",
    email: "",
    address: "",
    phone: "",
    text: ""
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
        const isValid = isValidEmail(user.email) && isValidPhoneNumber(user.phone) && isValidName(user.name) && isValidName(user.family);
        if (isValid) {
          let newUser = {
            id: new Date().getTime().toString(),
            ...user,
            timestamp: formatDate(new Date(Date.now())),
          };
    
          if (editedData) {
            dispatch(editUser({ updatedUser: newUser, personType: personType, personId: personId, userId: editedData.id }));
          } else {
            // Add user
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
                <h2 className={styles.add__title}>User Info</h2>
                <button className={styles.add__close} onClick={() => setActive(false)}><MdClear /></button>
                <form onSubmit={onSubmit} className={styles.add__form}>
                    <div className={styles.add__box}>
                        <input
                            type="text"
                            placeholder='First Name *'
                            name='name'
                            value={user.name}
                            onChange={handleInputChange}
                            required />
                        <input
                            type="text"
                            placeholder='Last Name *'
                            name='family'
                            value={user.family}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className={styles.add__box}>
                        <select
                            name='state'
                            value={user.state}
                            onChange={handleInputChange}
                            className={styles.add__select}>
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
                        ? (<textarea name='text' value={user.text} placeholder="Aniq Manzil Kiriting" onChange={handleInputChange} required></textarea>)
                        : user.state === 'rad'
                        && (<textarea name='text' value={user.text} placeholder="Sabab Kiriting" onChange={handleInputChange} required></textarea>)}
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
                        name='phone'
                        value={user.phone}
                        onChange={handleInputChange}
                        required />
                    <button type='submit' className={styles.add__btn}>{editedData ? 'Save Changes' : 'Add User'}</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddUser