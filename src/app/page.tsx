'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [numbers, setNumbers] = useState<number[][]>([]);
  const [gameNumber, setGameNumber] = useState<number>();
  const [checkNumbers, setCheckNumbers] = useState<number[]>([]);

  const [checkedId, setCheckedId] = useState<number>(0);

  const columns = [1, 21, 41, 61, 81];

  const bingo = ['b', 'i', 'n', 'g', 'o'];
  function compareNumbers(a: number, b: number) {
    return a - b;
  }
  const generateTable = (min: number) => {
    const max = min + 19;
    const finalArr: number[] = [];
    while (finalArr.length < 5) {
      const random = Math.floor(Math.random() * (max - min + 1) + min);
      if (!finalArr.includes(random)) {
        finalArr.push(random);
      }
    }
    return finalArr.sort(compareNumbers);
  };
  useEffect(() => {
    const newTable = columns.map((i) => generateTable(i).map((item) => item));
    setNumbers(newTable);
  }, []);
  const handleClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((item) => item != number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };
  async function handleCheck() {
    if (checkNumbers.length > 0) {
      setCheckNumbers([]);
      setCheckedId(0);
      return;
    }
    const url = `/api${gameNumber ? '?id=' + gameNumber : ''}`;
    const res = await fetch(url)
      .then((res) => res.json())
      .then((res) => res);
    const currentGame = gameNumber ? res : res.games[res.games.length - 1];

    if (currentGame?.numbers) {
      setCheckedId(currentGame.id);
      setCheckNumbers(currentGame.numbers);
    }
  }
  function handleSetGameNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const number = parseInt(e.target.value);
    if (!number) {
      setGameNumber(undefined);
      return;
    }
    setGameNumber(number);
  }

  return (
    <div>
      <div className={styles.tableHolder}>
        <div className={styles.fullTable}>
          {columns.map((itm, idx) => (
            <ul key={itm}>
              <li>
                <p>{bingo[idx]}</p>
              </li>
              {numbers[idx]?.map((item, index) => (
                <li
                  key={item}
                  className={
                    selectedNumbers.includes(item) ? styles.active : ''
                  }
                >
                  {idx === 2 && index == 2 ? (
                    <p>🐣</p>
                  ) : (
                    <button
                      className={
                        checkNumbers.includes(item) ? styles.checked : ''
                      }
                      onClick={() => handleClick(item)}
                    >
                      {item}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className={styles.check}>
        <p>Jogo Conferido: {checkedId > 0 ? checkedId : '--'}</p>
        <div>
          <input
            type="number"
            placeholder="Número do jogo"
            onChange={handleSetGameNumber}
          />
          <button onClick={handleCheck}> Conferir</button>
        </div>
      </div>
    </div>
  );
}
