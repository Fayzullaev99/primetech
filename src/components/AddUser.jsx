import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
import styles from './component.module.css'
const initialData = {
    name: "",
    family: "",
    age: "",
    email: "",
    address: "",
    phone: "",
}
function AddUser({check,setCheck}) {
    console.log(check);
    const [user, setUser] = useState(initialData);
    const onSubmit = (e) => { }
    const handleInputChange = (e) => {
        setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };
    return (
        <div className={check ? styles.add__active : styles.add}>
            <div className={styles.add__block}>
                <h2 className={styles.add__title}>User Info</h2>
                <button className={styles.add__close} onClick={() => setCheck(false)}><MdClear /></button>
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
                        <input
                            type="text"
                            placeholder='Your Age *'
                            name='age'
                            value={user.age}
                            onChange={handleInputChange}
                            required />
                        <input
                            type="text"
                            placeholder='Address *'
                            name='address'
                            value={user.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
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
                    <button type='submit' className={styles.add__btn}>Add User</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser