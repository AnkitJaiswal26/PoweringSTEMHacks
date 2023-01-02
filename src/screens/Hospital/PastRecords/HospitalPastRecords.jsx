import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HSidebar from "../../../components/HospitalSidebar/HSidebar";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterHospital from "../RegisterHospital/RegisterHospital";
import styles from "./PastRecords.module.css";

const HospitalPastRecords = () => {
	const {
		currentAccount,
		checkRole,
		getAllHospitalRecords,
		checkIfWalletConnected,
		fetchHospitalByAddress,
	} = useContext(EHRContext);

	const [modalIsOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState({ name: "" });

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

	const [searchInput, setSearchInput] = useState("");
	const [history, setHistory] = useState([]);

	const fetchData = useCallback(async () => {
		console.log("hello");
		const data = await getAllHospitalRecords();
		console.log(data);
		setHistory(data);
	});

	useEffect(() => {
		fetchData();
	}, [currentAccount]);

	return (
		<div className={styles.hospitals_wrapper}>
			<RegisterHospital
				closeModal={closeModal}
				modalIsOpen={modalIsOpen}
			/>
			<HSidebar value="Past History" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
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
													<a
														target="_blank"
														href={`https://${recordHistory.recordHash}.ipfs.w3s.link/${recordHistory.recordName}`}
													>
														View Report
													</a>
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

export default HospitalPastRecords;
