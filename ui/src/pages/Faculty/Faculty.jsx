// React Imports
import React, {useState, useEffect} from 'react';

// Our Components and Hooks
import useFetch from '../../hooks/useFetch';
import {registrarAuth} from '../../firebase/config';
import Loading from '../../components/Loading/Loading';

// Third Party Components and Hooks
import { RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableBody, RuxTableRow, RuxTableCell, RuxButton, RuxInput, RuxIcon } from '@astrouxds/react';
import {Link} from 'react-router-dom';

const Faculty = () => {
  const [filterRankString, setFilterRankString] = useState('');
  const [filterFirstString, setFilterFirstString] = useState('');
  const [filterLastString, setFilterLastString] = useState('');
  const [filterNicknameString, setFilterNicknameString] = useState('');
  const [facultyList, setFacultyList] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const auth = registrarAuth;

  const { data: faculty, err, load } = useFetch('faculty');

  useEffect(() => {
    setFacultyList(faculty);
  }, [load])

  useEffect(() => {
    setFilteredFaculty(
      facultyList
        .filter(facultyObj => facultyObj.rank.toLowerCase().includes(filterRankString.toLowerCase()))
        .filter(facultyObj => facultyObj.first.toLowerCase().includes(filterFirstString.toLowerCase()))
        .filter(facultyObj => facultyObj.last.toLowerCase().includes(filterLastString.toLowerCase()))
        .filter(facultyObj => facultyObj.nickname.toLowerCase().includes(filterNicknameString.toLowerCase()))
    );
  }, [filterRankString,filterFirstString,filterLastString,filterNicknameString])

  const handleInputRank = (e) => {
    setFilterRankString(e.target.value);
  }
  const handleInputFirst = (e) => {
    setFilterFirstString(e.target.value);
  }
  const handleInputLast = (e) => {
    setFilterLastString(e.target.value);
  }
  const handleInputNickname = (e) => {
    setFilterNicknameString(e.target.value);
  }

  if (load) return <Loading />
      
  return(
    <section>
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <RuxInput value={filterRankString} onRuxinput={handleInputRank} type="text" label="Filter Faculty Ranks" />
      <RuxInput value={filterFirstString} onRuxinput={handleInputFirst} type="text" label="Filter Faculty First Names" />
      <RuxInput value={filterLastString} onRuxinput={handleInputLast} type="text" label="Filter Faculty Last Names" />
      <RuxInput value={filterNicknameString} onRuxinput={handleInputNickname} type="text" label="Filter Faculty Nicknames" />
    </div>
    <h3>Displaying {filteredFaculty.length > 0 ? filteredFaculty.length : facultyList.length } Faculty</h3>
      <Link to='/'>Return to Main Schedule</Link>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Rank</RuxTableHeaderCell>
            <RuxTableHeaderCell>First</RuxTableHeaderCell>
            <RuxTableHeaderCell>Last</RuxTableHeaderCell>
            <RuxTableHeaderCell>Nickname</RuxTableHeaderCell>
            <RuxTableHeaderCell>Email</RuxTableHeaderCell>
            <RuxTableHeaderCell>Work Phone (four digit ext.)</RuxTableHeaderCell>
            <RuxTableHeaderCell>Cell Phone</RuxTableHeaderCell>
            {auth.currentUser && <RuxTableHeaderCell>Admin Options</RuxTableHeaderCell>}
          </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>

          {
            (filteredFaculty.length === 0) ?
              facultyList.map( (fm,fmidx) => {
              return (
                <RuxTableRow key={fmidx}>
                  <RuxTableCell>
                    {fm.rank}
                  </RuxTableCell>
                  <RuxTableCell>
                    {fm.first}
                  </RuxTableCell>
                  <RuxTableCell>
                    {fm.last}
                  </RuxTableCell>
                  <RuxTableCell>
                    {fm.nickname}
                  </RuxTableCell>
                  <RuxTableCell>
                    <a href={`mailto: ${fm.email}`}>{fm.email}</a>
                  </RuxTableCell>
                  <RuxTableCell>
                    {fm.phone_work}
                  </RuxTableCell>
                  <RuxTableCell>
                    {fm.phone_cell}
                  </RuxTableCell>
                  {
                    auth.currentUser && 
                    <RuxTableCell>
                      <Link to={'/admin/faculty'}>
                        <RuxButton><RuxIcon icon="create" size="extra-small"></RuxIcon></RuxButton>
                      </Link>
                    </RuxTableCell>
                  }
                </RuxTableRow>
              )
            })
            :
            filteredFaculty.map( (fm,fmidx) => {
            return (
              <RuxTableRow key={fmidx}>
                <RuxTableCell>
                  {fm.rank}
                </RuxTableCell>
                <RuxTableCell>
                  {fm.first}
                </RuxTableCell>
                <RuxTableCell>
                  {fm.last}
                </RuxTableCell>
                <RuxTableCell>
                  {fm.nickname}
                </RuxTableCell>
                <RuxTableCell>
                  <a href={`mailto: ${fm.email}`}>{fm.email}</a>
                </RuxTableCell>
                <RuxTableCell>
                  {fm.phone_work}
                </RuxTableCell>
                <RuxTableCell>
                  {fm.phone_cell}
                </RuxTableCell>
                {
                  auth.currentUser && 
                  <RuxTableCell>
                  <RuxButton><RuxIcon icon="create" size="extra-small"></RuxIcon></RuxButton>
                  </RuxTableCell>
                }
              </RuxTableRow>
            )
          })
          }
        </RuxTableBody>
      </RuxTable>
    </section>

    )
}

export default Faculty;