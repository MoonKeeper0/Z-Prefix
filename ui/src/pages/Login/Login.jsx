import React, {useState,useContext,useEffect} from "react";
import { AppContext } from "../../AppContext";



import {Link, useNavigate} from 'react-router-dom';

import styles from './Login.module.css'
 
const Login = () => {

  const context = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  async function signIn (username, password,users){
    //console.log(password==[users[0].password])
    //console.log(users.id);
    var newArray = [];
    for(var x in users){
      console.log(users[x].id);
      if((username == users[x].username) && (password == users[x].password)){
      
        
        newArray.push(users[x].id);
       }
    }
      
    console.log(newArray[0]);
    return newArray;
   }
  useEffect(() => {
      
    fetch(`http://localhost:8081/api/users`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Cannot convert response to json');
      }
    })
    .then(json => {
      setUsers(json)
    })
    .catch(e => console.log(e))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    signIn(username, password, users)
      .then( (user) => {
        console.log(user);
        context.user = user[0]
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
      <h3>Login Page</h3>
      <label>
        <span>Username:</span>
        <input data-testid="username-test" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <label>
        <span>Password:</span>
        <input data-testid="pass-test" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button className={styles.btn}>Click to Complete Login</button>
      <br />
      <Link to='/'>Return to Landing Page</Link>
      
    </form>
  )
}

export default Login;