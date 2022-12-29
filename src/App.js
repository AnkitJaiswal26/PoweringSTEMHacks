import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/Profiles/Profile";
import Dashboard from "./screens/Dashboard/Dashboard";
import Hospitals from "./screens/Hospitals/Hospitals";
import PastHistory from "./screens/PastHistory/PastHistory";
import FetchMyDocuments from "./screens/FetchMyDocuments";
import Researchs from "./screens/Researchs/Researchs";
import Research from "./screens/Research/Research";
import HospitalDashboard from "./screens/Hospital/Dashboard/HospitalDashboard";
import HospitalProfileScreen from "./screens/Hospital/Profile/HospitalProfile";
import HospitalPastRecords from "./screens/Hospital/PastRecords/HospitalPastRecords";
import ResearchOrgDashboard from "./screens/ResearchOrg/Dashboard/ResearchOrgDashboard";
import ResearchOrgProfile from "./screens/ResearchOrg/Profile/ResearchOrgProfile";
import OrgResearchs from "./screens/ResearchOrg/Researchs/OrgResearchs";
import OrgResearch from "./screens/ResearchOrg/Research/OrgResearch";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Dashboard />,
		},
		{
			path: "/org",
			element: <ResearchOrgDashboard />,
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
			path: "/org/researchs",
			element: <OrgResearchs />,
		},
		{
			path: "/hospital",
			element: <HospitalDashboard />,
		},
		{
			path: "/hospital/profile",
			element: <HospitalProfileScreen />,
		},
		{
			path: "/hospital/history",
			element: <HospitalPastRecords />,
		},
		{
			path: "/hospitals",
			element: <Hospitals />,
		},
		{
			path: "/researchs",
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
			path: "/profile",
			element: <ProfileScreen />,
		},
		{
			path: "/history",
			element: <PastHistory />,
		},
		{
			path: "/fetchmydocs",
			element: <FetchMyDocuments />,
		},
		{
			path: "/fetchmydocs",
			element: <FetchMyDocuments />,
		},
	]);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
