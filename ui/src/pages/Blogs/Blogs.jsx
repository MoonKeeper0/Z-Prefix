import React, {useState,useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";

const Blogs = () => {
    const [posts, setPosts] = useState([{id: 1, title: 'Post 1', body: 'Capt made this 1', id_user: 1},
    {id: 2, title: 'Post 2', body: 'Capt made this 2', id_user: 1},
    {id: 3, title: 'Post 3', body: 'Bob made this', id_user: 2}]);
   const [users, setUsers] = useState([{id: 1, username: 'Capt', nickname: 'CaptCrunch' , password: '1', post: 1},
   {id: 2, username: 'Bob', nickname: 'bob1', password: '2', post: 3}]);
   useEffect(() => {
      fetch("http://localhost:8081/api/posts")
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
      fetch("http://localhost:8081/api/users")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
      .then(json => {
        setUsers(json)
      })
      .catch(e => console.log(e))
    }, []);
    
    
    
return (
    <>
    <Link to="/">Home</Link>
  
    {posts.map((x) => {
        return(
        <>
           
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

export default Blogs;