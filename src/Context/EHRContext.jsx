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

	return (
		<EHRContext.Provider
			value={{ connectWallet, registerUser, currentAccount }}
		>
			{children}
		</EHRContext.Provider>
	);
};
