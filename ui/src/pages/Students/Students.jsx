// React Imports
import React, {useState, useEffect} from 'react';

// Our Components and Hooks
import useFetch from '../../hooks/useFetch';
import {registrarAuth} from '../../firebase/config';
import Loading from '../../components/Loading/Loading';

// Third Party Components and Hooks
import { RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableBody, RuxTableRow, RuxTableCell, RuxButton, RuxInput, RuxIcon } from '@astrouxds/react';
import {Link} from 'react-router-dom';

const Students = () => {
  const [filterRankString, setFilterRankString] = useState('');
  const [filterFirstString, setFilterFirstString] = useState('');
  const [filterLastString, setFilterLastString] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const { data: students, err, load } = useFetch('students');
  const auth = registrarAuth;

  useEffect(() => {
    setStudentList(students);
  }, [load])

  useEffect(() => {
    setFilteredStudents(
      studentList
        .filter(studentObj => studentObj.rank.toLowerCase().includes(filterRankString.toLowerCase()))
        .filter(studentObj => studentObj.first.toLowerCase().includes(filterFirstString.toLowerCase()))
        .filter(studentObj => studentObj.last.toLowerCase().includes(filterLastString.toLowerCase()))
    );
  }, [filterRankString,filterFirstString,filterLastString])
  
  const handleInputRank = (e) => {
    setFilterRankString(e.target.value);
  }
  const handleInputFirst = (e) => {
    setFilterFirstString(e.target.value);
  }
  const handleInputLast = (e) => {
    setFilterLastString(e.target.value);
  }

  if (load) return <Loading />
    
  return(
    <section>
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <RuxInput value={filterRankString} onRuxinput={handleInputRank} type="text" label="Filter Student Ranks" />
      <RuxInput value={filterFirstString} onRuxinput={handleInputFirst} type="text" label="Filter Student First Names" />
      <RuxInput value={filterLastString} onRuxinput={handleInputLast} type="text" label="Filter Student Last Names" />
    </div>
    <h3>Displaying {filteredStudents.length > 0 ? filteredStudents.length : studentList.length } Students</h3>
    <Link to='/'>Return to Main Schedule</Link>
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>Rank</RuxTableHeaderCell>
          <RuxTableHeaderCell>First</RuxTableHeaderCell>
          <RuxTableHeaderCell>Last</RuxTableHeaderCell>
          <RuxTableHeaderCell>Email (Click to Open Email)</RuxTableHeaderCell>
          <RuxTableHeaderCell>Phone (Cell)</RuxTableHeaderCell>
          {auth.currentUser && <RuxTableHeaderCell>Admin Options</RuxTableHeaderCell>}
        </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
        {
          (filteredStudents.length === 0) 
          ?
                    studentList.map( (stud,studidx) => {
                    return (
                      <RuxTableRow key={studidx}>
                        <RuxTableCell>
                          {stud.rank}
                        </RuxTableCell>
                        <RuxTableCell>
                          {stud.first}
                        </RuxTableCell>
                        <RuxTableCell>
                          {stud.last}
                        </RuxTableCell>
                        <RuxTableCell>
                          <a href={`mailto: ${stud.email}`}>{stud.email}</a>
                        </RuxTableCell>
                        <RuxTableCell>
                          {stud.phone_cell}
                        </RuxTableCell>
                        {
                          auth.currentUser && 
                          <RuxTableCell>
                            <RuxButton><RuxIcon icon="create" size="extra-small"></RuxIcon></RuxButton>
                          </RuxTableCell>
                        }
                      </RuxTableRow>
                    )})
          :
          filteredStudents.map( (stud,studidx) => {
                    return (
                      <RuxTableRow key={studidx}>
                        <RuxTableCell>
                          {stud.rank}
                        </RuxTableCell>
                        <RuxTableCell>
                          {stud.first}
                        </RuxTableCell>
                        <RuxTableCell>
                          {stud.last}
                        </RuxTableCell>
                        <RuxTableCell>
                          <a href={`mailto: ${stud.email}`}>{stud.email}</a>
                        </RuxTableCell>
                        <RuxTableCell>
                          {stud.phone_cell}
                        </RuxTableCell>
                        {
                          auth.currentUser && 
                          <RuxTableCell>
                            <Link to={'/admin/students'}>
                              <RuxButton><RuxIcon icon="create" size="extra-small"></RuxIcon></RuxButton>
                            </Link>
                          </RuxTableCell>
                        }
                      </RuxTableRow>
                    )})
        }
      </RuxTableBody>
    </RuxTable>
  </section>
  )
}

export default Students;