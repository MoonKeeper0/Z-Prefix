import React, {useState, useEffect} from 'react';

// Our Components
import Loading from '../../Loading/Loading';

// Styles
import styles from '../CRUD.module.css';
import {RuxSelect, RuxOption, RuxButton} from '@astrouxds/react';

const DeleteStudent = () =>{

  
  const [studentList, setStudentList] = useState(['Select a Student']);
  const [fetchErr, setFetchErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteID, setDeleteID] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState('Disabled Until Student Selected')
  const [studentToDelete, setStudentToDelete] = useState({});
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
      .then(json => json ? setStudentList(['Select a Delete', ...json]) : setStudentList(['Select a Student']))
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
      setStudentToDelete({});
    } else {
      let targetStudent = studentList.slice(1).filter( obj =>  obj.id === parseInt(deleteID))[0]
      setStudentToDelete(targetStudent);
    }
  }, [deleteID])

  useEffect(() => {
    console.log(deleteID);
    if (parseInt(deleteID) === 0) {
      setButtonText('Disabled Until Student Selected');
      setDisabled(true);
    } else {
      setDisabled(false);
      setButtonText(`Click to Delete: ${studentToDelete.rank} ${studentToDelete.first} ${studentToDelete.last}`);
    }
  }, [studentToDelete])

  const deleteStudent = () => {
    fetch(`http://localhost:8081/api/students/${deleteID}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setLoading(true);
          setStudentList(response.json());
        } else {
          throw new Error('Error in delete routine.');
        }
      })
  }

  if (fetchErr) return <p>Error fetching data.</p>;
  if (loading) return <Loading />;

return(
    
    <section>
    <h3>Delete a Student</h3>
    <div className={styles.center}>
      <div>
            <RuxSelect value={deleteID} label={'Select Student to Delete'} onRuxchange={(e) => setDeleteID(e.target.value)} >
              {studentList.map( (item,idx) => {
                  if (idx === 0) return <RuxOption value={0} label={'Select a Student'} key={idx} />
                  else return <RuxOption value={item.id} label={`${item.rank} ${item.first} ${item.last}`} key={idx} /> 
                })
              }
            </RuxSelect>
      </div>
      <div className={styles['create-space']}>
        <RuxButton disabled={disabled} icon="cancel" onClick={deleteStudent}>{buttonText}</RuxButton>
      </div>
    </div>
  </section>
)

    }
    export default DeleteStudent;