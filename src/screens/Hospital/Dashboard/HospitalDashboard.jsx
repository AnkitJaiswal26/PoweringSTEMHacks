import React from "react";
import HSidebar from "../../../components/HospitalSidebar/HSidebar";
import styles from "./Dashboard.module.css";

const HospitalDashboard = () => {
	return (
		<div className={styles.dashboard_wrapper}>
			<HSidebar value="Dashboard" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					<button className={styles.connectButton}>
						Connect Wallet
					</button>
				</div>
				<div className={styles.content}></div>
			</div>
		</div>
	);
};

export default HospitalDashboard;
