import React, {useState,useContext} from "react";
import { AppContext } from "../../AppContext";

import {registrarAuth} from '../../firebase/config';
import {signInWithEmailAndPassword } from "firebase/auth";

import {Link, useNavigate} from 'react-router-dom';

import styles from './Login.module.css'

const Login = () => {

  const context = useContext(AppContext);
  const [username, setUsername] = useState('admin@fake.com');
  const [password, setPassword] = useState('test12345');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = registrarAuth;
    signInWithEmailAndPassword(auth, username, password)
      .then( (cred) => {
        context.user = cred.user
      })
      .catch( error => {
        const errorCode = error.code;
        const errorMsg = error.message;
        throw Error(`${errorCode}: ${errorMsg}`)
      })
      .finally( () => navigate('/myblogs'));
  } 

  return (
    <form className={styles.form} onSubmit={handleSubmit} >
      <label>
        <span>Username:</span>
        <input data-testid="username-test" type="email" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <label>
        <span>Password:</span>
        <input data-testid="pass-test" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button className={styles.btn}>Click to Complete Login</button>
      <br />
      <Link to='/'>Return to Main Schedule</Link>
      
    </form>
  )
}

export default Login;