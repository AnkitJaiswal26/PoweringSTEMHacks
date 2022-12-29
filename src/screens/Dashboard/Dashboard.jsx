import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
	return (
		<div className={styles.dashboard_wrapper}>
			<Sidebar value="Dashboard" />
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

export default Dashboard;
