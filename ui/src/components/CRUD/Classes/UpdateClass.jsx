import React, {useEffect, useState} from 'react';

// Our Components
import Loading from '../../Loading/Loading';

// Styles
import styles from '../CRUD.module.css';
import {RuxButton, RuxInput, RuxSelect, RuxOption} from '@astrouxds/react';


const UpdateClass = () =>{

    

    const [classList, setClassList] = useState(['Select a Class']);
    const [fetchErr, setFetchErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [patchID, setPatchID] = useState(0);
    const [patchItem, setPatchItem] = useState(0);
    const [patchValue, setPatchValue] = useState(0);
    const [patchClass, setPatchClass] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('Disabled Until Class Selected');
    const baseURL = 'http://localhost:8081/api/';

    useEffect(() => {
        fetch(baseURL + 'classes')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            //throw new Error('Cannot convert response to json');
            return response.send('Error fetching data');
          }
        })
        .then(json => json ? setClassList(['Select a Class', ...json]) : setClassList(['Select a Class']))
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
        setPatchClass({});
      } else {
        let targetClass = classList.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
        setPatchClass(targetClass);
      }
    }, [patchID, patchItem, patchValue])
  
    useEffect(() => {
      console.log((parseInt(patchID) === 0) || (parseInt(patchItem) === 0) || (parseInt(patchValue) === 0));
      if ((parseInt(patchID) === 0) || (parseInt(patchItem) === 0) || (parseInt(patchValue) === 0)) {
        setButtonText('Disabled Until Class Selected');
        setDisabled(true);
      } else {
        setDisabled(false);
        setButtonText(`Click to Update: ${patchClass.dept} ${patchClass.number}`);
      }
    }, [patchClass])
    
  
    const updateClass = () => {
      console.log()
      let obj = {};
      obj[patchItem] = patchValue;
      console.log(obj);
      fetch(`http://localhost:8081/api/classes/${patchID}`, {
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
            setClassList(response.json(obj));
            let targetClass = classList.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
            
            setPatchValue(0);
          } else {
            throw new Error('Error in patch routine.');
          }
        })
        
        
    }
  
  
  
    if (fetchErr) return <p>Error fetching data.</p>;
    if (loading) return <Loading />;
    //console.log(patchItem === "bldg");
    //console.log(Object.keys(classList[1]));
    const valueUpdateInputBox = () => {
       if (patchItem === "dept"){
        return <RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Department" required/>;
        }else if(patchItem === "number"){
          return<RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Class Number" required/>;
        }
    }
    return (
      <section>
          <h3>Update a Class</h3>
          <div className={styles.side}>
            <div>
              <RuxSelect value={patchID} label={'Select Class to Update'} onRuxchange={(e) => setPatchID(e.target.value)} >
                {classList.map( (item,idx) => {
                    if (idx === 0) return <RuxOption value={0} label={'Select a Class'} key={idx} />
                    else return <RuxOption value={item.id} label={`${item.dept} ${item.number}`} key={idx} /> 
                  })
                }
              </RuxSelect>
  
              <RuxSelect value={patchItem} label={'Select Class Item to Update'} onRuxchange={(e) => setPatchItem(e.target.value)} >
                {Object.keys(classList[1]).map( (item,idx) => {
                    if (idx === 0) return <RuxOption value={0} label={'Select an item'} key={idx} />
                    else return <RuxOption value={item} label={`${item}`} key={idx} /> 
                  })
                }
              </RuxSelect>
              {valueUpdateInputBox()}
              
            </div>
            <div>
            <RuxButton disabled={disabled} icon="cancel" onClick={updateClass}>{buttonText}</RuxButton>
            </div>
          </div>
        </section>

    )
}

export default UpdateClass;