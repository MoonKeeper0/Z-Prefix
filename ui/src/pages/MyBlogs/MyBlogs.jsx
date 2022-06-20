import React, {useState,useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";

const MyBlogs = ({user = 1}) => {
    
   const [posts, setPosts] = useState([]);
   const [index, setIndex] = useState([0]);
   useEffect(() => {
      
      fetch(`http://localhost:8081/api/users/posts/${user}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
      .then(json => {
        setPosts(json)
      })
      .catch(e => console.log(e))
    }, []);
    
    
    
return (
    <><div >
    <Link to="/">Home</Link>
    <Link to="/newpost">     NewPost</Link>
    <Link to="/updatepost">     NewPost</Link>
    <Link to="/blogs">      Blogs</Link>

   </div>
    
    {posts.map(( x) => {
        return(
        <>
           <div>{x.id}</div>
           <div>{x.title}</div>
            <div>{x.body}</div>
            <div>by {x.username}</div>
            <div>{x.created_at}</div>
            
        </>)
        })
    }
    
</>
)
}

export default MyBlogs;