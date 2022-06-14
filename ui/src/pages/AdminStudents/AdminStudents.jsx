import React, {useState,useContext} from "react";
import { AppContext } from "../../AppContext";
import useFetch from "../../hooks/useFetch";

import {Link, useNavigate} from 'react-router-dom';

import styles from './AdminStudents.module.css'
import CreateStudent from "../../components/CRUD/Students/CreateStudent";
import UpdateStudent from "../../components/CRUD/Students/UpdateStudent";
import DeleteStudent from "../../components/CRUD/Students/DeleteStudent";
const AdminClasses = () => {

  
  
  const { data, err, load } = useFetch('classes');

  if (err) return <p>{err}</p>

  const handlePost = (e) => {
    e.preventDefault();
  }

  return (
    <main>
      <Link to='/students'>Return to Students</Link><br />
      <Link to='/'>Return to Main Schedule</Link>
      <CreateStudent/>
      <UpdateStudent/>
      <DeleteStudent/>
    </main>

  )
}

export default AdminClasses;