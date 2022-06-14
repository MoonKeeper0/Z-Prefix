import React, {useState} from 'react';

// Styles
import styles from '../CRUD.module.css';
import {RuxInput, RuxButton} from '@astrouxds/react';

const CreateRoom = () => {

  const [bldg, setBldg] = useState('');
  const [room, setRoom] = useState('');
  const [capacity, setCapacity] = useState(12);
  const [phone, setPhone] = useState('');
  const baseURL = 'http://localhost:8081/api/';

  const createRoom = (e) => {
    fetch(baseURL + 'rooms', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({bldg: bldg, room: room, capacity: capacity, phone: phone})
      })
      .then(response => {
        setBldg('');
        setRoom('');
        setCapacity(0);
        setPhone('');
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
  }

  return (
    <section>
        <h3>Add New Class Room</h3>
        <div className={styles.form} >
          <RuxInput type="text" value={bldg} onRuxchange={(e) => setBldg(e.target.value)} label="Building" required/>
          <RuxInput type="text" value={room} onRuxchange={(e) => setRoom(e.target.value)} label="Room" required/>
          <RuxInput type="number" min={1} value={capacity} onRuxchange={(e) => setCapacity(e.target.value)} label="Capacity" />
          <RuxInput type="tel" value={phone} onRuxchange={(e) => setPhone(e.target.value)} label="Phone (4 digit extension)" />
        </div>
        <div className={styles.form}>
          <RuxButton onClick={createRoom}>Add New Classroom</RuxButton>
        </div>
      </section>
  )
}

export default CreateRoom;