import React, { useState, useEffect } from "react"; 
import { useSearch } from '../../components/context/mainSearchContext';

// Our Hooks and Components
import Weekday from "../../components/Weekday/Weekday";
import Search from "../../components/Search/Search";
import useFetch from "../../hooks/useFetch";
import {registrarAuth} from '../../firebase/config';

// Third Party Hooks and Components

// Styling
import mainStyles from './Main.module.css';

import { AppContext } from "../../AppContext";

// Our Components
import Loading from "../../components/Loading/Loading";

// Other Components
import {Link} from 'react-router-dom';

const Main = () => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const search = useSearch();
  const auth = registrarAuth;

  const { data: rosterData} = useFetch(`rosters/${search.date}`)
  const { data: scheduleData, load } = useFetch(`week/${search.date}`);
  const [classDays, setClassDays] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => { // Filter the data using searchContext and get rosters
    let tempScheduledData = [...scheduleData]
    let tempRosterData = [...rosterData]

    tempScheduledData.forEach( (currentSession) => {
      currentSession.studentlast = tempRosterData.filter( sc => sc.id === currentSession.id).map( studentObj => studentObj.last.toUpperCase())
      currentSession.roster = tempRosterData.filter( sc => sc.id === currentSession.id).map( studentObj => studentObj)
    })

    let tempfilteredData = tempScheduledData
      .filter(session => session.dept.toUpperCase().includes(search.dept.toUpperCase()))
      .filter(session => session.last.toUpperCase().includes(search.faculty.toUpperCase()))
      .filter(session => session.room.toUpperCase().includes(search.room.toUpperCase()))
      .filter(session => session.studentlast.find( stud => stud.includes(search.student.toUpperCase())))
      //tempfilteredData.map(session => session.roster = rosterData.filter(semester_class => semester_class.id === session.id)) // Add the rosters to each class
    console.log("postpass: ", tempfilteredData)
    setFilteredData(tempfilteredData)
  }, [search, scheduleData, rosterData])

  useEffect(() => { // Get a list of days for column headers
    const dates = [...filteredData.map(x => x.date)]; // get all the dates from the data
    const uniqueDates = [...new Set(dates)].sort((a,b) => new Date(a) - new Date(b)); // get unique dates sorted first to last
    let dateList = []; // create an empty array to hold the dates to be displayed
    uniqueDates.forEach(x => {
      dateList.push({
        date: x,
        title: `${dayNames[new Date(x).getDay()]}, ${new Date(x).toLocaleString('default', {month: 'short'})} ${new Date(x).getDate()}`
      })
    })
    setClassDays(dateList);
  }, [filteredData])

  

  if (load) return <Loading />

  return (
    <div className={mainStyles.container}>
      <div className={mainStyles.row}>
        <Search />
      </div>
      <h5>Quick View List</h5>
      <div className={mainStyles.bottomListLink}>
        <Link to="/faculty">Faculty List</Link>
        <Link to="/classes">Class List</Link>
        <Link to="/rooms">Room List</Link>
        <Link to="/students">Student List</Link>
      </div>
      <hr style={{width: "100%"}} />
      {
        auth.currentUser &&       
        <>
        <h5>Quick Tools if Admin</h5>
        <div className={mainStyles.bottomListLink}>
          <Link to="/admin/faculty">Modify Faculty</Link>
          <Link to="/admin/classes">Modify Class(es)</Link>
          <Link to="/admin/rooms">Modify Room(s)</Link>
          <Link to="/admin/students">Modify Student(s)</Link>
        </div>
        <hr style={{width: "100%"}} />
      </>
      }
      <div className={mainStyles.row}>
        {classDays.map( (day, midx) => <Weekday key={midx} title={day.title} data={filteredData.filter(x => x.date == day.date)}/>)}
      </div>
      <hr style={{width: "100%"}} />
      </div>
  )
}

export default Main;