// React Imports
import React, {useState, useEffect, useContext} from 'react';

// Our Components and Hooks
import useFetch from '../../hooks/useFetch';
import {AppContext} from '../../AppContext';
import {registrarAuth} from '../../firebase/config';

// Third Party Components and Hooks
import { RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableBody, RuxTableRow, RuxTableCell, RuxButton, RuxIcon } from '@astrouxds/react';
import {Link} from 'react-router-dom';

const Classes = () => {
    const appContext = useContext(AppContext);
    const { data: classes } = useFetch('classes');
    const auth = registrarAuth;

    useEffect(() => {
        appContext.class = classes;
      }, [classes])
    
      if (appContext.class?.length == 0 ) return <p>Loading...</p>
      
    return(
      <section>
      <Link to='/'>Return to Main Schedule</Link>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Department</RuxTableHeaderCell>
            <RuxTableHeaderCell>Sequence</RuxTableHeaderCell>
            {auth.currentUser && <RuxTableHeaderCell>Admin Options</RuxTableHeaderCell>}
          </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
          {appContext.class.map( (cinfo,cinfoidx) => {
            return (
              <RuxTableRow key={cinfoidx}>
                <RuxTableCell>
                  <Link to={`/classes/${cinfo.id}`}>{cinfo.dept}</Link>
                </RuxTableCell>
                <RuxTableCell>
                  <Link to={`/classes/${cinfo.id}`}>{cinfo.number}</Link>
                </RuxTableCell>
                {
                  auth.currentUser && 
                  <RuxTableCell>
                    <Link to={'/admin/classes'}>
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

export default Classes;