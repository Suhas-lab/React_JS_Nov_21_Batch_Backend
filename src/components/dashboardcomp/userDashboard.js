import { Button } from "react-bootstrap";
import React from "react";

function UserDashboard(){

    const logOutHandler = ()=>{
        localStorage.removeItem("token");// Only specififc keys data will clear
        // localStorage.clear(); // All data cleared by this method
    }

    return(
        <>
            <h1>This is user dashboard</h1>
            <Button onClick={logOutHandler} variant={'primary'}>Log Out</Button>
        </>
    )
}

export default UserDashboard