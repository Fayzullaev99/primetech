import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { HiOutlinePlus } from 'react-icons/hi'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import styles from './component.module.css'
import AddUser from './AddUser'
function NavBar() {
  const employees = useSelector((state) => state.employee.simple)
  const dispatch = useDispatch()
  const [addUser, setAddUser] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  return (
    <header className={styles.header}>
      <div className={classNames(styles.header__nav, 'container')}>
        <Link to={"/"} className={styles.header__brand}><span>Prime</span> Tech</Link>
        <div className={styles.header__list}>
          <div className={styles.header__add} onClick={() =>setAddUser(true)}>
            <HiOutlinePlus />
            <span>User</span>
          </div>
          <div className={styles.header__user} onClick={() => setAddUser(true)}>
            <FiUser />
          </div>
          <div className={showAccount ? styles.header__account_active : styles.header__account}>
            <h3 className={styles.header__name}>Sanjar</h3>
            <a href={`mailto:sanjarfayzullaev99@gmail.com`} className={styles.header__email}>sanjarfayzullaev99@gmail.com</a>
            <button className={styles.header__signout}>Sign Out</button>
            {/* <h3>{user.name}</h3>
        <a href={`mailto:${user.email}`}>{user.email}</a>
        <button onClick={()=>dispatch(signOut)}>Sign Out</button> */}
          </div>
        </div>
      </div>
      <AddUser check={addUser} setCheck={setAddUser} />
    </header>
  )
}

export default NavBar