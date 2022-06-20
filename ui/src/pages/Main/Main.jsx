import React, { useState, useEffect } from "react"; 



// Third Party Hooks and Components

// Styling
import mainStyles from './Main.module.css';

import { Link } from "react-router-dom";

const Main = () => {


  return (
    <>
    <h3>Landing Page</h3>
        <div className={mainStyles.bottomListLink}>
          
         <Link to="/login">Login</Link>
         <Link to="/">Home</Link>
         <Link to="/blogs">Blogs</Link>
         <Link to="/newuser">New User</Link>
    
        </div>
      </>  
  )
}

export default Main;