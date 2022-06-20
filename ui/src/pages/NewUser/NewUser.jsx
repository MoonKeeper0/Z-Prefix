import React, {useState,useContext} from "react";
import { AppContext } from "../../AppContext";

import {registrarAuth} from '../../firebase/config';
import {signInWithEmailAndPassword } from "firebase/auth";

import {Link, useNavigate} from 'react-router-dom';

import styles from './NewUser.module.css'

const NewUser = () => {

  const context = useContext(AppContext);
  const [username, setUsername] = useState('admin@fake.com');
  const [nickname, setNickname] = useState('admin@fake.com');
  const [password, setPassword] = useState('test12345');
  
  const baseURL = 'http://localhost:8081/api/';

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL + 'users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({username: username, nickname: nickname, password: password})
      })
      .then(response => {
        setUsername('');
        setNickname('');
        setPassword('');
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
  }
  

  return (
    <form className={styles.form} onSubmit={handleSubmit} >
        
      <label>
        <span>Username:</span>
        <input data-testid="nickname-test" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
      </label>
      <label>
        <span>Nickname:</span>
        <input data-testid="username-test" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <label>
        <span>Password:</span>
        <input data-testid="pass-test" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button className={styles.btn}>Click to Add</button>
      <br />
      <Link to='/'>Return to Main Schedule</Link>
      
    </form>
  )
}

export default NewUser;