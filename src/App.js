import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import Hospitals from "./screens/Hospitals/Hospitals";

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
	]);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
