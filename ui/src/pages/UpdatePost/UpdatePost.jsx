import React, {useEffect, useState,useContext} from 'react';
import { AppContext } from '../../AppContext';
// Our Components
import Loading from '../Loading/Loading';

// Styles
import styles from './UpdatePost.module.css';
import {RuxButton, RuxInput, RuxSelect, RuxOption} from '@astrouxds/react';
import { Link } from 'react-router-dom';


const UpdatePost = ({user = 1}) =>{

    
  const context = useContext(AppContext);
  user = context.user;
    const [post, setPost] = useState(['Select a Post']);
    const [fetchErr, setFetchErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [patchID, setPatchID] = useState(0);
    const [patchItem, setPatchItem] = useState(0);
    const [patchValue, setPatchValue] = useState(0);
    const [patchClass, setPatchClass] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('Disabled Until Filled Out');
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
        .then(json => json ? setPost(['Select a Post', ...json]) : setPost(['Select a Post']))
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
        let targetClass = post.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
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
      fetch(`http://localhost:8081/api/posts/${patchID}`, {
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
            setPost(response.json(obj));
            let targetClass = post.slice(1).filter( obj =>  obj.id === parseInt(patchID))[0]
            
            setPatchValue(0);
          } else {
            throw new Error('Error in patch routine.');
          }
        })
        
        
    }
  
  
  
    if (fetchErr) return <p>Error fetching data.</p>;
    if (loading) return <Loading />;
    //console.log(patchItem === "bldg");
    //console.log(Object.keys(post[1]));
    const valueUpdateInputBox = () => {
        
       if (patchItem === "title"){
        return <RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Title" required/>;
        }else if(patchItem === "body"){
          return<RuxInput type="text"  onRuxinput={(e) => setPatchValue(e.target.value)} label="Body" required/>;
        }else if(patchItem === "username"){
            return<RuxInput type="text"   onRuxinput={(e) => setPatchValue(e.target.value)} label="Username" required/>;
          }
    }
    return (
      <section>
          <div >
            <Link to="/">Home</Link>
            <Link to="/newpost">     NewPost</Link>
            <Link to="/myblogs">     MyBlog</Link>
            <Link to="/blogs">      Blogs</Link>

        </div>
          <h3>Update Posts</h3>
          <div className={styles.side}>
            <div>
              <RuxSelect value={patchID} label={'Select Post'} onRuxchange={(e) => setPatchID(e.target.value)} >
                {post.map( (item,idx) => {
                    if (idx === 0) return <RuxOption value={0} label={'Select a Post'} key={idx} />
                    else return <RuxOption value={item.id} label={`${item.id} ${item.title}`} key={idx} /> 
                  })
                }
              </RuxSelect>
  
              <RuxSelect value={patchItem} label={'Select Post Category to Update'} onRuxchange={(e) => setPatchItem(e.target.value)} >
                {Object.keys(post[1])?.map( (item,idx) => {
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

export default UpdatePost;