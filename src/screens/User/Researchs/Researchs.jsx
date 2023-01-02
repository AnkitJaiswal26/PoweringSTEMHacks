import React, { useCallback, useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./Researchs.module.css";
import { useNavigate } from "react-router-dom";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterUser from "../RegisterUser/RegisterUser";

const Researchs = () => {
	const [user, setUser] = useState({ name: "" });

	const {
		fetchAllResearchs,
		grantAccessToResearch,
		removeAccessFromResearch,
		fetchUserByAddress,
	} = useContext(EHRContext);

	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const { checkIfWalletConnected, currentAccount, checkRole } =
		useContext(EHRContext);

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

	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();
	const [researchs, setResearchs] = useState([]);

	const [filteredData, setFilteredData] = useState(researchs);

	const fetchRecords = useCallback(async (account) => {
		const data = await fetchAllResearchs(account);
		console.log(data);
		setResearchs(data);
		setFilteredData(data);
	});
	useEffect(() => {
		fetchRecords(currentAccount).catch((err) => console.log(err));
	}, [currentAccount]);

	const grantAccess = async (e, id) => {
		e.preventDefault();
		try {
			await grantAccessToResearch(parseInt(id));
		} catch (err) {
			console.log(err);
		}
	};

	const removeAccess = async (e, id) => {
		e.preventDefault();
		try {
			await removeAccessFromResearch(parseInt(id));
		} catch (err) {
			console.log(err);
		}
	};

	const setFilter = () => {
		if (searchInput === "") {
			console.log("sdfkjl");
			setFilteredData(researchs);
		} else {
			setFilteredData(
				researchs.filter((item) => {
					return item.orgAdd === searchInput;
				})
			);
		}
	};

	return (
		<div className={styles.researchs_wrapper}>
			<RegisterUser closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<Sidebar value="Researchs" />
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
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button
							className={styles.searchButton}
							onClick={(e) => setFilter()}
						>
							Search
						</button>
					</div>
					<div className={styles.hospitalContainer}>
						<div className={styles.hospitalsGrid}>
							{filteredData &&
								filteredData.map((research, id) => {
									return (
										<div key={id} className={styles.hosBox}>
											<div
												className={styles.hosName}
												onClick={(e) => {
													navigate(
														`/researchs/${research.id}`
													);
												}}
											>
												<span>{research.name}</span>
											</div>
											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Required Users:</b>{" "}
												{research.usersRequired}
											</div>
											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Current Users:</b>{" "}
												{research.currentUsers}
											</div>
											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Description:</b> <br />
												{research.description.length >=
												200
													? research.description.substring(
															1,
															200
													  ) + "..."
													: research.description}
											</div>
											{research.access === true ? (
												<button
													className={
														styles.grantButton
													}
													onClick={(e) =>
														removeAccess(
															e,
															research.id
														)
													}
												>
													Remove Access
												</button>
											) : (
												<button
													className={
														styles.grantButton
													}
													onClick={(e) =>
														grantAccess(
															e,
															research.id
														)
													}
												>
													Grant Access
												</button>
											)}
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

export default Researchs;
