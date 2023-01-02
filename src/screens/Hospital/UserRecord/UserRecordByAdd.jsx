import React, { useCallback, useContext, useEffect, useState } from "react";
import HSidebar from "../../../components/HospitalSidebar/HSidebar";
import styles from "./FetchUserRecordByAdd.module.css";
import { Container, Snackbar, Alert } from "@mui/material";
import { EHRContext } from "../../../Context/EHRContext";
import { useNavigate } from "react-router-dom";
import RegisterHospital from "../RegisterHospital/RegisterHospital";

const UserRecordByAdd = () => {
	const navigate = useNavigate();
	const {
		currentAccount,
		fetchUserDocumentsForHospital,
		checkIfWalletConnected,
		fetchHospitalByAddress,
		getAllHospitalRecords,
		checkRole,
	} = useContext(EHRContext);
	const [user, setUser] = useState({ name: "" });

	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		checkIfWalletConnected();
	});

	const fetchUser = useCallback(async (account) => {
		const data = await checkRole(account);
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
	const [error, setError] = useState(false);
	const [record, setRecord] = useState([]);

	const fetchData = useCallback(async () => {
		console.log("hello");
		if (searchInput !== "") {
			const data = await fetchUserDocumentsForHospital(searchInput);
			if (!data || data.length === 0) {
				var newData = await getAllHospitalRecords();
				setRecord(
					newData.filter((item) => item.userAdd === searchInput)
				);
			} else {
				console.log(data);
				setRecord(data);
			}
		}
	});

	useEffect(() => {
		if (currentAccount !== "") fetchData();
	}, [currentAccount]);

	const getRecords = () => (
		<div className={styles.hospitalContainer}>
			<div className={styles.hospitalsGrid}>
				{record &&
					record.map((recordHistory, id) => {
						return (
							<div id={id} className={styles.hosBox}>
								<div className={styles.hosName}>
									<span>{recordHistory.recordName}</span>
								</div>
								<hr style={{ marginBottom: "10px" }}></hr>
								<div className={styles.hospitalDescription}>
									<b>Doctor Name:</b> {recordHistory.docName}
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
									<a
										target="_blank"
										href={`https://${recordHistory.recordHash}.ipfs.w3s.link/${recordHistory.recordName}`}
									>
										View Report
									</a>
								</button>
							</div>
						);
					})}
			</div>
		</div>
	);

	const handleinput = (id) => {
		setSearchInput(id);
	};

	const fetchRecord = async () => {
		setError(false);
		if (searchInput.length > 0 && searchInput.length !== 42) {
			setError(`Enter correct User Adderess/id`);
			return;
		}
		setError(false);
		console.log(searchInput);
		const data = await fetchUserDocumentsForHospital(searchInput);
		console.log(data);
		setRecord(data);
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
			<RegisterHospital
				closeModal={closeModal}
				modalIsOpen={modalIsOpen}
			/>

			<HSidebar value="Users" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
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
				</div>

				<Container>
					{error && (
						<div role="alert">
							<div class="border border-t-1 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
								<p>{error}</p>
							</div>
						</div>
					)}
					{record && !error ? getRecords() : showEmptyRecord()}
				</Container>
			</div>
		</div>
	);
};

export default UserRecordByAdd;
