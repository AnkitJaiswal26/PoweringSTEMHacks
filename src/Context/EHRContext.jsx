import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Wenb3Model from "web3modal";
import { Web3Storage } from "web3.storage";
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
	const web3AccessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFjNjkxYTc1NTFBODU3MzIzMTE2MWZEMzUyMUFEQ0MyNWFEQzIyOWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE3ODk2NzI1MjUsIm5hbWUiOiJIYWNrQU1pbmVycyJ9._DQqNUq6VZ-Zg86ol1YHB0L4sWFtowhD6SSdSIRR23Y";
	const web3Storage = new Web3Storage({ token: web3AccessToken });

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

	const createNewResearch = async (
		name,
		description,
		cid,
		cidName,
		usersRequired
	) => {
		const contract = await connectingWithSmartContract();
		try {
			await contract.createNewResearch(
				name,
				description,
				cid,
				cidName,
				usersRequired,
				{
					value: ethers.utils.parseUnits(
						(usersRequired * 0.0001).toString(),
						"ether"
					),
				}
			);
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
			console.log("Removed!");
			await contract.removeAccessFromResearch(researchId, {
				value: ethers.utils.parseUnits("0.0001", "ether"),
				gasLimit: 3000000,
			});

			console.log("Removed!");
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllHospitals = async (account) => {
		const contract = await connectingWithSmartContract();
		try {
			var data = await contract.fetchAllHospitals();
			var result = [];

			for (let i = 0; i < data.length; i++) {
				const access = await hasUserRecordAccessForHospital(
					account,
					data[i].hosAdd
				);

				result.push({
					name: data[i].name,
					emailId: data[i].emailId,
					contactNo: data[i].contactNo,
					hosAdd: data[i].hosAdd,
					personalAdd: data[i].personalAdd,
					access: access,
				});
				// data[i] = { ...data[i], access: access };
			}
			return result;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchResearchById = async (id) => {
		const contract = await connectingWithSmartContract();
		try {
			const data = await contract.fetchResearchById(id);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchHospitalByAddress = async (address) => {
		const contract = await connectingWithSmartContract();
		try {
			const data = await contract.fetchHospitalByAddress(address);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchResearchOrgByAddress = async (address) => {
		const contract = await connectingWithSmartContract();
		try {
			const data = await contract.fetchOrganizationByAddress(address);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchMyHospitalAccessList = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const myResearchAccessList =
				await contract.fetchMyHospitalAccessList();
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
			return myResearchAccessList;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchMyDocuments = async () => {
		const contract = await connectingWithSmartContract();
		await checkIfWalletConnected();
		try {
			const myRecords = await contract.fetchMyDocuments();
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
			return userDocuments;
		} catch (err) {
			console.log(err);
		}
	};

	const getAllHospitalRecords = async () => {
		const contract = await connectingWithSmartContract();
		try {
			const hospitalRecords = await contract.getAllHospitalRecords();
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

	const hasUserRecordAccessForHospital = async (
		userAddress,
		hospitalAddress
	) => {
		const contract = await connectingWithSmartContract();
		try {
			const access = await contract.hasUserRecordAccessForHospital(
				userAddress,
				hospitalAddress
			);
			return access;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllUserDocForResearch = async (id) => {
		try {
			const users = await fetchAllUsersForResearch(id);
			var result = [];
			for (let i = 0; i < users.length; i++) {
				const data = await fetchUserDocumentsForResearch(
					users[i].userAdd,
					id
				);
				console.log("-------------------");
				console.log(data.length);
				if (result.length) {
					result = [...result, ...data];
				} else {
					result = data;
				}
			}

			console.log(result);

			return result;
		} catch (err) {}
	};

	const hasUserRecordAccessForResearch = async (userAddress, researchId) => {
		const contract = await connectingWithSmartContract();
		try {
			console.log(userAddress, researchId);
			const access = await contract.hasUserRecordAccessForResearch(
				userAddress,
				researchId
			);
			return access;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllResearchs = async (account) => {
		const contract = await connectingWithSmartContract();

		try {
			var data = await contract.fetchAllResearchs();
			var result = [];
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				const access = await hasUserRecordAccessForResearch(
					account,
					data[i].id
				);
				result.push({
					id: data[i].id.toNumber(),
					name: data[i].name,
					description: data[i].description,
					orgAdd: data[i].orgAdd,
					cid: data[i].cid,
					access: access,
					usersRequired: parseInt(data[i].usersRequired),
					currentUsers: data[i].currentUsers.toNumber(),
				});
			}
			return result;
		} catch (err) {
			console.log(err);
		}
	};

	const uploadFilesToIPFS = async (file) => {
		try {
			const cid = await web3Storage.put(file);
			return cid;
		} catch (err) {
			console.log(err);
		}
	};

	const checkRole = async (account) => {
		try {
			const contract = await connectingWithSmartContract();
			const data = await contract.checkRole();
			return data.toNumber();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<EHRContext.Provider
			value={{
				checkRole,
				setCurrentAccount,
				checkIfWalletConnected,
				connectWallet,
				currentAccount,
				registerHospital,
				registerUser,

				registerOrganization,
				fetchAllHospitals,
				//users
				fetchMyDocuments,
				grantAccessToHospital,
				grantAccessToResearch,
				fetchMyHospitalAccessList,
				fetchMyResearchAccessList,
				fetchAllUsersForResearch,
				fetchAllUserDocForResearch,
				fetchMyResearchs,
				removeAccessFromHospital,
				removeAccessFromResearch,
				//hospital
				createNewRecord,
				fetchUserDocumentsForHospital,
				fetchUserByAddress,
				getAllHospitalRecords,
				//record
				createNewResearch,
				fetchResearchById,
				fetchHospitalByAddress,
				fetchResearchOrgByAddress,
				hasUserRecordAccessForHospital,
				hasUserRecordAccessForResearch,
				fetchAllResearchs,
				uploadFilesToIPFS,
			}}
		>
			{children}
		</EHRContext.Provider>
	);
};
