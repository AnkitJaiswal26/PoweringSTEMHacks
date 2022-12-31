import React, { useContext, useEffect, useRef, useState } from "react";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./NewRecord.module.css";
import HSidebar from "../../../components/HospitalSidebar/HSidebar";

const NewRecord = () => {
	const { createNewRecord, uploadFilesToIPFS, checkIfWalletConnected } =
		useContext(EHRContext);

	useEffect(() => {
		checkIfWalletConnected();
	});

	const uploadRecord = useRef(null);

	const [recordName, setRecordName] = useState("");
	const [docName, setDocName] = useState("");
	const [recordFile, setRecordFile] = useState(null);
	const [patientAddress, setPatientAddress] = useState("");
	const [testSuggested, setTestSuggested] = useState("");

	const handlePosterUploadImage = (e) => {
		e.preventDefault();
		uploadRecord.current.click();
	};

	const handlePosterFileChange = (e) => {
		setRecordName(e.target.files[0].name);
		setRecordFile(e.target.files);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("Hello");
		try {
			const cid = await uploadFilesToIPFS(recordFile);
			console.log(cid);
			await createNewRecord(
				patientAddress,
				docName,
				cid,
				recordName,
				String(new Date()),
				testSuggested
			);
		} catch (err) {
			console.log(err);
		}
	};
	let button;

	return (
		<div className={styles.dashboard_wrapper}>
			<HSidebar value="NewRecord" />
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
				<div>
					<div className={`${styles.contentBox}`}>
						<h2>Create a new Record</h2>
					</div>
					<div className={`${styles.formBox}`}>
						<form onSubmit={handleSubmit}>
							<h2 className={`${styles.heading}`}>
								Fill Details
							</h2>

							<div className={styles.inputGroup}>
								<label className={`${styles.inputLabel}`}>
									Patient address
								</label>
								<input
									className={styles.input}
									type="text"
									placeholder="Enter patient address"
									value={patientAddress}
									onChange={(e) =>
										setPatientAddress(e.target.value)
									}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label className={`${styles.inputLabel}`}>
									Doctor name
								</label>
								<input
									className={styles.input}
									type="text"
									placeholder="Enter patient address"
									value={docName}
									onChange={(e) => setDocName(e.target.value)}
								/>
							</div>
							<div className={styles.inputGroupLast}>
								<label className={`${styles.inputLabel}`}>
									Upload Report
								</label>
								<button
									onClick={handlePosterUploadImage}
									className={styles.inputCombined}
								></button>
								<input
									onChange={handlePosterFileChange}
									className={` ${styles.fileInput}`}
									type="file"
									placeholder={""}
								/>
							</div>

							<div className={styles.both}>
								<div className={`${styles.inputContainer}`}>
									<label className={`${styles.inputLabel}`}>
										Test suggested
									</label>
									<input
										className={styles.inputCombined}
										type="text"
										placeholder="Prescribe the test "
										value={testSuggested}
										onChange={(e) =>
											setTestSuggested(e.target.value)
										}
									/>
								</div>
							</div>

							<div className={styles.button}>
								<a
									className={styles.anchor}
									onClick={handleSubmit}
									href="/"
								>
									<span className="ml-4">Create</span>
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewRecord;
