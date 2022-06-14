import React, {useEffect, useState} from 'react';

// Our Components
import Loading from '../../Loading/Loading';

// Styles
import styles from '../CRUD.module.css';
import {RuxButton, RuxInput, RuxSelect, RuxOption} from '@astrouxds/react';


const UpdateStudent = () =>{

    

    const [studentList, setStudentList] = useState(['Select a Student']);
    const [fetchErr, setFetchErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [patchID, setPatchID] = useState(0);
    const [patchItem, setPatchItem] = useState(0);
    const [patchValue, setPatchValue] = useState(0);
    const [patchStudent, setPatchStudent] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('Disabled Until Student Selected');
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
          console.log(error);
          //throw Error(`${errorCode}: ${errorMsg}`)
        })
        .finally(() => setLoading(false));
      }, [loading]
    );
  
    
    useEffect(() => {
      if ((parseInt(patchID) === 0)|| (parseInt(patchItem) === 0) || (parseInt(patchValue) === 0)) {
        setDisabled(true);
        setPatchStudent({});
      } else {
        let targetStudent = studentList.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
        setPatchStudent(targetStudent);
      }
    }, [patchID, patchItem, patchValue])
  
    useEffect(() => {
      console.log((parseInt(patchID) === 0) || (parseInt(patchItem) === 0) || (parseInt(patchValue) === 0));
      if ((parseInt(patchID) === 0) || (parseInt(patchItem) === 0) || (parseInt(patchValue) === 0)) {
        setButtonText('Disabled Until Student Selected');
        setDisabled(true);
      } else {
        setDisabled(false);
        setButtonText(`Click to Update: ${patchStudent.rank} ${patchStudent.first} ${patchStudent.last}`);
      }
    }, [patchStudent])
    
  
    const updateStudent = () => {
      console.log()
      let obj = {};
      obj[patchItem] = patchValue;
      console.log(obj);
      fetch(`http://localhost:8081/api/students/${patchID}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify(obj)
        
        })
        .then(response => {
          if (response.ok) {
            setLoading(true);
            setStudentList(response.json(obj));
            let targetStudent = studentList.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
            
            setPatchValue(0);
          } else {
            throw new Error('Error in patch routine.');
          }
        })
        
        
    }
  
    const rankList = ["E-1", "O-1", "E-2", "O-2","E-3", "O-3","E-4", "O-4","E-5", "O-5", "E-6", "O-6", "E-7", "O-7", "E-8", "O-8"]
  
    if (fetchErr) return <p>Error fetching data.</p>;
    if (loading) return <Loading />;
    //console.log(patchItem === "bldg");
    //console.log(Object.keys(studentList[1]));
    const valueUpdateInputBox = () => {
        if(patchItem === "rank"){
            return  <RuxSelect value={patchItem} label={'Select Student Item to Update'} onRuxchange={(e) => setPatchValue(e.target.value)} >
                {rankList.map( (item,idx) => {
                    if (idx === 0) return <RuxOption value={0} label={'Select a rank'} key={idx} />
                    else return <RuxOption value={item} label={`${item}`} key={idx} /> 
                  })
                }
            </RuxSelect>
        }
      else if (patchItem === "first"){
        return <RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="First Name" required/>;
        }else if(patchItem === "last"){
          return<RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Last Name" required/>;
        }else if(patchItem === "email"){
          return<RuxInput type="text" onRuxinput={(e) => setPatchValue(e.target.value)} label="Email" />;
      }else if(patchItem === "phone_cell"){
        return<RuxInput type="tel"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Cell Phone (4 digit extension)" />;
        }
    
    }
    return (
      <section>
          <h3>Update a Student</h3>
          <div className={styles.side}>
            <div>
              <RuxSelect value={patchID} label={'Select Student to Update'} onRuxchange={(e) => setPatchID(e.target.value)} >
                {studentList.map( (item,idx) => {
                    if (idx === 0) return <RuxOption value={0} label={'Select a Student'} key={idx} />
                    else return <RuxOption value={item.id} label={`${item.rank} ${item.first} ${item.last}`} key={idx} /> 
                  })
                }
              </RuxSelect>
  
              <RuxSelect value={patchItem} label={'Select Student Item to Update'} onRuxchange={(e) => setPatchItem(e.target.value)} >
                {Object.keys(studentList[1]).map( (item,idx) => {
                    if (idx === 0) return <RuxOption value={0} label={'Select an item'} key={idx} />
                    else return <RuxOption value={item} label={`${item}`} key={idx} /> 
                  })
                }
              </RuxSelect>
              {valueUpdateInputBox()}
              
            </div>
            <div>
            <RuxButton disabled={disabled} icon="cancel" onClick={updateStudent}>{buttonText}</RuxButton>
            </div>
          </div>
        </section>

    )
}

export default UpdateStudent;