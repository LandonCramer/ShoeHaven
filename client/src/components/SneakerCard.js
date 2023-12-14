// We are getting all sneakers from homepg, and rendering them on the homepage
import React from 'react';
// import { useState, useEffect } from 'react';
import { Card, Button} from 'react-bootstrap'

function ShopCard({image, name, color, link, description, price, id, brand, cartItem, setCartItem}) {
  
    let shopImage = image
    let shopName = name
    let shopColorway = color
    let shopLink = link
    let shopDescription = description
    let shopPrice = price
    let shopID = id
    let shopBrand = brand
    
    const newShoe = {
      // key: {shopID},
      id: shopID,
      colorway: shopColorway,
      name: shopName,
      description: shopDescription,
      price: shopPrice,
      link: shopLink,
      image: shopImage,
      brand: shopBrand,
    }
    
    // setCartItem(newShoe)
    // console.log(cartItem[0].name.shopName)
    
    function addShoesToCart(){
      // setCartItem("hi")
      setCartItem([...cartItem, newShoe])
      // setCartItem(newShoe)

      console.log(`${name} added`)
      
      alert(`${name} added`)
      console.log(cartItem)
  
    }

  return (
    
      <Card variant="dark" style={{ width: '25rem' }}>
        <Card.Img variant="left" src={shopImage} alt={shopName} />
        <Card.Body>
          <Card.Title>{shopName}</Card.Title>
          <Card.Subtitle>{shopColorway}</Card.Subtitle>
          <Card.Text>
            {shopDescription}
          </Card.Text>
          <Button variant="dark" href={shopLink}>
             {"Purchase for $"}{shopPrice}{" from ShoeHaven"}
             </Button><br/><br/>
          <Button variant="dark" onClick={addShoesToCart}>
             {"Add to Cart"} </Button>
            <br/>
            <br/>
        </Card.Body>
      </Card>    
  
  )
}

export default ShopCard;