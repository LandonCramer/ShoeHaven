import React,{useContext} from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
const SignUpPage = () => {
  // const [username, setUsername] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
const {handleSetUser} = useContext(UserContext)
const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
} = useForm();

const submitForm = (data) => {
    if (data.password === data.confirmPassword) {

        const body={
            username:data.username,
            email:data.email,
            password:data.password
        }
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify(body),
    }

    fetch("/signup", requestOptions)
    .then(res=>{
      if (res.ok) {
        res.json()
        .then(resObj=>{
          localStorage.setItem("accessToken",resObj.access_token)
          localStorage.setItem("refreshToken,",resObj.refresh_token)
          // changed handleSet user from (db_user)
          // console.log(resObj.new_user)
          // handleSetUser("userId",resObj.new_user)

        })
      } else{
        res.json().then(errObj=>alert(errObj.message))
      }
    })
    // .then(res=>res.json())
    // .then(data=>console.log(data))
    // .catch(err=>console.log(err))
    reset();
}
    else {
        alert("Passwords do not match");
    }
  };


  return (
    <div className="container">
      <div className="form">
        <h1>Sign Up Page</h1>
        <form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your username"
              {...register("username", { required: true, maxLength: 25 })}
            />
            {errors.username && (
              <small style={{ color: "red" }}>Username is required</small>
            )}
            {errors.username?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Max characters should be 25 </small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email"
              {...register("email", { required: true, maxLength: 80 })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>
                <small>Email is required</small>
              </p>
            )}
            {errors.email?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Max characters should be 80</small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                <small>Password is required</small>
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                <small>Min characters should be 8</small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>
                <small>Confirm Password is required</small>
              </p>
            )}
            {errors.confirmPassword?.type === "minLength" && (
              <p style={{ color: "red" }}>
                <small>Min characters should be 8</small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(submitForm)}
            >
              {" "}
              SignUp
            </Button>
          </Form.Group>
          <Form.Group>
            <small>
              Already have an account, <Link to="/login">Login In</Link>
            </small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
