import React,{useEffect,useState} from 'react'
import UserService from '../services/user.service'
import axios from "axios"

function UserImage() {
    const [images,setImages]=useState([])
    useEffect( async ()=>{
      let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.accessToken);
    let response = await axios.get(
      "https://imgur-backend-jaseela.herokuapp.com/myimage",
      { headers: { "x-access-token": user.accessToken } }
    );
    console.log(response.data.data);
    setImages(response.data.data);
        /* UserService.getUserImage().then(
            (response)=>{
                setImages(response.data.data)
                console.log(response.data.data);
            },
            (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setImages(_content);
              }
        ) */
    },[])
  return (
    <div className="row">
    {images &&
      images.map((cont, index) => (
        <div className="col-sm-6 col-md-3 mb-3">
          <img
            src={`${cont.category}/${cont.path}`}
            alt={cont.path}
            className="img-fluid w-100 h-75" 


          />
        </div>
      ))}
  </div>
  )
}

export default UserImage