import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'
import { HiOutlinePlus } from 'react-icons/hi'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import styles from './component.module.css'
import AddUser from './AddUser'
import { signOut } from '../store/employee'
function NavBar() {
  const loggedUser = useSelector((state) => state.employee.isLoggedIn)
  const dispatch = useDispatch()
  const [showAccount, setShowAccount] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const handleAddUser = () => {
    setIsEditMode(true);
    setEditedData(null);
  };
  return (
    <header className={styles.header}>
      <div className={classNames(styles.header__nav, 'container')}>
        <Link to={"/"} className="brand"><span>Prime</span> Tech</Link>
        <div className={styles.header__list}>
          <div className="whiteBtn" onClick={() =>handleAddUser()}>
            <HiOutlinePlus />
            <span>User</span>
          </div>
          <div className="whiteBtn" onClick={() => setShowAccount(!showAccount)}>
            <FiUser />
          </div>
          <div className={showAccount ? "enabled" : "disabled"}>
            <button className="closeBtn" onClick={() => setShowAccount(false)}><MdClear /></button>
            <h3 className={styles.header__name}>{loggedUser[0]?.firstName || loggedUser.firstName}</h3>
            <a href={`mailto:${loggedUser[0]?.email || loggedUser.email}`} className={styles.header__email}>{loggedUser[0]?.email || loggedUser.email}</a>
            <button className="blueBtn" onClick={()=>dispatch(signOut())}>Sign Out</button>
          </div>
        </div>
      </div>
      <AddUser active={isEditMode} setActive={setIsEditMode} editedData={editedData} />
    </header>
  )
}

export default NavBar