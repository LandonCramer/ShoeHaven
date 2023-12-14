import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import ShopCard from "./SneakerCard";

const LoggedinHome = () => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sneakers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSneakers(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    />
  ));

  return (
    <div className="sneakers">
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
