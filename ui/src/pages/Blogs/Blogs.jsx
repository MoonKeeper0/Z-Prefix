import React, {useState,useContext} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";

const Blogs = () => {
    const [posts, setPosts] = useState([{id: 1, title: 'Post 1', body: 'Capt made this 1', id_user: 1},
    {id: 2, title: 'Post 2', body: 'Capt made this 2', id_user: 1},
    {id: 3, title: 'Post 3', body: 'Bob made this', id_user: 2}]);
return (
    <>
    <Link to="/">Home</Link>
   
    {posts.map((x) => {
        return(
        <>
           
            <div>{x.title}</div>
            <div>{x.body}</div>
            <div>by {x.id_user}</div>
        </>)
        })
    }
    
</>
)
}

export default Blogs;