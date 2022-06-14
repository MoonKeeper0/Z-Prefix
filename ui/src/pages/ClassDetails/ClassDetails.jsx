import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const ClassDetails = () => {
   //RosterData = useFetch(`rosters/${search.date}`)
  const params = useParams();
  const { data, err, load } = useFetch('classes/' + params.id);
  
  if (err !== null) return {err}
  if (load) return <p>Loading...</p>

  return (
    <section>
      <ul>
        <li>Department: {data[0].dept}</li>
        <li>Course Number: {data[0].number}</li>
        
        <li>Teachers: {}</li>
        
        <li>Students: {}</li>
      </ul>

      <Link to='/rooms'>Return to Rooms</Link><br />
      <Link to='/'>Return to Main Schedule</Link>

    </section>
  )
}

export default ClassDetails;