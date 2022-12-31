import React, { useCallback, useContext, useEffect, useState } from "react";
import HSidebar from "../../../components/HospitalSidebar/HSidebar";
import styles from "./FetchUserRecordByAdd.module.css";
import { Container, Snackbar, Alert } from "@mui/material";
import { EHRContext } from "../../../Context/EHRContext";

const UserRecordByAdd = () => {
	const {
		currentAccount,
		fetchUserDocumentsForHospital,
		checkIfWalletConnected,
	} = useContext(EHRContext);

	useEffect(() => {
		checkIfWalletConnected();
	});

	const [searchInput, setSearchInput] = useState("");
	const [error, setError] = useState(false);
	const [record, setRecord] = useState([
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Blood Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",
		},
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Skin Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",
		},
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Blood Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",
		},
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Hair Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",
		},
	]);

	const fetchData = useCallback(async () => {
		console.log("hello");
		if (searchInput) {
			const data = await fetchUserDocumentsForHospital(searchInput);
			console.log(data);
			setRecord(data);
		}
	});

	useEffect(() => {
		fetchData();
	}, [currentAccount]);

	const getRecords = () => (
		<div className={styles.hospitalContainer}>
			<div className={styles.hospitalsGrid}>
				{record &&
					record.map((recordHistory, id) => {
						if (
							searchInput == "" ||
							recordHistory.recordName
								.toLowerCase()
								.includes(searchInput)
						) {
							return (
								<div id={id} className={styles.hosBox}>
									<div className={styles.hosName}>
										<span>{recordHistory.recordName}</span>
									</div>
									<hr style={{ marginBottom: "10px" }}></hr>
									<div className={styles.hospitalDescription}>
										<b>Doctor Name:</b>{" "}
										{recordHistory.docName}
									</div>

									<div className={styles.hospitalDescription}>
										<b>Test Suggested:</b>{" "}
										{recordHistory.testSuggested}
									</div>
									<div className={styles.hosAddress}>
										<b>Issue Date</b>
										<br />
										{recordHistory.issueDate}
									</div>
									<button className={styles.grantButton}>
										View Report
									</button>
								</div>
							);
						}
					})}
			</div>
		</div>
	);

	const handleinput = (id) => {
		setSearchInput(id);
	};

	const fetchRecord = () => {
		setError(false);
		if (searchInput.length > 0 && searchInput.length != 42) {
			setError(`Enter correct User Adderess/id`);
			return;
		}
		setError(false);

		// TODO: request data from fetchUserDocumentsForHospital

		setRecord([]);
	};

	const showEmptyRecord = () => {
		return (
			<>
				<img
					style={{ margin: "10px auto" }}
					src={
						"https://counter-form.com/pgd/assets/img/bar_icon/No-record-found.png"
					}
					alt="loading..."
				/>
			</>
		);
	};

	return (
		<div className={styles.hospitals_wrapper}>
			<HSidebar value="Users" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					<button className={styles.connectButton}>
						Connect Wallet
					</button>
				</div>
				<div className={styles.searchWrapper}>
					{/* Search Bar Start  */}
					<div className={styles.hospitals_search}>
						<input
							className={`px-2 p-3 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white w-full`}
							placeholder="Search by User address"
							value={searchInput}
							onChange={(e) => {
								handleinput(e.target.value.trim());
							}}
						/>
						<button
							className={styles.searchButton}
							onClick={fetchRecord}
						>
							Find
						</button>
					</div>
					{/* Search bar end  */}
				</div>
				{/* search output result start */}
				{/* TODO:  */}

				<Container>
					{error && (
						<div role="alert">
							<div class="border border-t-1 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
								<p>{error}</p>
							</div>
						</div>
					)}
					{record.length > 0 && !error
						? getRecords()
						: showEmptyRecord()}
				</Container>
				{/* search output result end */}
			</div>
		</div>
	);
};

export default UserRecordByAdd;
