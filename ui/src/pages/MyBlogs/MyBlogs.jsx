import React, {useState,useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router";
const MyBlogs = ({user = 1}) => {
  const context = useContext(AppContext);
  user = context.user;
   const [posts, setPosts] = useState([]);
   const [index, setIndex] = useState([0]);
   const navigate = useNavigate();
   useEffect(() => {
      if(user > 0){
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
    }
    else{
      navigate('/blogs')
    }
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
    <h3>{posts[0]?.username}'s Blog</h3>
    
    <div >
    <Link to="/">Home</Link>
    <Link to="/newpost">     NewPost</Link>
    <Link to="/updatepost">     UpdatePost</Link>
    <Link to="/deletepost"> DeletePost</Link>
    <Link to="/blogs">      AllBlogs</Link>

   </div>
    
    {posts.map(( x) => {
        return(
        <>
          
          <section onClick={() => {navigate(`/posts/${x.id}`)}}>
           
           <h5>Post ID:{x.id}</h5>
            <h4 onClick={() => {navigate(`/posts/${x.id}`)}}>{x.title}</h4>
            {bodyCheck(x.body)        }
             <div><b>by {x.username}</b></div>
             <span>{x.created_at}</span>
         </section>
            
        </>)
        })
    }
    
</>
)
}

export default MyBlogs;