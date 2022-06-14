import React, {useState,useContext} from "react";
import { AppContext } from "../../AppContext";

import {registrarAuth} from '../../firebase/config';
import {signInWithEmailAndPassword } from "firebase/auth";

import {Link, useNavigate} from 'react-router-dom';

import styles from './AdminLogin.module.css'

const AdminLogin = () => {

  const context = useContext(AppContext);
  const [email, setEmail] = useState('admin@fake.com');
  const [password, setPassword] = useState('test12345');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = registrarAuth;
    signInWithEmailAndPassword(auth, email, password)
      .then( (cred) => {
        context.user = cred.user
      })
      .catch( error => {
        const errorCode = error.code;
        const errorMsg = error.message;
        throw Error(`${errorCode}: ${errorMsg}`)
      })
      .finally( () => navigate('/'));
  } 

  return (
    <form className={styles.form} onSubmit={handleSubmit} >
      <label>
        <span>Email:</span>
        <input data-testid="email-test" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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

export default AdminLogin;