import { AccountBoxSharp } from "@mui/icons-material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RSidebar from "../../../components/ReserachOrgSidebar/RSidebar";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterOrg from "../RegisterOrg/RegisterOrg";
import styles from "./Research.module.css";

const OrgResearch = () => {
	const [researchId, setResearchId] = useState(null);

	const {
		currentAccount,
		checkIfWalletConnected,
		fetchResearchById,
		fetchResearchOrgByAddress,
	} = useContext(EHRContext);
	const [user, setUser] = useState({ name: "" });

	const [modalIsOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const { checkRole, fetchAllUserDocForResearch } = useContext(EHRContext);

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
		} else if (data === 2) {
			navigate("/hospital/profile");
		} else {
			const data = await fetchResearchOrgByAddress(account);
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

	useEffect(() => {
		checkIfWalletConnected();
	});

	const [research, setResearch] = useState({
		orgAdd: "orgadd",
		name: "Research Paper",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
		cid: "cid",
	});

	const [documents, setDocuments] = useState([]);

	const fetchData = useCallback(async (researchId) => {
		const data = await fetchResearchById(parseInt(researchId));
		setResearch(data);

		const newData = await fetchAllUserDocForResearch(researchId);
		setDocuments(newData);
	});

	useEffect(() => {
		const researchId = window.location.pathname.split("/")[3];
		fetchData(researchId).catch((err) => console.log(err));

		setResearchId(window.location.pathname.split("/")[2]);
	}, []);

	return (
		<div className={styles.researchs_wrapper}>
			<RegisterOrg closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<RSidebar value="Researchs" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
				</div>
				{research && (
					<div className={styles.content}>
						<div className={styles.researchContainer}>
							<div className={styles.researchDetailsContainer}>
								<h3 className={styles.researchName}>
									{research.name}
								</h3>
								<p className={styles.researchDescription}>
									Users required:{" "}
									{research?.usersRequired?.toNumber()}
								</p>
								<p className={styles.researchDescription}>
									Current Users:{" "}
									{research?.currentUsers?.toNumber()}
								</p>
								<p className={styles.researchDescription}>
									<b>Description: </b>
									{research.description}
								</p>
							</div>
							<div className={styles.researchImage}>
								<img
									src={`https://${research.cid}.ipfs.w3s.link/${research.cidName}`}
									alt="reserachImage"
								/>
							</div>
						</div>
						<div className={styles.hospitalContainer}>
							<h3 className={styles.heading}>User Documents</h3>
							<div className={styles.hospitalsGrid}>
								{documents &&
									documents.map((doc, id) => {
										console.log(doc);
										return (
											<div
												id={id}
												className={styles.hosBox}
											>
												<div className={styles.hosName}>
													<span>
														{doc.recordName}
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
													{doc.docName}
												</div>

												<div
													className={
														styles.hospitalDescription
													}
												>
													<b>Test Suggested:</b>{" "}
													{doc.testSuggested}
												</div>
												<div
													className={
														styles.hosAddress
													}
												>
													<b>Issue Date</b>
													<br />
													{doc.issueDate}
												</div>
												<button
													className={
														styles.grantButton
													}
												>
													<a
														target="_blank"
														href={`https://${doc.recordHash}.ipfs.w3s.link/${doc.recordName}`}
													>
														View Report
													</a>
												</button>
											</div>
										);
									})}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrgResearch;
