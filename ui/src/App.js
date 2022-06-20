import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import Main from "./pages/Main/Main";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/Login/Login";
import Blogs from "./pages/Blogs/Blogs";
import { SearchProvider } from './components/context/mainSearchContext';
import NewUser from "./pages/NewUser/NewUser";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import NewPost from "./pages/NewPost/NewPost";

import UpdatePost from "./pages/UpdatePost/UpdatePost";
import FullPostPage from "./pages/FullPostPage/FullPostPage";
import DeletePost from "./pages/DeletePost/DeletePost";
const App = () => {
  return (
    <Router>
      
      <AppContext.Provider value={ { user: 0} }>
          <Routes>
          
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/newuser" element={<NewUser/>}/>
            <Route path="/MyBlogs" element={<MyBlogs/>}/>
            <Route path="/newpost" element={<NewPost/>}/>
            <Route path="/updatepost" element={<UpdatePost/>}/>
            <Route path="/posts/:id" element={<FullPostPage/>}/>
            <Route path="/deletepost" element={<DeletePost/>}/>
            <Route path="*" element={<PageNotFound />} />
            
          </Routes>
          </AppContext.Provider>
       
    </Router>
  )
}

export default App;
