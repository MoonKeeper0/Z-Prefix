// React Imports
import React, {useState, useEffect, useContext} from 'react';

// Our Components and Hooks
import useFetch from '../../hooks/useFetch';
import {AppContext} from '../../AppContext';
import {registrarAuth} from '../../firebase/config';

// Third Party Components and Hooks
import { RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableBody, RuxTableRow, RuxTableCell, RuxButton, RuxIcon } from '@astrouxds/react';
import {Link} from 'react-router-dom';

const Rooms = () => {

  const appContext = useContext(AppContext);
  const { data: rooms } = useFetch('rooms');
  const auth = registrarAuth;
  
  useEffect(() => {
    appContext.room = rooms;
  }, [rooms])

  if (appContext.room.length === 0) return <p>Loading...</p>

  return (
    <section>
      <Link to='/'>Return to Main Schedule</Link>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Building</RuxTableHeaderCell>
            <RuxTableHeaderCell>Room</RuxTableHeaderCell>
            <RuxTableHeaderCell>Capacity</RuxTableHeaderCell>
            <RuxTableHeaderCell>Phone (four digit ext.)</RuxTableHeaderCell>
            {auth.currentUser && <RuxTableHeaderCell>Admin Options</RuxTableHeaderCell>}
          </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
          {appContext.room.map( (rm,rmidx) => {
            return (
              <RuxTableRow key={rmidx}>
                <RuxTableCell>
                  <Link to={`/rooms/${rm.id}`}>{rm.bldg}</Link>
                </RuxTableCell>
                <RuxTableCell>
                  <Link to={`/rooms/${rm.id}`}>{rm.room}</Link>
                </RuxTableCell>
                <RuxTableCell>
                  <Link to={`/rooms/${rm.id}`}>{rm.capacity}</Link>
                </RuxTableCell>
                <RuxTableCell>
                  <Link to={`/rooms/${rm.id}`}>{rm.phone}</Link>
                </RuxTableCell>
                {
                  auth.currentUser && 
                  <RuxTableCell>
                    <Link to={'/admin/rooms'}>
                      <RuxButton><RuxIcon icon="create" size="extra-small"></RuxIcon></RuxButton>
                    </Link>
                  </RuxTableCell>
                }
              </RuxTableRow>
            )
          })}
        </RuxTableBody>
      </RuxTable>
    </section>
  )
}

export default Rooms;