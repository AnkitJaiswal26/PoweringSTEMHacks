import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HSidebar from "../../../components/HospitalSidebar/HSidebar";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterHospital from "../RegisterHospital/RegisterHospital";
import styles from "./Dashboard.module.css";

const HospitalDashboard = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();
	const [user, setUser] = useState({ name: "" });

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const {
		checkIfWalletConnected,
		fetchHospitalByAddress,
		currentAccount,
		checkRole,
	} = useContext(EHRContext);

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	const fetchUser = useCallback(async (account) => {
		console.log("hello");
		const data = await checkRole(account);
		console.log(data);
		if (data === 0) {
			openModal(true);
		} else if (data === 1) {
			navigate("/user/profile");
		} else if (data === 3) {
			navigate("/org/profile");
		} else {
			const data = await fetchHospitalByAddress(account);
			setUser({
				hosAdd: data.hosAdd,
				name: data.name,
				emailId: data.emailId,
				mobileNo: data.mobileNo,
				personalAdd: data.personalAdd,
			});
		}
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	return (
		<div className={styles.dashboard_wrapper}>
			<RegisterHospital
				closeModal={closeModal}
				modalIsOpen={modalIsOpen}
			/>
			<HSidebar value="Dashboard" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
				</div>
				<div className={styles.content}></div>
			</div>
		</div>
	);
};

export default HospitalDashboard;
