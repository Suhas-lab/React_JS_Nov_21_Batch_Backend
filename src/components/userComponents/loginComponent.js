import React, { useContext, useState, useReducer } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import PropTypes from "prop-types";
import { postRequest } from "../api/api";
import { LOGIN_API } from "../api/baseUrl";
import LoginContext from "../context/loginContext";
import { loginReducer } from "../context/loginReducer";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function LoginComponent(props) {
    const signIn = useContext(LoginContext);
    // console.log("LoginContext", signIn);

    const dispatchLogin = useDispatch();

    const initialLoginState = {
      userToken: null,
      login: false
    }

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const classes = useStyles();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [servererror, setServerError] = useState("");

    

    const userDataSubmit = (event) =>{
        event.preventDefault();
        console.log("handleValidation() value", handleValidation());
        
        if(!handleValidation()){
            return false
        }

        console.log("Both username and password", userName, password);
        if(userName && password){
            // localStorage.setItem("token", "tta sdhjasdgashdghsdg56565");
            // sessionStorage.setItem
            const userCredential = {
                email : userName,
                password : password
            }
            // fetch('https://reqres.in/api/login', {
            // method: 'POST', // or 'PUT'

            // headers: {
            //     'Content-Type': 'application/json',
            // },
            //     body: JSON.stringify(userCredential),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success or access token:', data);
            //     if(data.error){
            //         setServerError(data.error)
            //     }else{
            //         // localStorage.setItem("token", data.token);
            //         sessionStorage.setItem("token", data.token)
            //     }
            // }).catch((error) => {
            //     console.error('Error:', error);
            // });

            const headers = {
                'Access-Control-Allow-Origin': '*',
            }
            const credential = JSON.stringify(userCredential);
            postRequest(LOGIN_API, userCredential, headers).then(res =>{
                console.log("Api success repspone", res);
                localStorage.setItem("token", res.data.token);
                // signIn(res.data.token);
                // dispatch({ type: 'LOGIN', userToken: res.data.token, login: true });
                dispatchLogin({type: 'LOGIN', userToken: res.data.token, login: true});
            }).catch(err => {
                console.log("Error in api", err)
            })
        }
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

    return (
        <>
            {/* <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField required id="standard-basic" label="Username" onChange={(event) => setUserName(event.target.value)} helperText={"This field is require"} error={true} />
                </div>
                <div>
                    <TextField required id="standard-basic" label="Password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={(event) =>userDataSubmit(event)}>
                        Log In
                    </Button>
                </div>
            </form> */}
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

LoginComponent.propType= {
    accessToken: PropTypes.isRequired
}

export default LoginComponent