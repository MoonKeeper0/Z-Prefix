import React, {useState,useEffect,useContext} from "react";
import styles from './Header.module.css';
import {useNavigate, useLocation} from 'react-router-dom';
import { AppContext } from "../../AppContext";
import {registrarAuth} from '../../firebase/config';
import {RuxGlobalStatusBar, RuxButton, RuxSelect, RuxOption, RuxInput} from '@astrouxds/react'
import Loading from "../Loading/Loading";

function download(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

const RegistrarModal = ({onClose}) => {

  const [studentList, setStudentList] = useState(['Select a Student']);
  const [fetchErr, setFetchErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [printId, setPrintId] = useState(0);
  const [printDate, setPrintDate] = useState("2022-06-06");
  const [disabled, setDisabled] = useState(true);
  const [studentToPrint, setStudentToPrint] = useState({});
  const baseURL = 'http://localhost:8081/api/';

  useEffect(() => {
      fetch(baseURL + 'students')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          //throw new Error('Cannot convert response to json');
          return response.send('Error fetching data');
        }
      })
      .then(json => json ? setStudentList(['Select a Student', ...json]) : setStudentList(['Select a Student']))
      .catch( error => {
        const errorCode = error.code;
        const errorMsg = error.message;
        setFetchErr(errorMsg);
        // throw Error(`${errorCode}: ${errorMsg}`)
      })
      .finally(() => setLoading(false));
    }, [loading]
  );

  useEffect(() => {
    if (parseInt(printId) === 0) {
      setDisabled(true);
      setStudentToPrint({});
    } else {
      let targetStudent = studentList.slice(1).filter( obj =>  obj.id === parseInt(printId))[0]
      setStudentToPrint(targetStudent);
    }
  }, [printId])

  useEffect(() => {
    console.log(printId);
    if (parseInt(printId) === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [studentToPrint])

  const printSchedule = (e) => { 
    console.log('Print!');
    const baseUrl = 'http://localhost:8081/';
    //const urlRoute = 'util/print';
    console.log(printDate);
    const reformatDateForKnex = printDate.slice(5)+"-"+printDate.slice(0,4)
    console.log(reformatDateForKnex);
    const urlRoute = `api/schedule/?id=${printId}&date=${reformatDateForKnex}`;
    console.log(urlRoute);
    fetch(baseUrl + urlRoute, {
      'Content-Type': 'application/pdf'
    })
      .then (response => response.blob())
      .then( blob => download(blob, 'registrar-schedule.pdf'))
      .catch( (err) => {
        console.error('Error:',err);
    });
    onClose();
  }

  if (loading) return <Loading />

  return (
    <div className={styles.modal}>
      <h3>Select a Student and Start Date</h3>
      <RuxSelect value={printId} label={'Select Room to Delete'} onRuxchange={(e) => setPrintId(e.target.value)}>
      {studentList.map( (stud,idx) => {
                      if (idx === 0) return <RuxOption value={0} label={'Select a Student'} key={idx} />
                      else return <RuxOption value={stud.id} label={`${stud.rank} ${stud.first} ${stud.last}`} key={idx} /> 
                    })
        }
      </RuxSelect>
      <RuxInput label="Date" type="date" autocomplete="" min="2022-06-06" value={printDate} onRuxchange={( (e) => setPrintDate(e.target.value))} />
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <RuxButton onClick={onClose}>Cancel</RuxButton>
        {
          disabled ?
          <RuxButton disabled onClick={onClose}>Print</RuxButton> :
          <RuxButton onClick={printSchedule}>Print</RuxButton>
        }
      </div>
    </div>
  )
}

const Header = () => {
  const [appState, setAppState] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = registrarAuth;

  useEffect(() => {
    const pathname = location.pathname.split('/');
    setAppState(pathname[pathname.length-1].toUpperCase());
  },[location])

  const handleLogin = (e) => {
    navigate('/admin/login');
  }

  const handleLogout = (e) => {
    auth.signOut(appContext.user)
      .then( () => {
        appContext.user = {};
        navigate('/admin/login');
      })
      .catch( err => {
        console.log(err);
      })
  }

  const openModal = (e) => {
    setIsOpen(true);
  }

  const closeModal = (e) => {
    setIsOpen(false);
  }
  
  return (
    <nav className={styles.nav}>
    
      {isOpen && <RegistrarModal onClose={closeModal} />}
      <RuxGlobalStatusBar app-domain="Registrar Visualization System" app-state={appState}>
      <RuxButton style={{margin: "0px 10px"}}slot="right-side" onClick={openModal}>Print Schedule</RuxButton>

      {
        auth.currentUser ?
        <RuxButton slot="right-side" onClick={handleLogout}>Logout</RuxButton> :
        <RuxButton slot="right-side" onClick={handleLogin}>Admin Login</RuxButton>
      }
      </RuxGlobalStatusBar>
    </nav>
  )
}

export default Header;