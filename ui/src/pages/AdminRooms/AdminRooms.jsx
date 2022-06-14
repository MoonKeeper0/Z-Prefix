// React Imports
import React, {useState,useEffect} from "react";

// Our Components and Hooks
import useFetch from "../../hooks/useFetch";

// Third Party Components and Hooks
import {Link} from 'react-router-dom';

import styles from './AdminRooms.module.css'
import {RuxSelect, RuxOption} from '@astrouxds/react';

import CreateRoom from "../../components/CRUD/Rooms/CreateRoom";
import DeleteRoom from "../../components/CRUD/Rooms/DeleteRoom";
import UpdateRoom from "../../components/CRUD/Rooms/UpdateRoom";

const AdminRooms = () => {

  // LIST OF ALL ROOMS
  const [allRooms, setAllRooms] = useState([]);
  const { data, err, load } = useFetch('rooms');

  // These states apply to PATCH
    // dont exist yet

  // These states apply to DELETE
  const [patchRoom, setPatchRoom] = useState(1);

  // customHooks

  useEffect(() => {
    setAllRooms(data);
  }, [load,allRooms])

  if (err) return <p>{err}</p>
  
  return (
    <main>
      <Link to='/rooms'>Return to Rooms</Link><br />
      <Link to='/'>Return to Main Schedule</Link>
      <CreateRoom />
      <UpdateRoom />
      <DeleteRoom />
    </main>

  )
}

export default AdminRooms;