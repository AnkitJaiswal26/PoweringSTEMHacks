import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./Dashboard.module.css";
import Modal from "react-modal";
import RegisterUser from "../RegisterUser/RegisterUser";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState({ name: "" });

	const navigate = useNavigate();

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const {
		checkIfWalletConnected,
		currentAccount,
		checkRole,
		fetchUserByAddress,
	} = useContext(EHRContext);

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	const fetchUser = useCallback(async (account) => {
		console.log("hello");
		const data = await checkRole(account);
		if (data === 0) {
			openModal(true);
		} else if (data === 2) {
			navigate("/hospital/profile");
		} else if (data === 3) {
			navigate("/org/profile");
		} else {
			const data = await fetchUserByAddress(account);
			setUser({
				userAdd: data.userAdd,
				name: data.name,
				emailId: data.emailId,
				mobileNo: data.mobileNo,
				personalAdd: data.personalAdd,
				gender: data.gender.toNumber(),
				dob: data.dob,
			});
		}
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
					<h3 className={styles.user}>Welcome {user.name}!</h3>
				</div>
				<div className={styles.content}></div>
			</div>
		</div>
	);
};

export default Dashboard;
