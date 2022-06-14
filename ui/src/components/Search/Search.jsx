import React from 'react';
import {RuxInput} from '@astrouxds/react/';
import {useSearch, useUpdateSearch} from '../context/mainSearchContext';
//import {RuxInput} from '@astrouxds/react';

const Search = (props) => {
  const search = useSearch();
  const updateSearch = useUpdateSearch();

  return (
      <span>
        <h3>Course Roster Multi-Filter</h3>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <RuxInput type="text" label="Students" value={search.student} onRuxinput={e => updateSearch({student: e.target.value})} />
          <RuxInput type="text" label="Faculty" value={search.faculty} onRuxinput={e => updateSearch({faculty: e.target.value})} />
          <RuxInput type="text" label="Class" value={search.dept} onRuxinput={e => updateSearch({dept: e.target.value})} />
          <RuxInput type="text" label="Room" value={search.room} onRuxinput={e => updateSearch({room: e.target.value})} />
          <RuxInput label="Date" type="date" autocomplete="" min="06-06-2022" value="2022-06-06" onRuxinput={e => updateSearch({date: e.target.value})} ></RuxInput>
        </div>
      </span>
  )
}

export default Search;