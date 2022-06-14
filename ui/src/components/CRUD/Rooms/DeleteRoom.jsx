import React, {useState, useEffect} from 'react';

// Our Components
import Loading from '../../Loading/Loading';

// Styles
import styles from '../CRUD.module.css';
import {RuxSelect, RuxOption, RuxButton} from '@astrouxds/react';

const DeleteRoom = () => {

  const [roomsList, setRoomsList] = useState(['Select a Room']);
  const [fetchErr, setFetchErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteID, setDeleteID] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState('Disabled Until Room Selected')
  const [roomToDelete, setRoomToDelete] = useState({});
  const baseURL = 'http://localhost:8081/api/';

  useEffect(() => {
      fetch(baseURL + 'rooms')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          //throw new Error('Cannot convert response to json');
          return response.send('Error fetching data');
        }
      })
      .then(json => json ? setRoomsList(['Select a Room', ...json]) : setRoomsList(['Select a Room']))
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
      setRoomToDelete({});
    } else {
      let targetRoom = roomsList.slice(1).filter( obj =>  obj.id === parseInt(deleteID))[0]
      setRoomToDelete(targetRoom);
    }
  }, [deleteID])

  useEffect(() => {
    console.log(deleteID);
    if (parseInt(deleteID) === 0) {
      setButtonText('Disabled Until Room Selected');
      setDisabled(true);
    } else {
      setDisabled(false);
      setButtonText(`Click to Delete: Bldg ${roomToDelete.bldg}, Room ${roomToDelete.room}`);
    }
  }, [roomToDelete])

  const deleteRoom = () => {
    fetch(`http://localhost:8081/api/rooms/${deleteID}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setLoading(true);
          setRoomsList(response.json());
        } else {
          throw new Error('Error in delete routine.');
        }
      })
  }

  if (fetchErr) return <p>Error fetching data.</p>;
  if (loading) return <Loading />;
  
  return (
    <section>
        <h3>Delete a Class Room</h3>
        <div className={styles.center}>
          <div>
                <RuxSelect value={deleteID} label={'Select Room to Delete'} onRuxchange={(e) => setDeleteID(e.target.value)} >
                  {roomsList.map( (item,idx) => {
                      if (idx === 0) return <RuxOption value={0} label={'Select a Room'} key={idx} />
                      else return <RuxOption value={item.id} label={`${item.bldg} ${item.room}`} key={idx} /> 
                    })
                  }
                </RuxSelect>
          </div>
          <div className={styles['create-space']}>
            <RuxButton disabled={disabled} icon="cancel" onClick={deleteRoom}>{buttonText}</RuxButton>
          </div>
        </div>
      </section>
  )
}

export default DeleteRoom;