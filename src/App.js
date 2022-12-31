import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/User/Profiles/Profile";
import Dashboard from "./screens/User/Dashboard/Dashboard";
import Hospitals from "./screens/User/Hospitals/Hospitals";
import PastHistory from "./screens/User/PastHistory/PastHistory";
import FetchMyDocuments from "./screens/FetchMyDocuments";
import Researchs from "./screens/User/Researchs/Researchs";
import Research from "./screens/Research/Research";
import HospitalDashboard from "./screens/Hospital/Dashboard/HospitalDashboard";
import HospitalProfileScreen from "./screens/Hospital/Profile/HospitalProfile";
import HospitalPastRecords from "./screens/Hospital/PastRecords/HospitalPastRecords";
import ResearchOrgDashboard from "./screens/ResearchOrg/Dashboard/ResearchOrgDashboard";
import ResearchOrgProfile from "./screens/ResearchOrg/Profile/ResearchOrgProfile";
import OrgResearchs from "./screens/ResearchOrg/Researchs/OrgResearchs";
import OrgResearch from "./screens/ResearchOrg/Research/OrgResearch";
import UserRecordByAdd from "./screens/Hospital/UserRecord/FetchUserRecordByAdd";
import NewRecord from "./screens/Hospital/NewRecord/NewRecord"
import NewResearch from "./screens/ResearchOrg/NewResearch/NewResearch";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomeScreen />,
		},
		{
			path: "/user/dashboard",
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
			path: "createNewResearch",
			element:<NewResearch />
		},
		{
			path: "/org/researchs",
			element: <OrgResearchs />,
		},
		{
			path: "/hospital/dashboard",
			element: <HospitalDashboard />,
		},
		{
			path: "/hospital/profile",
			element: <HospitalProfileScreen />,
		},
		{	path: "/hospital/users/",
			element: <UserRecordByAdd />,
		},
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
      element: <NewRecord />
    }
	]);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
