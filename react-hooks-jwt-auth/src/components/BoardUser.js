import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import axios from "axios";
const BoardUser = () => {
  const [content, setContent] = useState([]);

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.accessToken);
    let response = await axios.get(
      "https://imgur-backend-jaseela.herokuapp.com/image",
      { headers: { "x-access-token": user.accessToken } }
    );
    console.log(response.data.data);
    setContent(response.data.data);

    /* UserService.getUserBoard().then(
           (response)=>{
               setContent(response.data.data)
               console.log(response.data.data)
           },
           (error)=>{
               const _content =
               (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
                setContent(_content)
           }
       )
 */
  }, []);
  return (
    <div className="row">
      {content &&
        content.map((cont, index) => (
          <div className="col-sm-6 col-md-3 mb-3">
            <Link to={"/" + cont._id}>
              <img
                src={`${cont.category}/${cont.path}`}
                alt={cont.path}
                className="img-fluid w-100 h-75"
              />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BoardUser;
