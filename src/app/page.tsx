"use client";
import React,{useEffect, useState} from "react";
import Header from "./components/Header";


import styles from "./page.module.css";

export default function Home() {
  const [selectedNumbers,setSelectedNumbers] = useState<number[]>([])
  const [numbers,setNumbers] = useState<number[][]>([])

  const columns = [1,21,41,61,81];
  const generateTable = (min:number) =>{
    const max = min + 19
    const finalArr :number[]= []
    while (finalArr.length<5){
      const random = Math.floor(Math.random() * (max - min + 1) + min);
      if(!finalArr.includes(random)){
        finalArr.push(random)
      }
    }
    return finalArr;
   }
   useEffect(()=>{
      const newTable = columns.map(i => generateTable(i).map(item => item))
      setNumbers(newTable)
    }
    ,[])
    console.log('setNumbers',selectedNumbers)
   const handleClick = (number:number) => {
    if(selectedNumbers.includes(number)){
      setSelectedNumbers(selectedNumbers.filter(item=>item!=number))
    }else{
      setSelectedNumbers([...selectedNumbers,number]) 
    }
   }
  return (
   <div>
    <Header/>
    <div>
      <div className={styles.fullTableTitle}>
            <p>B</p>
            <p>I</p>
            <p>N</p>
            <p>G</p>
            <p>O</p>
          </div>
      <div className={styles.fullTable}>
        {columns.map((itm,idx)=>
          <ul key={itm}>  
            {numbers[idx]?.map(item=>
              <li key={item} className={selectedNumbers.includes(item)?styles.active:''}>
                <button onClick={()=>handleClick(item)}>{item}</button>
              </li>
              )}
          </ul>)}
      </div>
    </div>
   </div>
  );
}
