import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import List from './List'
import { deleteAdmin, deleteSimple, deleteUser } from '../store/employee';

function AdminList() {
  const dispatch = useDispatch();
  const allAdmins = useSelector((state) => state.employee.admin);
  const allEmployees = useSelector((state) => state.employee.simple);
  const allUsers = allEmployees.flatMap((employee) => employee.users);
  const [employees, setEmployees] = useState(allEmployees);
  const [users, setUsers] = useState(allUsers);
  const [admins, setAdmins] = useState(allAdmins);

  useEffect(() => {
    setAdmins(allAdmins);
  }, [allAdmins]);

  return (
    <div>
      {admins.length > 0 ? (
        <List
          allUsers={allAdmins}
          users={admins}
          setUsers={setAdmins}
          title={"Admins"}
          loggedType={"super"}
          deleteHandler={(userId) => dispatch(deleteAdmin({ personType: 'admin', userId }))}
        />
      ) : (
        <h2 className='title'>Nobody in Admins 😔</h2>
      )}
      {employees.length > 0 ? (
        <List
          allUsers={allEmployees}
          users={employees}
          setUsers={setEmployees}
          title={"Simple Employees"}
          loggedType={"super"}
          deleteHandler={(userId) => dispatch(deleteSimple({ personType: 'simple', userId }))}
        />
      ) : (
        <h2 className='title'>Nobody in Employees 😔</h2>
      )}
      {users.length > 0 ? (
        <List
          allUsers={allUsers}
          users={users}
          setUsers={setUsers}
          title={"Users"}
          loggedType={"super"}
          deleteHandler={(userId) => dispatch(deleteUser({ personType: 'user', userId }))}
        />
      ) : (
        <h2 className='title'>Nobody in Users 😔</h2>
      )}
    </div>
  )
}

export default AdminList