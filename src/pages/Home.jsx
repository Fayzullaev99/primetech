import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import styles from './pages.module.css'
import UserList from '../components/UserList'

function Home() {
  return (
    <>
      <NavBar />
      <main>
        <div className={styles.page}>
          <UserList />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home