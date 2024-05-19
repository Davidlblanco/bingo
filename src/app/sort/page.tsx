"use client";
import React, { useState } from 'react';
import Header from '../components/Header'
import styles from "./page.module.css";

export default function Page() {
  const numbers = [...Array(101).keys()].splice(1);
  const [allNumbers, setAllNumbers] = useState(numbers);
  const [sortedNumbers, setSortedAllNumbers] = useState<number[]>([]);
  const handleClick = () => {
    const sort = allNumbers[Math.floor(Math.random()*allNumbers.length)];
    const newNumbers = allNumbers.filter(item => item !== sort);
    setSortedAllNumbers([...sortedNumbers,sort])
    setAllNumbers(newNumbers.filter(item=>item!=sort));
  };
  const restart = () => {
    setSortedAllNumbers([])
    setAllNumbers(numbers);
  }
  const lastItems = sortedNumbers.length>0 &&sortedNumbers.length<6?sortedNumbers:sortedNumbers.slice(Math.max(sortedNumbers.length - 5, 1))

  return (
    <div className={styles.sort}>
      <Header />
      <button onClick={handleClick} disabled={allNumbers.length===0}>Sortear</button>
      <button onClick={restart} >Reiniciar</button>
      {sortedNumbers.length>0?<div  className={styles.lastNumber}>Último número: {sortedNumbers[sortedNumbers.length -1]}</div>:null}
      {lastItems.length>0?
        <div>Últimos 5 números: 
          <ul className={styles.lastFive}>
            {lastItems.map(item=><li key={item}>{item}</li>)}
          </ul>
        </div>:null}
        <div className={styles.fullTableTitle}>
          <p>B</p>
          <p>I</p>
          <p>N</p>
          <p>G</p>
          <p>O</p>
        </div>
      <div className={styles.fullTable}>
        {numbers.map(number =>
          <div key={number} className={sortedNumbers.includes(number)?styles.active:''}>{number}</div>,
        )}
      </div>
    </div>
  )
}
