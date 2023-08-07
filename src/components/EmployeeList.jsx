import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import {useSelector } from 'react-redux';
import { FaDownload, FaPen } from 'react-icons/fa';
import Filter from './Filter'
import styles from './component.module.css'
import EditEmployee from './EditEmployee';
import { downloadExcel } from '../helpers';

function EmployeeList() {
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const allEmployees = useSelector((state) => state.employee.simple);
    const [employees, setEmployees] = useState(allEmployees);
    useEffect(() => {
        setEmployees(allEmployees);
    }, [allEmployees]);
    const handleEdit = (userId) => {
        setEditingRowId(userId);
        const rowToEdit = employees.find((user) => user.id === userId);
        setEditedData(rowToEdit);
        setIsEditMode(true);
    };
    return (
        <div className={styles.employees}>
            <div className="container">
                <Filter allUsers={allEmployees} users={employees} setUsers={setEmployees} />
                <div className={styles.employees__block}>
                    <table className="table">
                        <thead className={styles.employees__thead}>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Time</th>
                                <th>Deadline</th>
                                <th>Sell</th>
                                <th>Meet</th>
                                <th>Cancel</th>
                                <th>Edit</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        {employees.map((employee, idx) => (
                            <tbody key={employee.id} className={styles.employees__tbody}>
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.phonenumber}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.timestamp}</td>
                                    <td>{employee.deadline}</td>
                                    <td>{employee.users.filter((el)=>el.state === "sotuv").length}</td>
                                    <td>{employee.users.filter((el)=>el.state === "uchrashuv").length}</td>
                                    <td>{employee.users.filter((el)=>el.state === "rad").length}</td>
                                    <td>
                                        <button onClick={() => handleEdit(employee.id)} className="editBtn"><FaPen /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => downloadExcel(employee)} className="downloadBtn"><FaDownload /></button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <EditEmployee active={isEditMode} setActive={setIsEditMode} editedData={editedData} />
        </div>
    )
}

export default EmployeeList