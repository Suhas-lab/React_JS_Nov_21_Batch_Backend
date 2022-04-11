import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {postRequest} from "../api/api";
import { REGISTER_USER } from "../api/baseUrl";

function RegisterUser(){

    const history = useNavigate(); 

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [servererror, setServerError] = useState("");

    const userDataSubmit = async(event) =>{
        event.preventDefault();
        console.log("handleValidation() value", handleValidation());
        
        if(!handleValidation()){
            return false
        }
        console.log("Both username and password", userName, password);

        const registerUser = {
            username_email: userName,
            password: password
        }

        await postRequest(REGISTER_USER, registerUser).then(res =>{
            console.log("APi response received", res.data);
            setUserName("");
            setPassword("");
            history.push("/userList");
        }).catch(err => {
            console.log("Error in api", err)
        })
    }
    const handleValidation = (event) => {
        let formIsValid = true;
        if (!userName.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          formIsValid = false;
          setemailError("Email should not keep blank");
          return false;
        } else {
          setemailError("");
          formIsValid = true;
        }
        // debugger;
        if (!password.match(/^[a-zA-Z]+$/)) {
          formIsValid = false;
          setpasswordError(
            "Password should be minimum eight characters, at least one letter and one number"
          );
          return false;
        } else {
          setpasswordError("");
          formIsValid = true;
        }
    
        return formIsValid;
    };

    return(
        <>
            <h1>Register yourself</h1>
            <form id="loginform" onSubmit={userDataSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <div className="clearfix"></div>
              <small id="servererror" className="text-danger form-text">
                  {servererror}
              </small> 
            </form>
        </>
    )
}

export default RegisterUser