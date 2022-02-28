import React,{useEffect,useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import UploadImage from './UploadImage'
import axios from "axios"
const user =JSON.parse(localStorage.getItem("user"))
const API_URL ="https://imgur-backend-jaseela.herokuapp.com/"

function UserImage() {

    const [images,setImages]=useState([])

  
    const handleDelete =(id) =>{
       axios.delete(API_URL+"image/"+id , {headers:{"x-access-token":user.accessToken}}).then(()=>{
       window.alert("image deleted!") 
       window.location.reload()
    })
    }
    const toggleLike =(id)=>{
      console.log(id)
      axios.get(API_URL+"image/"+id+"/like" , {headers:{"x-access-token":user.accessToken}}).then(()=>{
        window.location.reload()
    })
  }
    useEffect(()=>{
      
      axios.get(API_URL+"myimage" , {headers:{"x-access-token":user.accessToken}}).then(
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
                console.log(_content)
              }
        ) 
    },[])
  return (
    <div>
      <UploadImage/>
      <div className="row">
    {images &&
      images.map((cont, index) => (
        <div className="col-sm-6 col-md-3 mb-3">
          <img
            src={`${cont.category}/${cont.path}`}
            alt={cont.path}
            className="img-fluid w-100 h-100" 
          />
           <button onClick={()=>handleDelete(cont._id)}>Delete</button>
           <button onClick={()=>toggleLike(cont._id)}>Like {cont.likeCount}</button>
        </div>
      ))}
  </div>
 
    </div>
  )
}

export default UserImage