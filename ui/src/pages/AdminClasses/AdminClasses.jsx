import React, {useState,useContext} from "react";
import { AppContext } from "../../AppContext";
import useFetch from "../../hooks/useFetch";

import {Link, useNavigate} from 'react-router-dom';

import styles from './AdminClasses.module.css'
import CreateClass from "../../components/CRUD/Classes/CreateClass";
import UpdateClass from "../../components/CRUD/Classes/UpdateClass";
import DeleteClass from "../../components/CRUD/Classes/DeleteClass";
const AdminClasses = () => {

  const [dept, setDept] = useState('');
  const [number, setNumber] = useState('');
  
  const [patchClass, setPatchClass] = useState(1);

  const [deleteClass, setDeleteClass] = useState(1);

  const navigate = useNavigate();
  
  const { data, err, load } = useFetch('classes');

  if (err) return <p>{err}</p>

  const handlePost = (e) => {
    e.preventDefault();
  }

  return (
    <main>
      <Link to='/classes'>Return to Classes</Link><br />
      <Link to='/'>Return to Main Schedule</Link>
      <CreateClass/>
      <UpdateClass/>
      <DeleteClass/>
    </main>

  )
}

export default AdminClasses;