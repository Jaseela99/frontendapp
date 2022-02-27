import React,{ useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form,Button} from "react-bootstrap"
import axios from "axios"
//import userService from "../services/user.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

function UploadImage() {
    const form = useRef()
    const [category,setCategory] = useState("")
    const [path,setPath] = useState("")
  const [isOpen, setIsOpen] = React.useState(false);
  
  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };
  const onChangePath = (e) => {
    const path = e.target.value;
    setPath(path);
  };
  
  

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) =>{
      e.preventDefault()
      console.log(category,path)
      let user =JSON.parse(localStorage.getItem("user"))
      const response = await axios.post("https://imgur-backend-jaseela.herokuapp.com/image/",{category,path},{headers:{"x-access-token":user.accessToken}})
    console.log(response)
    }

  return (
    <div>
      <button onClick={showModal}>Display Modal</button>
      <Modal show={isOpen}>
        <Modal.Body>
          <Form onSubmit={handleSubmit} ref={form}>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>

              <Form.Control type="text" 
              name="category"
               value={category} 
               onChange={onChangeCategory}
               validations={[required]}
               placeholder="Enter category name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPath">
              <Form.Label>Path</Form.Label>
              <Form.Control type="text"
              name="path"
              value={path} 
              onChange={onChangePath}
              validations={[required]} 
              placeholder="Enter Path" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
          <button>Save</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadImage;
