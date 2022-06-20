import React, {useState,useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router";
const Blogs = () => {
    const [posts, setPosts] = useState([{id: 1, title: 'Post 1', body: 'Capt made this 1', id_user: 1},
    {id: 2, title: 'Post 2', body: 'Capt made this 2', id_user: 1},
    {id: 3, title: 'Post 3', body: 'Bob made this', id_user: 2}]);
   const [users, setUsers] = useState({id: 1, username: 'Capt', nickname: 'CaptCrunch' , password: '1', post: 1});
   const navigate = useNavigate();
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
    
    function bodyCheck(body){
      if(body?.length <= 100){
          return( <div>{body}</div>)
        }
        else{
          return( <div>{body?.substr(0,100) }...</div>)
        }
      }
    
return (
    <>
    <h3>Blog Page</h3>
    <Link to="/">Home</Link>
  
    {posts.map((x) => {
        return(
          <>
        <section onClick={() => {navigate(`/posts/${x.id}`)}}>
           
          <h5>Post ID:{x.id}</h5>
           <h4 onClick={() => {navigate(`/posts/${x.id}`)}}>{x.title}</h4>
           {bodyCheck(x.body)        }
            <div><b>by {x.username}</b></div>
            <span>{x.created_at}</span>
        </section>
        </>
        )
        })
    }
    
</>
)
}

export default Blogs;