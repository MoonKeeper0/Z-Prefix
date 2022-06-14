import React, {useState} from 'react';

// Styles
import styles from '../CRUD.module.css';
import {RuxInput, RuxButton} from '@astrouxds/react';

const CreateFaculty = () => {

  const [rank, setRank] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_work, setPhone_Work] = useState('');
  const [phone_cell, setPhone_Cell] = useState('');
  const baseURL = 'http://localhost:8081/api/';
  

  

  const createFaculty = (e) => {
    fetch(baseURL + 'faculty', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({rank: rank, first: first, last: last, nickname: nickname, email: email, phone_work: phone_work, phone_cell: phone_cell})
      })
      .then(response => {
        setRank('');
        setFirst('');
        setLast('');
        setNickname('');
        setEmail('');
        setPhone_Work('');
        setPhone_Cell('');
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
  }

  return (
    <section>
        <h3>Add New Faculty Member</h3>
        <div className={styles.form} >
          <RuxInput type="text" value={rank} onRuxchange={(e) => setRank(e.target.value)} label="Rank" required/>
          <RuxInput type="text" value={first} onRuxchange={(e) => setFirst(e.target.value)} label="First" required/>
          <RuxInput type="text" value={last} onRuxchange={(e) => setLast(e.target.value)} label="Last" required/>
          <RuxInput type="text" value={nickname} onRuxchange={(e) => setNickname(e.target.value)} label="Nickname" required/>
          <RuxInput type="text" value={email} onRuxchange={(e) => setEmail(e.target.value)} label="Email" />
          <RuxInput type="tel" value={phone_work} onRuxchange={(e) => setPhone_Work(e.target.value)} label="Work Phone" />
          <RuxInput type="tel" value={phone_cell} onRuxchange={(e) => setPhone_Cell(e.target.value)} label="Cell Phone" />
        </div>
        <div className={styles.form}>
          <RuxButton onClick={createFaculty}>Add New Faculty</RuxButton>
        </div>
      </section>
  )

}

export default CreateFaculty;