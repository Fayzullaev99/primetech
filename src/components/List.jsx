import { FaDownload, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import styles from './component.module.css';
import Filter from './Filter';
import { downloadExcel } from '../helpers';

function List({ allUsers, users, setUsers, loggedType, title, deleteHandler }) {
    const dispatch = useDispatch();

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
                                <th>First Name</th>
                                <th>Position</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Time</th>
                                <th>State</th>
                                <th>Reason</th>
                                {title !== "Users" ? <th>Delete</th> : <th></th>}
                                <th>Download</th>
                            </tr>
                        </thead>
                        {users.map((user, idx) => (
                            <tbody key={user.id} className={styles.list__tbody}>
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.position}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber}</td>
                                    <td>{user.address}</td>
                                    <td>{user.timestamp}</td>
                                    <td>{user.state}</td>
                                    <td>{user.reason}</td>
                                    {title !== "Users" ? (
                                        <td>
                                            <button onClick={() => dispatch(deleteHandler(user.id))} className="deleteBtn"><FaTrash /></button>
                                        </td>
                                    ):<td></td>}
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
    );
}

export default List;