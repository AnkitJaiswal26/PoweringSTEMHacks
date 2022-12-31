import React, { useContext } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./Profile.module.css";

import { Container } from "@mui/system";
import { EHRContext } from "../../../Context/EHRContext";

const ProfileScreen = () => {
	const { currentAccount, setCurrentAccount, connectWallet } =
		useContext(EHRContext);

	const userInfo = {
		name: "Pranit",
		email: "pranit@gmail.com",
		mobile: "+91 8766492060",
		gender: "Male",
		dob: "29/12/2022",
		pernonalAdd:
			"H R Mahajani Rd, Matunga East, Mumbai, Maharashtra 400019",
	};

	return (
		<div className={styles.hospitals_wrapper}>
			<Sidebar value="Profile" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					{/* {currentAccount === "" ? (
						<button
							className={styles.connectButton}
							onClick={async (e) => {
								e.preventDefault();
								console.log("ehll");
								await connectWallet();
							}}
						>
							Connect Wallet
						</button>
					) : (
						<button
							className={styles.connectButton}
							onClick={(e) => setCurrentAccount("")}
						>
							Logout
						</button>
					)} */}
				</div>
				<div className={styles.inforWrapper}>
					<div className={styles.hospitals_search}>
						<button className={styles.searchButton} disabled>
							Profile Information
						</button>
					</div>
					<div className={styles.profileContainer}>
						{Object.keys(userInfo).map((key, index) => (
							<div keys={index}>
								<div className={styles.profileRow}>
									<h4 className={styles.title}>
										{key.toLocaleUpperCase()}{" "}
									</h4>
									<p>:</p>
									<p className={styles.text}>
										{userInfo[key]}
									</p>
								</div>
								<hr className={styles.horizontal} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileScreen;
