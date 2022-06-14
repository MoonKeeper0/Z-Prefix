import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import Main from "./pages/Main/Main";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Rooms from "./pages/Rooms/Rooms";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import Header from "./components/Header/Header";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminRooms from "./pages/AdminRooms/AdminRooms";
import Faculty from "./pages/Faculty/Faculty";
import Students from "./pages/Students/Students";
import Classes from "./pages/Classes/Classes";
import ClassDetails from "./pages/ClassDetails/ClassDetails";
import AdminFaculty from "./pages/AdminFaculty/AdminFaculty";
import AdminClasses from "./pages/AdminClasses/AdminClasses";
import AdminStudents from "./pages/AdminStudents/AdminStudents";
import { SearchProvider } from './components/context/mainSearchContext';
const App = () => {
  return (
    <Router>
      <SearchProvider>
        <AppContext.Provider value={ {faculty: [], room: [], classtitle: [], class: [], student: [], user: {}} }>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/rooms" element={<AdminRooms />} />
            <Route path="/admin/faculty" element={<AdminFaculty />} />
            <Route path="/admin/classes" element={<AdminClasses />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/students" element={<Students />} /> 
            <Route path="/classes" element={<Classes />} /> 
            <Route path="/classes/:id" element={<ClassDetails/>}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AppContext.Provider>
      </SearchProvider>
    </Router>
  )
}

export default App;
