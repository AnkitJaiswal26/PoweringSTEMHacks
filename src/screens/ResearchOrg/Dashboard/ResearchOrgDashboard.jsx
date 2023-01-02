import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RSidebar from "../../../components/ReserachOrgSidebar/RSidebar";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./Dashboard.module.css";
import RegisterOrg from "../RegisterOrg/RegisterOrg";

const ResearchOrgDashboard = () => {
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
		fetchResearchOrgByAddress,
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
		} else if (data === 2) {
			navigate("/hospital/profile");
		} else {
			const data = await fetchResearchOrgByAddress(account);
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
			<RegisterOrg closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<RSidebar value="Dashboard" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
				</div>
				<div className={styles.content}></div>
			</div>
		</div>
	);
};

export default ResearchOrgDashboard;
