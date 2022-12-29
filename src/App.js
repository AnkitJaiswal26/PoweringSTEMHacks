import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import Hospitals from "./screens/Hospitals/Hospitals";
import FetchMyDocuments from './screens/FetchMyDocuments';
import PastHistory from './screens/PastHistory/PastHistory';

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Dashboard />,
		},
		{
			path: "/hospitals",
			element: <Hospitals />,
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
			path: "/profile",
			element: <ProfileScreen />,
		},
		{
			path: "/history",
			element: <PastHistory />,
		},
    {
      path:"/fetchmydocs",
      element: <FetchMyDocuments />
    }
	]);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
