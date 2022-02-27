import axios from "axios"
//import authHeader from "./auth-header"
const user =JSON.parse(localStorage.getItem("user"))
const API_URL ="https://testranjitha.herokuapp.com/"

const getPublicContent = ()=>{
    return axios.get(API_URL + "all")
}

const getUserBoard = ()=>{
    return axios.get(API_URL + "images", {headers:{"x-access-token":user.accessToken}})
}
const getUserImage = ()=>{
    return axios.get(API_URL + "myimages", {headers:{"x-access-token":user.accessToken}})
}
const getImageById = (id)=>{
    return axios.get(API_URL + "images/"+id, {headers:{"x-access-token":user.accessToken}})
}

export default {
    getPublicContent,
    getUserBoard,
    getUserImage,
    getImageById
}