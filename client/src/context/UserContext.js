import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // check for currentUser
    fetch("/currentuser", {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then((res) => {
        if (res.ok) {
        res.json()
      .then((user) => {
        setCurrentUser(user);
      });
    }})
  }, []);

  const handleSetUser = (userObj) => {
    setCurrentUser(userObj);
  };
  console.log("currentUser check1", currentUser)

  return (
    <UserContext.Provider value={{ currentUser, handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
