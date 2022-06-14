import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const RoomDetails = () => {

  const params = useParams();
  const { data, err, load } = useFetch('rooms/' + params.id);
  
  if (err !== null) return {err}
  if (load) return <p>Loading...</p>

  return (
    <section>
      <ul>
        <li>Building: {data[0].bldg}</li>
        <li>Room: {data[0].room}</li>
        <li>Capacity: {data[0].capacity}</li>
        <li>Phone: {data[0].phone}</li>
      </ul>

      <Link to='/rooms'>Return to Rooms</Link><br />
      <Link to='/'>Return to Main Schedule</Link>

    </section>
  )
}

export default RoomDetails;