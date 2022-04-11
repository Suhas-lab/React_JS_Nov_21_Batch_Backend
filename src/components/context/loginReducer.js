export const loginReducer= (prevState, action) =>{
    switch (action.type) {
      case "LOGIN" : {
        return {
        ...prevState,
        userToken: action.userToken,
        login: action.login
      }
    }
      default:
        break;
    }
}