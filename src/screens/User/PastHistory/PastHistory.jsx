import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterUser from "../RegisterUser/RegisterUser";
import styles from "./PastHistory.module.css";

const PastHistory = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const {
		currentAccount,
		fetchMyDocuments,
		checkIfWalletConnected,
		checkRole,
	} = useContext(EHRContext);

	const navigate = useNavigate();

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	const fetchUser = useCallback(async (account) => {
		console.log("hello");
		const data = await checkRole(account);
		if (data === 0) {
			openModal(true);
		} else if (data === 2) {
			navigate("/hospital/dashboard");
		} else if (data === 3) {
			navigate("/org");
		}
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	const [searchInput, setSearchInput] = useState("");
	const [history, setHistory] = useState([]);

	const fetchData = useCallback(async () => {
		console.log("hello");
		const data = await fetchMyDocuments();
		console.log(data);
		setHistory(data);
	});

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	useEffect(() => {
		fetchData();
	}, [currentAccount]);

	return (
		<div className={styles.hospitals_wrapper}>
			<RegisterUser closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<Sidebar value="Past History" />
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

export default PastHistory;
