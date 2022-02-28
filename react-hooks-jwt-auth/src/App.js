//The App component is a container with React Router (BrowserRouter).
import React, { useState, useEffect } from "react"
import { Routes, Route , Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import AuthService from "./services/auth.service"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import BoardUser from "./components/BoardUser"
import UserImage from "./components/UserImage"
import ImageById from "./components/ImageById"


function App(){
  const [currentUser,setCurrentUser] = useState(undefined)
  useEffect(()=>{
    const user = AuthService.getCurrentUser()
    if (user){
      setCurrentUser(user)
    }
  },[])
  const LogOut = ()=>{
    AuthService.logout()
  }
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark mx-auto">
        <Link to={"/"} className="navbar-brand mx-5">
          Imgur
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
         {currentUser &&(
           <li className="nav-item">
             <Link to={"/user"} className="nav-link">
               User
             </Link>
           </li>
         )} 
         {currentUser &&( 
         <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.data.fullName}
              </Link>
            </li>)}
        {currentUser ?(
    
           
           <li className="nav-item" >
             <a href="/login" className="nav-link" onClick={LogOut}>
               Logout
             </a>
           </li>
        

        ):(
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Sign In
              </Link>
            </li>
            <li className= "nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path ="/" element={<BoardUser/>}/>
          <Route exact path ="/:id" element={<ImageById/>}/>
          <Route exact path ="/login" element={<Login/>}/>
          <Route exact path ="/register" element={<Register/>}/>
          <Route exact path ="/profile" element={<Profile/>}/>
          <Route path ="/user" element={<UserImage/>}/>
          
        </Routes>
      </div>
    </div>
    
  )
}
export default App;
