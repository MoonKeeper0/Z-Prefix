import React, { useState, useEffect } from "react"; 



// Third Party Hooks and Components

// Styling
import mainStyles from './Main.module.css';

import { Link } from "react-router-dom";

const Main = () => {


  return (
    
        <div className={mainStyles.bottomListLink}>
         <Link to="/login">Login</Link>
         <Link to="/">Home</Link>
         <Link to="/blogs">Blogs</Link>

        </div>
        
  )
}

export default Main;