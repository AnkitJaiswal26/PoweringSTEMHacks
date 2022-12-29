import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Hospitals.module.css";

const Hospitals = () => {
	const [searchInput, setSearchInput] = useState("");
	const [hospitals, setHospitals] = useState([
		{
			hosAdd: "hosAdd",
			name: "hospital",
			personalAdd: "personalAdd",
			emailId: "email@email.com",
			contactNo: "7977005251",
		},
		{
			hosAdd: "hosAdd",
			name: "hospital",
			personalAdd: "personalAdd",
			emailId: "email@email.com",
			contactNo: "7977005251",
		},
		{
			hosAdd: "hosAdd",
			name: "hospital",
			personalAdd: "personalAdd",
			emailId: "email@email.com",
			contactNo: "7977005251",
		},
		{
			hosAdd: "hosAdd",
			name: "hospital",
			personalAdd: "personalAdd",
			emailId: "email@email.com",
			contactNo: "7977005251",
		},
	]);

	return (
		<div className={styles.hospitals_wrapper}>
			<Sidebar value="Hospitals" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					<button className={styles.connectButton}>
						Connect Wallet
					</button>
				</div>
				<div className={styles.content}>
					<div className={styles.hospitals_search}>
						<input
							className={`px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
							placeholder="Search by address"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button className={styles.searchButton}>Search</button>
					</div>
					<div className={styles.hospitalContainer}>
						<div className={styles.hospitalsGrid}>
							{hospitals &&
								hospitals.map((hospital, id) => {
									return (
										<div id={id} className={styles.hosBox}>
											<div className={styles.hosName}>
												<span>{hospital.name}</span>
											</div>
											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Email Id:</b>{" "}
												{hospital.emailId}
											</div>

											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Mobile No:</b>{" "}
												{hospital.contactNo}
											</div>
											<div className={styles.hosAddress}>
												<b>Address:</b>
												<br />
												{hospital.personalAdd}
											</div>
											<button
												className={styles.grantButton}
											>
												Grant Access
											</button>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hospitals;
