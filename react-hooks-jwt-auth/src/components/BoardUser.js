import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import axios from "axios"
const user =JSON.parse(localStorage.getItem("user"))
const API_URL ="https://imgur-backend-jaseela.herokuapp.com/"

const BoardUser = () => {
  const {id} = useParams()
  const [content, setContent] = useState([]);

  const toggleLike =(id)=>{
    console.log(id)
    axios.get(API_URL+"image/"+id+"/like" , {headers:{"x-access-token":user.accessToken}}).then(()=>{
      window.location.reload()
  })
}

  useEffect(() => {
    axios.get(API_URL+"image/").then(
      (response) => {
        setContent(response.data.data);
        console.log(response.data.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }, [id]);
  return (
    <div className="row">
      {content &&
        content?.map((cont, index) => (
          <div className="col-sm-6 col-md-3 mb-3">
            {user ?
            <div><Link to={"/" + cont._id}>
            <img
              src={`${cont.category}/${cont.path}`}
              alt={cont.path}
              className="img-fluid w-100 h-75"
            />
          </Link>
          <button onClick={()=>toggleLike(cont._id)}>Like {cont.likeCount}</button></div>:<img
            src={`${cont.category}/${cont.path}`}
            alt={cont.path}
            className="img-fluid w-100 h-75"
          />}
            
          </div>
        ))}
    </div>
  );
};

export default BoardUser;
