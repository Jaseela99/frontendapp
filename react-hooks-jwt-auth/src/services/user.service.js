/* import axios from "axios"
import authHeader from "./auth-header"
const user =JSON.parse(localStorage.getItem("user"))
const API_URL ="http://localhost:8000/"

const getPublicContent = ()=>{
    return axios.get(API_URL + "all")
}

const getUserBoard = ()=>{
    return axios.get(API_URL + "image", {headers:authHeader()})
}
const getUserImage = ()=>{
    return axios.get(API_URL + "myimage", {headers:authHeader()})
}
const getImageById = (id)=>{
    return axios.get(API_URL + "image/"+id, {headers:authHeader()})
}
const uploadImage=(category,path)=>{
    return axios.post(API_URL + "image",{category,path}, {headers:authHeader()})  
}
const deleteImage=(id)=>{
    return axios.delete(API_URL + "image/"+id, {headers:authHeader()})  
}
export default {
    uploadImage,
    getPublicContent,
    getUserBoard,
    getUserImage,
    getImageById,
    deleteImage
} */