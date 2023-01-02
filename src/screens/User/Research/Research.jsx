import { AccountBoxSharp } from "@mui/icons-material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterUser from "../RegisterUser/RegisterUser";
import styles from "./Research.module.css";

const Research = () => {
	const [user, setUser] = useState({ name: "" });
	const [modalIsOpen, setIsOpen] = useState(false);
	const {
		checkIfWalletConnected,
		currentAccount,
		fetchUserByAddress,
		hasUserRecordAccessForResearch,
		fetchResearchById,
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
			navigate("/hospital/profile");
		} else if (data === 3) {
			navigate("/org/profile");
		} else {
			const data = await fetchUserByAddress(account);
			setUser({
				userAdd: data.userAdd,
				name: data.name,
				emailId: data.emailId,
				mobileNo: data.mobileNo,
				personalAdd: data.personalAdd,
				gender: data.gender.toNumber(),
				dob: data.dob,
			});
		}
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	const [researchId, setResearchId] = useState(null);

	const [research, setResearch] = useState({});

	const fetchData = useCallback(async (researchId) => {
		console.log("Hello");
		const data = await fetchResearchById(parseInt(researchId));
		if (data && currentAccount) {
			console.log(data);
			const access = await hasUserRecordAccessForResearch(
				currentAccount,
				researchId
			);
			setResearch({ ...data, access });
		} else {
			setResearch(null);
		}
	});

	useEffect(() => {
		const researchId = window.location.pathname.split("/")[2];
		fetchData(researchId).catch((err) => console.log(err));

		setResearchId(window.location.pathname.split("/")[2]);
	}, []);

	return (
		<div className={styles.researchs_wrapper}>
			<RegisterUser closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<Sidebar value="Researchs" />
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
									{research.description}
								</p>
							</div>
							<div className={styles.researchImage}>
								<img
									src={`https://${research.cid}.ipfs.w3s.link/${research.cidName}`}
									alt="reserachImage"
								/>
								{research.access === true ? (
									<button className={styles.grantButton}>
										Remove Access
									</button>
								) : (
									<button className={styles.grantButton}>
										Grant Access
									</button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Research;
