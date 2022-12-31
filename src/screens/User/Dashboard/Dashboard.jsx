import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./Dashboard.module.css";
import Modal from "react-modal";
import RegisterUser from "../RegisterUser/RegisterUser";

const Dashboard = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const { checkIfWalletConnected, currentAccount, checkRole } =
		useContext(EHRContext);

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	const fetchUser = useCallback(async (account) => {
		console.log("hello");
		const data = await checkRole(account);
		if (data === 0) {
			openModal(true);
		} else if (data === 2) {
			console.log("hello");
		}
		// console.log(data);
		// setHistory(data);
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	return (
		<div className={styles.dashboard_wrapper}>
			<RegisterUser closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<Sidebar value="Dashboard" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					{/* <button className={styles.connectButton}>
						Connect Wallet
					</button> */}
				</div>
				<div className={styles.content}></div>
			</div>
		</div>
	);
};

export default Dashboard;
