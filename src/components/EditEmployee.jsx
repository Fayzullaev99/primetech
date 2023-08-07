import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdClear } from 'react-icons/md'
import styles from './component.module.css'
import { editEmployee } from '../store/employee';

function EditEmployee({ active, setActive, editedData }) {
    const [deadline, setDeadline] = useState("");
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        setDeadline(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(editEmployee({ updatedUser: {deadline}, personType: "simple", userId: editedData.id }));
        setDeadline("");
        setActive(false);
    }
    return (
        <div className={active ? styles.add__active : styles.add}>
            <div className={styles.add__block}>
                <h2 className="form__title">Employee Info</h2>
                <button className="closeBtn" onClick={() => setActive(false)}><MdClear /></button>
                <form onSubmit={onSubmit} className="form">
                        <input
                            type="datetime-local"
                            placeholder='Deadline *'
                            name='deadline'
                            value={deadline}
                            onChange={handleInputChange}
                            required />
                        <button type='submit' className="blueBtn">Save Changes</button>
                </form>
            </div>
        </div>
    )
}
export default EditEmployee