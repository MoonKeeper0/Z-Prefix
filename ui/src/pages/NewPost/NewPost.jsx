import React, {useState} from 'react';

// Styles
import styles from './NewPost.module.css';
import {RuxInput, RuxButton} from '@astrouxds/react';

const NewPost = ({userid = 1}) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
 
  console.log(typeof userid);
  const baseURL = 'http://localhost:8081/api/';

  const newPost = (e) => {
    fetch(baseURL + 'posts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({title: title, body: body, id_user: userid})
      })
      .then(response => {
        setTitle('');
        setBody('');
        
        
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
          <RuxInput type="text" value={title} onRuxchange={(e) => setTitle(e.target.value)} label="Title" required/>
          <RuxInput type="text" value={body} onRuxchange={(e) => setBody(e.target.value)} label="Body" required/>
          
          <RuxInput type="text" value={userid} onRuxchange={(e) => (e.target.value)} label="Author" disabled="True"/>
        </div>
        <div className={styles.form}>
          <RuxButton onClick={newPost}>Add New Classroom</RuxButton>
        </div>
      </section>
  )
}

export default NewPost;