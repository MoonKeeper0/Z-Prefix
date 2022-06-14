import React, {useState, useEffect} from 'react';

// Our Components
import Loading from '../../Loading/Loading';

// Styles
import styles from '../CRUD.module.css';
import {RuxSelect, RuxOption, RuxButton} from '@astrouxds/react';

const DeleteFaculty = () =>{

  
  const [facultyList, setFacultyList] = useState(['Select a Faculty']);
  const [fetchErr, setFetchErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteID, setDeleteID] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState('Disabled Until Faculty Selected')
  const [facultyToDelete, setFacultyToDelete] = useState({});
  const baseURL = 'http://localhost:8081/api/';

  useEffect(() => {
      fetch(baseURL + 'faculty')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          //throw new Error('Cannot convert response to json');
          return response.send('Error fetching data');
        }
      })
      .then(json => json ? setFacultyList(['Select a Delete', ...json]) : setFacultyList(['Select a Faculty']))
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
    if (parseInt(deleteID) === 0) {
      setDisabled(true);
      setFacultyToDelete({});
    } else {
      let targetFaculty = facultyList.slice(1).filter( obj =>  obj.id === parseInt(deleteID))[0]
      setFacultyToDelete(targetFaculty);
    }
  }, [deleteID])

  useEffect(() => {
    console.log(deleteID);
    if (parseInt(deleteID) === 0) {
      setButtonText('Disabled Until Faculty Selected');
      setDisabled(true);
    } else {
      setDisabled(false);
      setButtonText(`Click to Delete: ${facultyToDelete.rank} ${facultyToDelete.first} ${facultyToDelete.last}`);
    }
  }, [facultyToDelete])

  const deleteFaculty = () => {
    fetch(`http://localhost:8081/api/faculty/${deleteID}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setLoading(true);
          setFacultyList(response.json());
        } else {
          throw new Error('Error in delete routine.');
        }
      })
  }

  if (fetchErr) return <p>Error fetching data.</p>;
  if (loading) return <Loading />;

return(
    
    <section>
    <h3>Delete a Class Faculty</h3>
    <div className={styles.center}>
      <div>
            <RuxSelect value={deleteID} label={'Select Faculty to Delete'} onRuxchange={(e) => setDeleteID(e.target.value)} >
              {facultyList.map( (item,idx) => {
                  if (idx === 0) return <RuxOption value={0} label={'Select a Faculty'} key={idx} />
                  else return <RuxOption value={item.id} label={`${item.rank} ${item.first} ${item.last}}`} key={idx} /> 
                })
              }
            </RuxSelect>
      </div>
      <div className={styles['create-space']}>
        <RuxButton disabled={disabled} icon="cancel" onClick={deleteFaculty}>{buttonText}</RuxButton>
      </div>
    </div>
  </section>
)

    }
    export default DeleteFaculty;