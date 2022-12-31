import React, { useEffect, useState, useContext, useCallback } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./Hospitals.module.css";
import { EHRContext } from "../../../Context/EHRContext";
const Hospitals = () => {
	const {
		currentAccount,
		setCurrentAccount,
		connectWallet,
		fetchAllHospitals,
		grantAccessToHospital,
		removeAccessToHospital,
	} = useContext(EHRContext);
	const [searchInput, setSearchInput] = useState("");
	const [hospitals, setHospitals] = useState([
		// {
		// 	hosAdd: "hosAdd",
		// 	name: "hospital",
		// 	personalAdd: "personalAdd",
		// 	emailId: "email@email.com",
		// 	contactNo: "7977005251",
		// },
		// {
		// 	hosAdd: "hosAdd",
		// 	name: "hospital",
		// 	personalAdd: "personalAdd",
		// 	emailId: "email@email.com",
		// 	contactNo: "7977005251",
		// },
		// {
		// 	hosAdd: "posAdd",
		// 	name: "hospital",
		// 	personalAdd: "personalAdd",
		// 	emailId: "email@email.com",
		// 	contactNo: "7977005251",
		// },
		// {
		// 	hosAdd: "hosAdd",
		// 	name: "hospital",
		// 	personalAdd: "personalAdd",
		// 	emailId: "email@email.com",
		// 	contactNo: "7977005251",
		// },
	]);

	const fetchHospitals = useCallback(async () => {
		const hospits = await fetchAllHospitals();
		setHospitals(hospits);
		console.log(hospits);
	});

	useEffect(() => {
		fetchHospitals().catch((err) => console.log(err));
	}, []);

	const grantAccess = async (e, id) => {
		e.preventDefault();
		try {
			await grantAccessToHospital(parseInt(id));
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	const removeAccess = async (e, id) => {
		e.preventDefault();
		try {
			await removeAccessToHospital(parseInt(id));
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.hospitals_wrapper}>
			<Sidebar value="Hospitals" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					{currentAccount === "" ? (
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
					)}
				</div>
				<div className={styles.content}>
					<div className={styles.hospitals_search}>
						<input
							className={`px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
							placeholder="Search by address"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button
							className={styles.searchButton}
							// onClick={(e) => filterHospitals(e)}
						>
							Search
						</button>
					</div>
					<div className={styles.hospitalContainer}>
						<div className={styles.hospitalsGrid}>
							{hospitals &&
								hospitals.map((hospital, id) => {
									if (
										searchInput == "" ||
										hospital.hosAdd.includes(searchInput)
									) {
										return (
											<div
												key={id}
												id={id}
												className={styles.hosBox}
											>
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
												<div
													className={
														styles.hosAddress
													}
												>
													<b>Address:</b>
													<br />
													{hospital.personalAdd}
												</div>
												{hospital.access === true ? (
													<button
														className={
															styles.grantButton
														}
														onClick={(e) =>
															removeAccess(
																e,
																hospital.hosAdd
															)
														}
													>
														Remove Access
													</button>
												) : (
													<button
														className={
															styles.grantButton
														}
														onClick={(e) =>
															grantAccess(
																e,
																hospital.hosAdd
															)
														}
													>
														Grant Access
													</button>
												)}
											</div>
										);
									}
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hospitals;
