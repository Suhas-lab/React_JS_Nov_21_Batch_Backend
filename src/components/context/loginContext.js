import React from "react";

const inistialState = {
    login: false
}

const LoginContext = React.createContext(inistialState);

export default LoginContext;