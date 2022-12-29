import React, {useState} from 'react';
import "./App.css"
import Button from '@mui/material/Button';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';



const App = () => {
  const [user, setUser] = useState();
  const handleUser = (userObj) => {
    setUser(userObj);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen user={user} hadleUser={handleUser}/>,
    },
    {
      path: "/register",
      element: <RegistrationScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path:"/profile",
      element: <h1>Profile</h1>
    }
  ]);
  return (<>
     <RouterProvider router={router} />
  </>);
}

export default App;