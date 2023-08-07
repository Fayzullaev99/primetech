import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import List from './List'

function AdminList() {
  const allEmployees = useSelector((state) => state.employee.admin);
  const allUsers = useSelector((state) => state.employee.simple);
  const [editedData, setEditedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [employees, setEmployees] = useState(allEmployees);
  const [users, setUsers] = useState(allUsers);
  const people = [...allEmployees,...allUsers]
  const [person,setPerson] = useState([...allEmployees,...allUsers])
  return (
    <div>
      <List allUsers={people}  users={person}  setUsers={setPerson} title={"Totals"} loggedType={"super"} />
      <List allUsers={allEmployees}  users={employees}  setUsers={setEmployees} title={"Admins"} loggedType={"super"} />
      <List allUsers={allUsers}  users={users}  setUsers={setUsers} title={"Simple"} loggedType={"super"} />
    </div>
  )
}

export default AdminList