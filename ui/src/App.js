import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import Main from "./pages/Main/Main";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/Login/Login";
import Blogs from "./pages/Blogs/Blogs";
import { SearchProvider } from './components/context/mainSearchContext';
const App = () => {
  return (
    <Router>
      
          
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
       
    </Router>
  )
}

export default App;
