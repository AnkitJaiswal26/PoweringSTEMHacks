import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Wenb3Model from "web3modal";

import { EHRABI, EHRAddress } from "./constants";

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(EHRAddress, EHRABI, signerOrProvider);

const connectingWithSmartContract = async () => {
	try {
		const web3Modal = new Wenb3Model();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);
		return contract;
	} catch (error) {
		console.log("Something went wrong while connecting with contract!");
	}
};

export const EHRContext = React.createContext();

export const EHRProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("");

	const checkIfWalletConnected = async () => {
		try {
			if (!window.ethereum) return console.log("Install Metamask");
			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});
			if (accounts.length) {
				setCurrentAccount(accounts[0]);
				console.log("Current Account", currentAccount);
			} else {
				console.log("No accounts found!");
			}
		} catch (error) {
			console.log("Someting wrong while connecting to wallet");
		}
	};

	const fetchData = useCallback(async () => {
		await checkIfWalletConnected();
	}, []);

	useEffect(() => {
		fetchData().catch((err) => console.log(err));
	}, []);

	const connectWallet = async () => {
		try {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0]);

			window.location.reload();
		} catch (error) {
			console.log("Error while connecting to wallet");
		}
	};

	const registerUser = async (
		name,
		personalAdd,
		emailId,
		mobileNo,
		gender,
		dob
	) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.registerUser(
				name,
				personalAdd,
				emailId,
				mobileNo,
				gender,
				dob
			);
			console.log("Registered!");
		} catch (err) {
			console.log(err);
		}
	};

	const registerHospital = async (name, personalAdd, emailId, mobileNo) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.registerHospital(
				name,
				personalAdd,
				emailId,
				mobileNo
			);
			console.log("Registered!");
		} catch (err) {
			console.log(err);
		}
	};

	const registerOrganization = async (name, emailId, mobileNo) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.registerResearchOrg(name, emailId, mobileNo);
			console.log("Registered!");
		} catch (err) {
			console.log(err);
		}
	};

	const createNewRecord = async (
		userAdd,
		docName,
		recordHash,
		recordName,
		issueDate,
		testSuggested
	) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.createNewRecord(
				userAdd,
				currentAccount,
				docName,
				recordHash,
				recordName,
				issueDate,
				testSuggested
			);
			console.log("Added!");
		} catch (err) {
			console.log(err);
		}
	};

	const createNewResearch = async (name, description, cid) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.createNewResearch(name, description, cid);
			console.log("Added!");
		} catch (err) {
			console.log(err);
		}
	};

	const grantAccessToHospital = async (hospitalAddress) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.grantAccessToHospital(hospitalAddress);
			console.log("Granted!");
		} catch (err) {
			console.log(err);
		}
	};

	const removeAccessFromHospital = async (hospitalAddress) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.removeAccessFromHospital(hospitalAddress);
			console.log("Removed!");
		} catch (err) {
			console.log(err);
		}
	};

	const grantAccessToResearch = async (researchId) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.grantAccessToResearch(researchId);
			console.log("Granted!");
		} catch (err) {
			console.log(err);
		}
	};

	const removeAccessFromResearch = async (researchId) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.removeAccessFromResearch(researchId);
			console.log("Granted!");
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllHospitals = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const myResearchAccessList = await contract.fetchAllHospitals();
			console.log(myResearchAccessList);
			return myResearchAccessList;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchMyHospitalAccessList = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const myResearchAccessList =
				await contract.fetchMyHospitalAccessList();
			console.log(myResearchAccessList);
			return myResearchAccessList;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchMyResearchAccessList = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const myResearchAccessList =
				await contract.fetchMyResearchAccessList();
			console.log(myResearchAccessList);
			return myResearchAccessList;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchMyDocuments = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const myRecords = await contract.fetchMyDocuments();
			console.log(myRecords);
			return myRecords;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUserDocumentsForHospital = async (userAddress) => {
		const contract = await connectingWithSmartContract();
		try {
			const userDocuments = await contract.fetchUserDocumentsForHospital(
				userAddress
			);
			console.log(userDocuments);
			return userDocuments;
		} catch (err) {
			console.log(err);
		}
	};

	const getAllHospitalRecords = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const hospitalRecords = await contract.getAllHospitalRecords();
			console.log(hospitalRecords);
			return hospitalRecords;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUserDocumentsForResearch = async (userAddress, researchId) => {
		const contract = await connectingWithSmartContract();
		try {
			const userDocuments = await contract.fetchUserDocumentsForResearch(
				userAddress,
				researchId
			);
			console.log(userDocuments);
			return userDocuments;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllUsersForResearch = async (researchId) => {
		const contract = await connectingWithSmartContract();
		try {
			const userList = await contract.fetchAllUsersForResearch(
				researchId
			);
			console.log(userList);
			return userList;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchMyResearchs = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const researches = await contract.fetchMyResearchs();
			console.log(researches);
			return researches;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUserByAddress = async (userAddrress) => {
		const contract = await connectingWithSmartContract();
		try {
			const user = await contract.fetchUserByAddress(userAddrress);
			return user;
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<EHRContext.Provider
			value={{
				connectWallet,
				currentAccount,
				registerHospital,
				registerUser,
				registerOrganization,
				fetchAllHospitals,
				fetchAllUsersForResearch,
				fetchMyDocuments,
				fetchMyHospitalAccessList,
				fetchMyResearchAccessList,
				fetchMyResearchs,
				fetchUserByAddress,
				fetchUserDocumentsForHospital,
				fetchUserDocumentsForResearch,
				grantAccessToHospital,
				grantAccessToResearch,
				removeAccessFromHospital,
				removeAccessFromResearch,
				getAllHospitalRecords,
				createNewRecord,
				createNewResearch,
			}}
		>
			{children}
		</EHRContext.Provider>
	);
};
