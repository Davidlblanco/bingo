import React from 'react'
import styles from "./header.module.css";
export default function Header() {
  
  return (
    <div className={styles.header}>
        <a href='/sort'>Sortear</a>
        <a href='/'>Tabela</a>
    </div>
  )
}
