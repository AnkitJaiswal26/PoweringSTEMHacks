import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RSidebar from "../../../components/ReserachOrgSidebar/RSidebar";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterOrg from "../RegisterOrg/RegisterOrg";
import styles from "./OrgResearchs.module.css";

const OrgResearchs = () => {
	const {
		currentAccount,
		fetchMyResearchs,
		fetchResearchOrgByAddress,
		checkIfWalletConnected,
		checkRole,
	} = useContext(EHRContext);
	const [user, setUser] = useState({ name: "" });

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

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

	const [searchInput, setSearchInput] = useState("");
	const [researchs, setResearchs] = useState([]);
	const navigate = useNavigate();

	const fetchData = useCallback(async () => {
		console.log("hello");
		const data = await fetchMyResearchs();
		console.log(data);
		setResearchs(data);
	});

	useEffect(() => {
		fetchData();
	}, [currentAccount]);

	return (
		<div className={styles.hospitals_wrapper}>
			<RegisterOrg closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<RSidebar value="Researchs" />
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
							{researchs &&
								researchs.map((research, id) => {
									return (
										<div id={id} className={styles.hosBox}>
											<div className={styles.hosName}>
												<span>{research.name}</span>
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
												<b>Required Users:</b>{" "}
												{research.usersRequired.toNumber()}
											</div>
											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Current Users:</b>{" "}
												{research.currentUsers.toNumber()}
											</div>
											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Description:</b>{" "}
												{research &&
												research.description.length >=
													200
													? research.description.substring(
															1,
															200
													  ) + "..."
													: research.description}
											</div>
											<button
												className={styles.grantButton}
												onClick={(e) => {
													e.preventDefault();
													navigate(
														`/org/researchs/${research.id.toNumber()}`
													);
												}}
											>
												View Research
											</button>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrgResearchs;
