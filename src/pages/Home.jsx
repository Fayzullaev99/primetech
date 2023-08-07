import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import styles from './pages.module.css'
import UserList from '../components/UserList'
import AdminList from '../components/AdminList'
import EmployeeList from '../components/EmployeeList'

function Home({ loggedType }) {
  return (
    <>
      <NavBar />
      <main>
        <div className={styles.page}>
          {loggedType === 'super' ? (
            <AdminList />
          ) : loggedType === 'admin' ? (
            <EmployeeList />
          ) : (
            <UserList loggedType={loggedType} />
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home