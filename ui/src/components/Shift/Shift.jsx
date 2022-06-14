import React, {useState} from "react";
import styles from './Shift.module.css';
import { RuxButton } from '@astrouxds/react';

const Shift = ({title, inst, loc, time, roster}) => {

  const [isOpen, setIsOpen] = useState(false);

  const Modal = ({ setIsOpen }) => {
    return (
      <div className={styles.roster}>
        
        <h1>{title}</h1>
        <h2>{`Instructor: ${inst}`}</h2>
        <h2>{`Location: ${loc}`}</h2>
        <h2>{`Time: ${time}`}</h2>
        <h3>Roster</h3>
        <ul>
            {roster.map((student, index) => <li key={index}>{`${student.rank} ${student.last}`}</li>)}
        </ul>
        <div className={styles.btn}>
          <RuxButton onClick={() => setIsOpen(false)}>Close</RuxButton>
        </div>
      </div>
    )
  }

  return (
    <>
      {!isOpen && 
        <div className={styles[`shift${String(time.slice(0,1))}`]} onClick={e => {setIsOpen(true)}}>
          <div className={styles.shiftTitle}>{title}</div>
          <div>{inst}</div>
          <div>{loc}</div>
          <div>{time}</div>
        </div>
      }     
      {isOpen && <Modal setIsOpen={setIsOpen} />} 
    </>
  )
}

export default Shift;