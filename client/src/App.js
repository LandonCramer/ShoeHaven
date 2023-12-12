import "./App.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer"


const App=()=> {
  return (
    <div className="">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
