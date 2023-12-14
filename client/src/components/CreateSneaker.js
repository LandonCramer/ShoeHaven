import React,{useState} from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CreateSneakerPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
const [show, setShow]=useState(false);

  const createSneaker = (data) => {
    console.log(data);
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    console.log(token)

    const requestOptions = {
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
      },
      body:JSON.stringify(data)
    }
    fetch('http://127.0.0.1:5000/sneakers', requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            reset()
        })
        .catch(err => console.log(err))
  }


  return (
    <div className="container">
      <h1>Create Sneaker Page</h1>
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
            {...register("description", { required: true, maxLength: 250 })}
          />
        </Form.Group>
        {errors.description && (
          <p style={{ color: "red" }}>
            <small>Description is required</small>
          </p>
        )}
        {errors.description?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Description should be 250 characters</small>
          </p>
        )}
        <br />
        <Button
          className="right-button"
          variant="primary"
          type="submit"
          onClick={handleSubmit(createSneaker)}
        >
          Submit
        </Button>
        <br />
        <br />
      </Form.Group>
    </div>
  );
};

export default CreateSneakerPage;
