import React, {useState,useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router";
const FullPostPage = ({user = 1}) => {
    
   const [posts, setPosts] = useState([]);
   const [index, setIndex] = useState([0]);
   const navigate = useNavigate();
   var currenturl = window.location.href;
   var desiredvalue = currenturl.substring(currenturl.indexOf('posts'), currenturl.length);
   console.log(desiredvalue);
   useEffect(() => {
      
      fetch(`http://localhost:8081/api/${desiredvalue}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
      .then(json => {
        setPosts(json[0])
      })
      .catch(e => console.log(e))
    }, []);
    function bodyCheck(body){
      if(body?.length <= 100){
          return( <div>{body}</div>)
        }
        else{
          return( <div>{body?.substr(0,100) }...</div>)
        }
      }
    console.log(posts);
    
return (
    <>
    <h3>{posts?.title}'s Blog</h3>
    
    <div >
    <Link to="/">Home</Link>
    <Link to="/newpost">     NewPost</Link>
    <Link to="/updatepost">     NewPost</Link>
    <Link to="/blogs">      Blogs</Link>

   </div>
    
    
          
    <h5>Post ID:{posts.id}</h5>
    <h4 onClick={() => {navigate(`/posts/${posts.id}`)}}>{posts.title}</h4>
    <div>{posts.body}</div>
    <div><b>by {posts.username}</b></div>
    <span>{posts.created_at}</span>
            
       
        
    
    
</>
)
}

export default FullPostPage;