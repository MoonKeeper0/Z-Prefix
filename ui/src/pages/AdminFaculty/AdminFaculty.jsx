import React, {useState,useContext} from "react";
import { AppContext } from "../../AppContext";
import useFetch from "../../hooks/useFetch";

import {Link, useNavigate} from 'react-router-dom';

import styles from './AdminFaculty.module.css'
import CreateFaculty from "../../components/CRUD/Faculty/CreateFaculty";
import UpdateFaculty from "../../components/CRUD/Faculty/UpdateFaculty";
import DeleteFaculty from "../../components/CRUD/Faculty/DeleteFaculty";
const AdminFaculty = () => {

  
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone_work, setPhone_Work] = useState('');
  const [phone_cell, setPhone_Cell] = useState('');
  
  const [patchFaculty, setPatchFaculty] = useState(1);

  const [deleteFaculty, setDeleteFaculty] = useState(1);

  const navigate = useNavigate();
  
  const { data, err, load } = useFetch('faculty');

  if (err) return <p>{err}</p>

  const handlePost = (e) => {
    e.preventDefault();
  }

  return (
    <main>
      <Link to='/faculty'>Return to Faculty</Link><br />
      <Link to='/'>Return to Main Schedule</Link>
     <CreateFaculty/>
     <UpdateFaculty/>
     <DeleteFaculty/>
    </main>

  )
}

export default AdminFaculty;