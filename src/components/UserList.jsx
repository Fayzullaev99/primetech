import React, { useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import styles from './component.module.css'
import AddUser from './AddUser';
import { deleteUser } from '../store/employee';
import Filter from './Filter';

function UserList() {
    const dispatch = useDispatch();
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const isLoggedIn = useSelector((state) => state.employee.isLoggedIn);
    const loggedPerson = useSelector((state) => state.employee[isLoggedIn[0]?.type || isLoggedIn?.type]);
    let personType = loggedPerson.filter((user) => user.type === isLoggedIn[0]?.type || isLoggedIn?.type)[0]?.type;
    let personId = loggedPerson.findIndex((user) => user.email === isLoggedIn[0]?.email || isLoggedIn?.email);
    const allUsers = useSelector((state) => state.employee[personType][personId].users);
    const [users, setUsers] = useState(allUsers);
    useEffect(() => {
        setUsers(allUsers);
    }, [allUsers]);
    const handleDelete = (userId) => {
        dispatch(deleteUser({ personType, personId, userId }));
        setEditingRowId(null);
    };

    const handleEdit = (userId) => {
        setEditingRowId(userId);
        const rowToEdit = users.find((user) => user.id === userId);
        setEditedData(rowToEdit);
        setIsEditMode(true);
    };

    return (
        <div className={styles.users}>
            <div className="container">
                <Filter allUsers={allUsers} users={users} setUsers={setUsers} />
                <div className={styles.users__block}>
                    <table className={styles.users__table}>
                        <thead className={styles.users__thead}>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Time</th>
                                <th>State</th>
                                <th>Reason</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {users.map((user, idx) => (
                            <tbody key={user.id} className={styles.users__tbody}>
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.timestamp}</td>
                                    <td>{user.state}</td>
                                    <td>{user.text}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user.id)} className={styles.users__edit}><FaPen /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user.id)} className={styles.users__delete}><FaTrash /></button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <AddUser active={isEditMode} setActive={setIsEditMode} editedData={editedData} />
        </div>
    )
}

export default UserList