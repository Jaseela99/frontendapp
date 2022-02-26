//The App component is a container with React Router (BrowserRouter).
import React, { useState, useEffect } from "react"
import { Routes, Route , Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import AuthService from "./services/auth.service"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import Home from "./components/Home"
import BoardUser from "./components/BoardUser"

function App(){
  const [currentUser,setCurrentUser] = useState(undefined)
  useEffect(()=>{
    const user = AuthService.getCurrentUser()
    if (user){
      setCurrentUser(user)
    }
  },[])
  const logOut = ()=>{
    AuthService.logout()
  }
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Jaseela
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
        </div>
        {currentUser ?(
          <div className="nav-bar ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
           <li className="nav-item" >
             <a href="/login" className="nav-link" onClick={logOut}>
               LogOut
             </a>
           </li>
          </div>

        ):(
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className= "nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path ="/" element={<Home/>}/>
          <Route exact path ="/login" element={<Login/>}/>
          <Route exact path ="/register" element={<Register/>}/>
          <Route exact path ="/profile" element={<Profile/>}/>
          <Route path ="/user" element={<BoardUser/>}/>
        </Routes>
      </div>
    </div>
    
  )
}
export default App;
