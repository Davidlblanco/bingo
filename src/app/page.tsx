"use client";
import React,{useEffect, useState} from "react";
import Header from "./components/Header";


import styles from "./page.module.css";

export default function Home() {
  const [selectedNumbers,setSelectedNumbers] = useState<number[]>([])
  const [numbers,setNumbers] = useState<number[][]>([])

  const columns = [1,21,41,61,81];

  const bingo = ['b','i','n','g','o'];
  function compareNumbers(a:number, b:number) {
    return a - b;
  }
  const generateTable = (min:number) =>{
    const max = min + 19
    const finalArr :number[]= []
    while (finalArr.length<5){
      const random = Math.floor(Math.random() * (max - min + 1) + min);
      if(!finalArr.includes(random)){
        finalArr.push(random)        
      }
    }
    return finalArr.sort(compareNumbers);
   }
   useEffect(()=>{
      const newTable = columns.map(i => generateTable(i).map(item => item))
      setNumbers(newTable)
    }
    ,[])
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
    <div className={styles.tableHolder}>
      <div className={styles.fullTable}>
        {columns.map((itm,idx)=>
          <ul key={itm}>  
            <li><p>{bingo[idx]}</p></li>
            {numbers[idx]?.map((item,index)=>
              <li key={item} className={selectedNumbers.includes(item)?styles.active:''}>
                {idx===2&&index==2?<p>🐣</p>:
                <button onClick={()=>handleClick(item)}>{item}</button>
                }
              </li>
              )}
          </ul>)}
      </div>
    </div>
   </div>
  );
}
