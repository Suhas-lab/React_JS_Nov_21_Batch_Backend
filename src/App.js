import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginComponent from './components/userComponents/loginComponent';
import UserDashboard from './components/dashboardcomp/userDashboard';
import BasicMenu from './components/dashboardcomp/basicMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginContext from './components/context/loginContext';
import { loginReducer } from './components/redux/loginReducer';
import { useSelector } from 'react-redux';
import RegisterUser from './components/userComponents/registerUser';
import UserList from './components/userComponents/userListComponent';

function App() {
  const [username, setUsername] = useState("") // string type variable
  const [validuser, setValidUser] = useState(false); // this is boolean type variable
  const [arrtype, setArrayType] = useState([]); // array type variable
  const [objectype, setObjectType] = useState({}); //object type variable or state
  const [userdata, setUserData] = useState({
        name: "",
        phoneno: 12112,
        isvalid: false,
        usertype: ['admin', 'user', 'student'],
        address: {
          add1: "",
          add2: ""
        },
        setuservalid: function(){console.log("valid user method")}
  });
  
  const [accessToken, setAccessToken] = useState("");
  const [userToken, setUserToken] = useState(false);
  const authcontext = useContext(LoginContext);

  const loginStatus = useSelector(state => state.loginReducer);

  // console.log("loginStatus value", loginStatus);
  // const authcontext = useMemo(()=>({
  //   signIn: async(tokenresponse)=> {
  //     debugger;
  //     try{
  //       let accesstoken;
  //       await localStorage.setItem("jwtToken", tokenresponse)
  //       dispatch({ type: 'LOGIN', token: userToken })
  //     }catch(e){
  //       console.log(e)
  //     }


  //   },
  //   signOut: async()=> {

  //   }
  // }))

  // function userDataSubmit(){
  //   console.log("user data submitted");
  // }

  const userDataSubmit = () =>{
    // console.log("user data submitted with arrow function");
    setUsername("Roshan");
    setValidUser(true);
    setUserData({
      ...userdata,
      usertype: ['std1', 'std2', 'std3']
    })
  }

  useEffect(() =>{
    // setInterval(() => {
    //   console.log("This is use effect life cycle hook");
    // }, 500);
    const takeaccToken = localStorage.getItem("token");
    console.log("takeaccToken", takeaccToken);
    // const takeaccToken = sessionStorage.getItem("token");
    if(takeaccToken){
      setAccessToken(takeaccToken)
    }

  }, [])
  // useEffect life cycle hook of fuction component. It will taken care of component mount and component unmount


  // if(!loginStatus.login && !accessToken){
  //   console.log("change accesstoken value", accessToken)
  //   return <LoginComponent accessToken={accessToken} />
  // }

  return (
    <>
    <Router>
      <BasicMenu />
      <Routes>
        <Route path="/registerUser" element={<RegisterUser />} />
       <Route path="/dashboard" element={<UserDashboard />}/>
       <Route path="/userList" element={<UserList />} />
      </Routes>
    </Router>
    {/* <LoginContext.Provider value={'true'}>
    <Router>
      <BasicMenu />
      <Routes>
        {authcontext.login ? <Route path="/" element={<LoginComponent />}/> : <Route path="/dashboard" element={<UserDashboard />}/>}
      </Routes>
    </Router>
    </LoginContext.Provider> */}
    {/* <div className="App">
      <input type={'button'} name={'submitData'} value={"Submit Data"} onClick={() => userDataSubmit()} />
      <div>Check the state values: {username}</div>
      <div>Check valid user value: {validuser ? "True": "False"}</div>
      <div>
        <div>CHeck value is updated or not: {userdata.phoneno}</div>
        <ul>
          {userdata.usertype && userdata.usertype.map((ele) => <li>{ele}</li>)}
        </ul>
      </div>
    </div> */}
    </>
  );
}

export default App;
