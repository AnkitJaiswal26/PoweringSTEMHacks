import React, { useState, useEffect, useContext, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { EHRContext } from "../../Context/EHRContext";
import styles from "./PastHistory.module.css";

const Hospitals = () => {
	const {
		currentAccount,
		setCurrentAccount,
		connectWallet,
		fetchMyDocuments,
	} = useContext(EHRContext);

	const [searchInput, setSearchInput] = useState("");
	const [history, setHistory] = useState([
		// {
		// 	userAdd: "userAdd",
		// 	hosAdd: "hosAdd",
		// 	docName: "Dr. Ankit",
		// 	recordName: "Blood Cancer",
		// 	issueDate: "10/10/2022",
		// 	testSuggested: "blood test",
		// },
		// {
		// 	userAdd: "userAdd",
		// 	hosAdd: "hosAdd",
		// 	docName: "Dr. Ankit",
		// 	recordName: "Skin Cancer",
		// 	issueDate: "10/10/2022",
		// 	testSuggested: "blood test",
		// },
		// {
		// 	userAdd: "userAdd",
		// 	hosAdd: "hosAdd",
		// 	docName: "Dr. Ankit",
		// 	recordName: "Blood Cancer",
		// 	issueDate: "10/10/2022",
		// 	testSuggested: "blood test",
		// },
		// {
		// 	userAdd: "userAdd",
		// 	hosAdd: "hosAdd",
		// 	docName: "Dr. Ankit",
		// 	recordName: "Hair Cancer",
		// 	issueDate: "10/10/2022",
		// 	testSuggested: "blood test",
		// },
	]);

	const fetchData = useCallback(async () => {
		const data = await fetchMyDocuments();
		setHistory(data);
	});

	useEffect(() => {
		fetchData().catch((err) => console.log(err));
	}, []);

	return (
		<div className={styles.hospitals_wrapper}>
			<Sidebar value="Past History" />
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
							onChange={(e) => {
								setSearchInput(e.target.value);
							}}
						/>
						<button className={styles.searchButton}>Search</button>
					</div>
					<div className={styles.hospitalContainer}>
						<div className={styles.hospitalsGrid}>
							{history &&
								history.map((recordHistory, id) => {
									if (
										searchInput == "" ||
										recordHistory.recordName
											.toLowerCase()
											.includes(searchInput)
									) {
										return (
											<div
												id={id}
												className={styles.hosBox}
											>
												<div className={styles.hosName}>
													<span>
														{
															recordHistory.recordName
														}
													</span>
												</div>
												<hr
													style={{
														marginBottom: "10px",
													}}
												></hr>
												<div
													className={
														styles.hospitalDescription
													}
												>
													<b>Doctor Name:</b>{" "}
													{recordHistory.docName}
												</div>

												<div
													className={
														styles.hospitalDescription
													}
												>
													<b>Test Suggested:</b>{" "}
													{
														recordHistory.testSuggested
													}
												</div>
												<div
													className={
														styles.hosAddress
													}
												>
													<b>Issue Date</b>
													<br />
													{recordHistory.issueDate}
												</div>
												<button
													className={
														styles.grantButton
													}
												>
													View Report
												</button>
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
