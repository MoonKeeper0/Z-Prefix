import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../AppContext';
// Our Components
import Loading from '../Loading/Loading';

// Styles
import styles from './DeletePost.module.css';
import {RuxSelect, RuxOption, RuxButton} from '@astrouxds/react';
import { Link } from 'react-router-dom';
const DeletePost = ({user = 1}) =>{

  
    const context = useContext(AppContext);
    user = context.user;
  const [classList, setClassList] = useState(['Select a Posts']);
  const [fetchErr, setFetchErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteID, setDeleteID] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState('Disabled Until Class Selected')
  const [classToDelete, setClassToDelete] = useState({});
  const URL = `http://localhost:8081/api/users/posts/${user}`;

  useEffect(() => {
      fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          //throw new Error('Cannot convert response to json');
          return response.send('Error fetching data');
        }
      })
      .then(json => json ? setClassList(['Select a Delete', ...json]) : setClassList(['Select a Post']))
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
      setClassToDelete({});
    } else {
      let targetClass = classList.slice(1).filter( obj =>  obj.id === parseInt(deleteID))[0]
      setClassToDelete(targetClass);
    }
  }, [deleteID])

  useEffect(() => {
    console.log(deleteID);
    if (parseInt(deleteID) === 0) {
      setButtonText('Disabled Until a Post Selected');
      setDisabled(true);
    } else {
      setDisabled(false);
      setButtonText(`Click to Delete: ${classToDelete.id} ${classToDelete.title}`);
    }
  }, [classToDelete])

  const deleteClass = () => {
    fetch(`http://localhost:8081/api/posts/${deleteID}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setLoading(true);
          setClassList(response.json());
        } else {
          throw new Error('Error in delete routine.');
        }
      })
  }

  if (fetchErr) return <p>Error fetching data.</p>;
  if (loading) return <Loading />;

return(
    
    <section>
        <Link to="/">Home</Link>
    <Link to="/newpost">     NewPost</Link>
    <Link to="/updatepost">     UpdatePost</Link>
    <Link to="/myblogs"> myBlog</Link>
    <Link to="/blogs">      AllBlogs</Link>
    <h3>Delete a Posts</h3>
    <div className={styles.center}>
      <div>
            <RuxSelect value={deleteID} label={'Select Post to Delete'} onRuxchange={(e) => setDeleteID(e.target.value)} >
              {classList.map( (item,idx) => {
                  if (idx === 0) return <RuxOption value={0} label={'Select a Post'} key={idx} />
                  else return <RuxOption value={item.id} label={`${item.id} ${item.title}`} key={idx} /> 
                })
              }
            </RuxSelect>
      </div>
      <div className={styles['create-space']}>
        <RuxButton disabled={disabled} icon="cancel" onClick={deleteClass}>{buttonText}</RuxButton>
      </div>
    </div>
  </section>
)

    }
    export default DeletePost;