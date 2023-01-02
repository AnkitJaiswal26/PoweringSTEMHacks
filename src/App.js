import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import FetchMyDocuments from "./screens/FetchMyDocuments";

import {
	HospitalDashboard,
	NewRecord,
	HospitalPastRecords,
	HospitalProfileScreen,
	UserRecordByAdd,
} from "./screens/Hospital";

import {
	ResearchOrgDashboard,
	ResearchOrgProfile,
	NewResearch,
	OrgResearch,
	OrgResearchs,
} from "./screens/ResearchOrg";

import {
	Dashboard,
	Hospitals,
	PastHistory,
	ProfileScreen,
	Research,
	Researchs,
} from "./screens/User";
import { ToastContainer } from "react-toastify";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomeScreen />,
		},
		{
			path: "/org/profile",
			element: <ResearchOrgProfile />,
		},
		{
			path: "/org/researchs/:researchId",
			element: <OrgResearch />,
		},
		{
			path: "createNewResearch",
			element: <NewResearch />,
		},
		{
			path: "/org/researchs",
			element: <OrgResearchs />,
		},
		{
			path: "/hospital/profile",
			element: <HospitalProfileScreen />,
		},
		{ path: "/hospital/users/", element: <UserRecordByAdd /> },
		{
			path: "/hospital/history",
			element: <HospitalPastRecords />,
		},
		{
			path: "/user/hospitals",
			element: <Hospitals />,
		},
		{
			path: "/user/researchs",
			element: <Researchs />,
		},
		{
			path: "/researchs/:researchId",
			element: <Research />,
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
			path: "/user/profile",
			element: <ProfileScreen />,
		},
		{
			path: "/user/history",
			element: <PastHistory />,
		},
		{
			path: "/fetchmydocs",
			element: <FetchMyDocuments />,
		},
		{
			path: "createNewRecord",
			element: <NewRecord />,
		},
	]);
	return (
		<>
			<ToastContainer />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
