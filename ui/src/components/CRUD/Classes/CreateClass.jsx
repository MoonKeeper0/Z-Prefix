import React, {useState} from 'react';

// Styles
import styles from '../CRUD.module.css';
import {RuxInput, RuxButton} from '@astrouxds/react';

const CreateClass = () => {

  
  const [dept, setDept] = useState('');
  const [number, setNumber] = useState('');
  const baseURL = 'http://localhost:8081/api/';
  

  

  const createFaculty = (e) => {
    fetch(baseURL + 'classes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({dept: dept, number: number})
      })
      .then(response => {
        setDept('');
        setNumber('');
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
  }

  return (
    <section>
        <h3>Add New Class</h3>
        <div className={styles.form} >
          <RuxInput type="text" value={dept} onRuxchange={(e) => setDept(e.target.value)} label="Department" required/>
          <RuxInput type="text" value={number} onRuxchange={(e) => setNumber(e.target.value)} label="Number" required/>
         </div>
        <div className={styles.form}>
          <RuxButton onClick={createFaculty}>Add New Class</RuxButton>
        </div>
      </section>
  )

}

export default CreateClass;