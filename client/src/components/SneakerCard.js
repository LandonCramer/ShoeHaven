// We are getting all sneakers from homepg, and rendering them on the homepage
import React from "react";
// import { useState, useEffect } from 'react';
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ShopCard({
  image,
  name,
  color,
  link,
  description,
  price,
  id,
  brand,
  cartItem,
  setCartItem,
  onClick,
  onDelete,
}) {
  const currentUser = useContext(UserContext);
  

  let shopImage = image;
  let shopName = name;
  let shopColorway = color;
  let shopLink = link;
  let shopDescription = description;
  let shopPrice = price;
  let shopID = id;
  let shopBrand = brand;

  const newShoe = {
    id: shopID,
    colorway: shopColorway,
    name: shopName,
    description: shopDescription,
    price: shopPrice,
    link: shopLink,
    image: shopImage,
    brand: shopBrand,
  };

  const addShoesToCart = () => {
    // let isPresent = false
    // cart.forEach((product) =>{
    //     if(newShoe.id === product.id)
    //     isPresent = true
    // })
    // if(isPresent)
    //     return
    //     setCart((prevCart)=>[...prevCart, newShoe])

    // getting my data from sneakerCard of shoe that should ve added to cart.

    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    console.log(token);

    const addToCart = JSON.stringify({
      cartId: currentUser,
      sneakerid: newShoe.id,
      quantity: 1,
    });
    console.log("adding to cart", addToCart);

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(addToCart),
    };

    fetch("/cartSneaker", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // reset()
      })
      .catch((err) => console.log(err));
  };

  // setCartItem(newShoe)
  // console.log(cartItem[0].name.shopName)

  // function addShoesToCart(){
  //   // setCartItem("hi")
  //   setCartItem([...cartItem, newShoe])
  //   // setCartItem(newShoe)

  //   console.log(`${name} added`)

  //   alert(`${name} added`)
  //   console.log(cartItem)

  // }

  return (
    <Card variant="dark" style={{ width: "25rem" }}>
      <Card.Img variant="left" src={shopImage} alt={shopName} />
      <Card.Body>
        <Card.Title>{shopName}</Card.Title>
        <Card.Subtitle>{shopColorway}</Card.Subtitle>
        <Card.Text>{shopDescription}</Card.Text>
        <Button variant="dark" href={shopLink}>
          {"Purchase for $"}
          {shopPrice}
          {" from ShoeHaven"}
        </Button>
        <br />
        <br />
        <Button variant="dark" onClick={() => addShoesToCart(newShoe)}>
          {"Add to Cart"}{" "}
        </Button>
        <Link to="/cart">View Cart</Link>
        <br />
        <br />
        <Button variant="primary" onClick={() => onClick(id)}>
          Update
        </Button>{" "}
        <Button
          variant="primary"
          style={{ backgroundColor: "red" }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ShopCard;
