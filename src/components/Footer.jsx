import React from 'react'
import styles from './component.module.css'

function Footer() {
  const fullYear = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <h2 className="brand"><span>Prime</span> Tech</h2>
      <p className={styles.footer__text}>Copyright &copy; {fullYear} All rights</p>
    </footer>
  )
}

export default Footer