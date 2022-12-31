import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RSidebar from "../../../components/ReserachOrgSidebar/RSidebar";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./Dashboard.module.css";
import RegisterOrg from "../RegisterOrg/RegisterOrg";

const ResearchOrgDashboard = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

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
		console.log(data);
		if (data === 0) {
			openModal(true);
		} else if (data === 1) {
			navigate("/user/dashboard");
		} else if (data === 2) {
			navigate("/hospital/dashboard");
		}
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	return (
		<div className={styles.dashboard_wrapper}>
			<RSidebar value="Dashboard" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
				</div>
				<div className={styles.content}></div>
			</div>
		</div>
	);
};

export default ResearchOrgDashboard;
