import React, {useState,useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {login} from '../auth'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext'

const LoginPage = () => {
    const [user, setUser]=useState({})
    const {handleSetUser} = useContext(UserContext)
    const {register, handleSubmit, reset, formState:{errors}}=useForm()
    
    // this will help us go to another page
    const navigate = useNavigate()

    const loginUser=(data)=> {
        console.log("data from login", data)
        
        const requestOptions={
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
        fetch('/login', requestOptions)
        .then(res=>{
            console.log(res)
        if (res.ok) {
            res.json()
            .then(resObj=>{
              localStorage.setItem("accessToken",resObj.access_token)
              localStorage.setItem("refreshToken",resObj.refresh_token)
              login(resObj.access_token)
              // handleSetUser(resObj.db_user)
              navigate('/')
            })
          } else{
            res.json().then(errObj=>alert(errObj.message))
          }
        })
        
        
    }

    return (
        <div className="container">
          <div className="form">
            <h1>Login Page</h1>
            <form>
                
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Your username" 
                    {...register('username', {required:true,maxLength:25})}
                    />
                
                </Form.Group>
                {errors.username && <p style={{color:'red'}}><small>Username is required</small></p> }
                {errors.username?.type === "maxLength" && <p style={{color:'red'}}><small>Username should be 25 characters</small></p>}
                <br></br>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Your password"
                    {...register('password', {required:true,minLength:8})}
                    />
                </Form.Group>
                {errors.password && <p style={{color:'red'}}><small>Password should be more than 8 characters</small></p> }
                {errors.password?.type === "maxLength" && <p style={{color:'red'}}><small>Username should be 25 characters</small></p>}
                <br></br>
                <Form.Group>
                    <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>Login</Button>
                </Form.Group>
                <Form.Group>
                    <small>Do not have an account? <Link to='/signup'>Create one</Link></small>
                    </Form.Group>
            </form>
          </div>
        </div>
      );
    };

export default LoginPage