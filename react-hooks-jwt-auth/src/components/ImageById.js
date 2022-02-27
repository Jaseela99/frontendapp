import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import axios from "axios"
function ImageById() {
    const { id } = useParams();
  const [image, setImage] = useState({});
  useEffect(async()=>{

    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.accessToken);
    let response = await axios.get(
      "https://imgur-backend-jaseela.herokuapp.com/image/"+id,
      { headers: { "x-access-token": user.accessToken } }
    );
    console.log(response.data.data);
    setImage(response.data.data);
   
        /* UserService.getImageById(id).then(
          (response) => {
            setImage(response.data.data);
            console.log(response.data.data);
            
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setImage(_content);
          }
        ); */
        },[])

  return (
    <div> {image && 
        <img src={image.category+"/"+image.path} alt={image.path}
        className="img-fluid w-100 h-100"/>
        
        }</div>
  )
}

export default ImageById