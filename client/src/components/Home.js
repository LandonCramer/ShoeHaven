import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import ShopCard from "./SneakerCard";
import {Modal, Form, Button, InputGroup} from "react-bootstrap"
import {useForm} from 'react-hook-form'

const LoggedinHome = () => {
  const [sneakers, setSneakers] = useState([]);
  const [show, setShow] = useState(false)
  const {register,reset, handleSubmit, setValue, formState:{errors}}=useForm()
  const [sneakerId, setSneakerId]=useState(0)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sneakers")
      .then((res) => res.json())
      .then((data) => {
        setSneakers(data);
      })
      .catch((err) => console.log(err));
  }, []);

const getAllSneakers=()=>{
    fetch("http://127.0.0.1:5000/sneakers")
      .then((res) => res.json())
      .then((data) => {
        setSneakers(data);
      })
      .catch((err) => console.log(err))
}

  const closeModal=()=> {
    setShow(false)
  }
  const showModal=(id)=>{
    setShow(true)
    setSneakerId(id)
    
    // setting data in our update sneaker form
    sneakers.map(
        (sneaker)=>{
            if(sneaker.id === id){
                setValue('name',sneaker.name)
                setValue('color',sneaker.corlor)
                setValue('brand',sneaker.brand)
                setValue('price',sneaker.price)
                setValue('image',sneaker.image)
                setValue('link',sneaker.link)
                setValue('description',sneaker.description)
                
            }
        }
    )
  }

  const updateSneaker = (data) => {
    console.log(data)
    let token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    
    const requestOptions={
        method:'PUT',
        headers:{
            'content-type':'application/json',
            'Authorization':`Bearer ${JSON.parse(token)}`
        },
        body:JSON.stringify(data)
    }
    fetch(`http://127.0.0.1:5000/sneaker/${sneakerId}`, requestOptions)
    .then(res =>res.json())
    .then(data=>{
        console.log(data)
        const reload=window.location.reload()
        reload()
    })
    .catch(err=>console.log(err))
  }

  const deleteSneaker=(id)=>{
    console.log(id)
    let token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    const requestOptions={
        method:'DELETE',
        headers:{
            'content-type':'application/json',
            'Authorization':`Bearer ${JSON.parse(token)}`
        },
    }
   

    fetch(`http://127.0.0.1:5000/sneaker/${id}`, requestOptions)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        getAllSneakers()
    })
    .catch(err=>console.log(err))
  }

  const sneakerArr = [sneakers];
  console.log(sneakerArr);

  const storeFront = sneakers.map((shoe) => (
    <ShopCard
      key={shoe.id}
      id={shoe.id}
      brand={shoe.brand}
      name={shoe.name}
      color={shoe.color}
      description={shoe.description}
      price={shoe.price}
      image={shoe.image}
      link={shoe.link}
      onClick={showModal}

      onDelete={()=>{deleteSneaker(shoe.id)}}
    />
  ));

  return (
    <div className="sneakers">
        <Modal
            show={show}
            size="lg"
            onHide={closeModal}

        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Update Sneaker
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group className="form-group">
        <Form.Group>
          <Form.Label>Shoe Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex. Air Jordan 1 High"
            {...register("name", { required: true, maxLength: 25 })}
          />
        </Form.Group>
        {errors.name && (
          <p style={{ color: "red" }}>
            <small>Name is required</small>
          </p>
        )}
        {errors.name?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Name should be 25 characters</small>
          </p>
        )}
        <Form.Group>
          <Form.Label>Colorway</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color"
            {...register("color", { required: true, maxLength: 25 })}
          />
        </Form.Group>
        {errors.color && (
          <p style={{ color: "red" }}>
            <small>Color is required</small>
          </p>
        )}
        {errors.color?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Color should be 25 characters</small>
          </p>
        )}
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Brand"
            {...register("brand", { required: true, maxLength: 25 })}
          />
        </Form.Group>
        {errors.brand && (
          <p style={{ color: "red" }}>
            <small>Brand is required</small>
          </p>
        )}
        {errors.brand?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Brand should be 25 characters</small>
          </p>
        )}
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Price"
              {...register("price", { required: true, maxLength: 25 })}
            />
          </InputGroup>
        </Form.Group>
        {errors.price && (
          <p style={{ color: "red" }}>
            <small>Price is required</small>
          </p>
        )}
        {errors.price?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Price should be 25 characters</small>
          </p>
        )}
        <Form.Group>
          <Form.Label>Image Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image"
            {...register("image", { required: true, maxLength: 250 })}
          />
        </Form.Group>
        {errors.image && (
          <p style={{ color: "red" }}>
            <small>Image is required</small>
          </p>
        )}
        {errors.image?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Image should be less than 250 characters</small>
          </p>
        )}
        <Form.Group>
          <Form.Label>Link to Purchase</Form.Label>
          <Form.Control
            type="text"
            placeholder="link"
            {...register("link", { required: true, maxLength: 250 })}
          />
        </Form.Group>
        {errors.link && (
          <p style={{ color: "red" }}>
            <small>Link is required</small>
          </p>
        )}
        {errors.link?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Link should be less than 250 characters</small>
          </p>
        )}
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            {...register("description", { required: true, maxLength: 1000 })}
          />
        </Form.Group>
        {errors.description && (
          <p style={{ color: "red" }}>
            <small>Description is required</small>
          </p>
        )}
        {errors.description?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Description should be 1000 characters</small>
          </p>
        )}
        <br />
        <Button
          className="right-button"
          variant="primary"
          type="submit"
          onClick={handleSubmit(updateSneaker)}
        >
          Submit
        </Button>
        <br />
        <br />
      </Form.Group>
            </Modal.Body>
        </Modal>
      <h1>List of Sneakers: ShoeHaven Logged In</h1>
      {storeFront}
    </div>
  );
};

const LoggedOutHome = () => {
  return (
    <div className="heading">
      <h1>Welcome to the ShoeHaven</h1>
      <Link to="/signup" className="btn brn-primary btn-lg">
        Get Started
      </Link>
    </div>
  );
};

const HomePage = () => {
  const [logged] = useAuth();

  return <div>{logged ? <LoggedinHome /> : <LoggedOutHome />}</div>;
};

export default HomePage;
