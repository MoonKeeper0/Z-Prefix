import React, {useEffect, useState} from 'react';

// Our Components
import Loading from '../../Loading/Loading';
import {AppContext} from '../../../AppContext';

// Styles
import styles from '../CRUD.module.css';
import {RuxButton, RuxInput, RuxSelect, RuxOption} from '@astrouxds/react';

const UpdateRoom = () => {

  const [roomsList, setRoomsList] = useState(['Select a Room']);
  const [fetchErr, setFetchErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patchID, setPatchID] = useState(0);
  const [patchItem, setPatchItem] = useState(0);
  const [patchValue, setPatchValue] = useState(0);
  const [patchRoom, setPatchRoom] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState('Disabled Until Room Selected');
  const baseURL = 'http://localhost:8081/api/';

  useEffect(() => {
      fetch(baseURL + 'rooms')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.send('Error fetching data');
        }
      })
      .then(json => json ? setRoomsList(['Select a Room', ...json]) : setRoomsList(['Select a Room']))
      .catch( error => {
        const errorCode = error.code;
        const errorMsg = error.message;
        setFetchErr(errorMsg);
        console.log(error);
      })
      .finally(() => setLoading(false));
    }, [loading]
  );

  
  useEffect(() => {
    if ((parseInt(patchID) === 0)|| (parseInt(patchItem) === 0) || (parseInt(patchValue) === 0)) {
      setDisabled(true);
      setPatchRoom({});
    } else {
      let targetRoom = roomsList.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
      setPatchRoom(targetRoom);
    }
  }, [patchID, patchItem, patchValue])

  useEffect(() => {
    if ((parseInt(patchID) === 0) || (parseInt(patchItem) === 0) || (parseInt(patchValue) === 0)) {
      setButtonText('Disabled Until Room Selected');
      setDisabled(true);
    } else {
      setDisabled(false);
      setButtonText(`Click to Update: Bldg ${patchRoom.bldg}, Room ${patchRoom.room}`);
    }
  }, [patchRoom])
  

  const updateRoom = () => {
    console.log()
    let obj = {};
    obj[patchItem] = patchValue;
    fetch(`http://localhost:8081/api/rooms/${patchID}`, {
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
          setRoomsList(response.json(obj));
          let targetRoom = roomsList.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
          
          setPatchValue(0);
        } else {
          throw new Error('Error in patch routine.');
        }
      })
      
      
  }

  if (fetchErr) return <p>Error fetching data.</p>;
  if (loading) return <Loading />;

  const valueUpdateInputBox = () => {
    if (patchItem === "bldg"){
      return <RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Building" required/>;
      }else if(patchItem === "room"){
        return<RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Room" required/>;
      }else if(patchItem === "capacity"){
        return<RuxInput type="number" min={1}  onRuxinput={(e) => setPatchValue(e.target.value)} label="Capacity" />;
    }else if(patchItem === "phone"){
      return<RuxInput type="tel"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Phone (4 digit extension)" />;
      }
    
  }
  return (
    <section>
        <h3>Update a Class Room</h3>
        <div className={styles.side}>
          <div>
            <RuxSelect value={patchID} label={'Select Room to Update'} onRuxchange={(e) => setPatchID(e.target.value)} >
              {roomsList.map( (item,idx) => {
                  if (idx === 0) return <RuxOption value={0} label={'Select a Room'} key={idx} />
                  else return <RuxOption value={item.id} label={`${item.bldg} ${item.room}`} key={idx} /> 
                })
              }
            </RuxSelect>

            <RuxSelect value={patchItem} label={'Select Room Item to Update'} onRuxchange={(e) => setPatchItem(e.target.value)} >
              {Object.keys(roomsList[1]).map( (item,idx) => {
                  if (idx === 0) return <RuxOption value={0} label={'Select an item'} key={idx} />
                  else return <RuxOption value={item} label={`${item}`} key={idx} /> 
                })
              }
            </RuxSelect>
            {valueUpdateInputBox()}
            
          </div>
          <div>
          <RuxButton disabled={disabled} icon="cancel" onClick={updateRoom}>{buttonText}</RuxButton>
          </div>
        </div>
      </section>
  )
}

export default UpdateRoom;
/*  */