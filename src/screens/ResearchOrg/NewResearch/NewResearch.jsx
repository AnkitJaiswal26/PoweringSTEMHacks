import React, { useContext, useEffect, useRef, useState } from "react";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./NewResearch.module.css";
import RSidebar from "../../../components/ReserachOrgSidebar/RSidebar";

const NewResearch = () => {
	const { createNewResearch, uploadFilesToIPFS, checkIfWalletConnected } =
		useContext(EHRContext);

	useEffect(() => {
		checkIfWalletConnected();
	});

	const uploadRecord = useRef(null);

	const [recordName, setRecordName] = useState("");
	const [description, setDescription] = useState("");
	const [researchFile, setResearchFile] = useState(null);
	const [researchName, setResearchName] = useState("");
	const [testSuggested, setTestSuggested] = useState("");

	const handlePosterUploadImage = (e) => {
		e.preventDefault();
		uploadRecord.current.click();
	};

	const handlePosterFileChange = (e) => {
		setRecordName(e.target.files[0].name);
		setResearchFile(e.target.files);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("Hello");
		try {
			console.log(researchFile);
			// const myRenamedFile = new File([researchFile[0]]/, "mainImage.jpg");
			// console.log(myRenamedFile);
			const cid = await uploadFilesToIPFS(researchFile);
			console.log(cid);

			await createNewResearch(researchName, description, cid);
		} catch (err) {
			console.log(err);
		}
	};
	let button;

	return (
		<div className={styles.dashboard_wrapper}>
			<RSidebar value="NewResearch" />
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
						<h2>Create a new Research</h2>
					</div>
					<div className={`${styles.formBox}`}>
						<form onSubmit={handleSubmit}>
							<h2 className={`${styles.heading}`}>
								Fill Details
							</h2>

							<div className={styles.inputGroup}>
								<label className={`${styles.inputLabel}`}>
									Research Name
								</label>
								<input
									className={styles.input}
									type="text"
									placeholder="Enter Research Name"
									value={researchName}
									onChange={(e) =>
										setResearchName(e.target.value)
									}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label className={`${styles.inputLabel}`}>
									Description
								</label>
								<textarea
									className={styles.input}
									type="text"
									placeholder="Enter description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								></textarea>
							</div>
							<div className={styles.inputGroupLast}>
								<label className={`${styles.inputLabel}`}>
									Upload Research Poster
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

export default NewResearch;
