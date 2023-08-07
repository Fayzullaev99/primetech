import React from 'react'
import { FaDownload, FaPen, FaTrash } from 'react-icons/fa';
import styles from './component.module.css'
import AddUser from './AddUser';
import Filter from './Filter';
import { downloadExcel } from '../helpers';

function List({ allUsers, users, setUsers, loggedType,title }) {
    const handleEdit = ()=>{}
    const handleDelete = ()=>{}
    return (
        <div className={styles.list}>
            <div className="container">
                <h2 className="title">{title}</h2>
                <Filter allUsers={allUsers} users={users} setUsers={setUsers} loggedType={loggedType} />
                <div className={styles.list__block}>
                    <table className="table">
                        <thead className={styles.list__thead}>
                            <tr>
                                <th>Id</th>
                                <th>Type</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Time</th>
                                <th>State</th>
                                <th>Reason</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Download</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        {users.map((user, idx) => (
                            <tbody key={user.id} className={styles.list__tbody}>
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{user.type}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber}</td>
                                    <td>{user.address}</td>
                                    <td>{user.timestamp}</td>
                                    <td>{user.state}</td>
                                    <td>{user.reason}</td>
                                    <td>{user.position}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user.id)} className="editBtn"><FaPen /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user.id)} className="deleteBtn"><FaTrash /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => downloadExcel(user)} className="downloadBtn"><FaDownload /></button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default List