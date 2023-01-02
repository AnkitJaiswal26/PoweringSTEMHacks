import React, { useEffect, useState, useContext, useCallback } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./Hospitals.module.css";
import { EHRContext } from "../../../Context/EHRContext";
import { useNavigate } from "react-router-dom";
import RegisterUser from "../RegisterUser/RegisterUser";
import { toast } from "react-toastify";

const Hospitals = () => {
	const {
		currentAccount,
		fetchAllHospitals,
		grantAccessToHospital,
		checkIfWalletConnected,
		removeAccessFromHospital,
		fetchUserByAddress,
	} = useContext(EHRContext);
	const [searchInput, setSearchInput] = useState("");
	const [hospitals, setHospitals] = useState([]);

	const fetchHospitals = useCallback(async (account) => {
		const hospits = await fetchAllHospitals(account);
		setHospitals(hospits);
	});

	useEffect(() => {
		checkIfWalletConnected();
	});

	useEffect(() => {
		fetchHospitals(currentAccount).catch((err) => console.log(err));
	}, [currentAccount]);

	const [modalIsOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const { checkRole } = useContext(EHRContext);
	const [user, setUser] = useState({ name: "" });

	const fetchUser = useCallback(async (account) => {
		const data = await checkRole(account);
		if (data === 0) {
			openModal(true);
		} else if (data === 2) {
			navigate("/hospital/profile");
		} else if (data === 3) {
			navigate("/org/profile");
		} else {
			console.log(account);
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

	const grantAccess = async (e, address) => {
		e.preventDefault();
		try {
			await grantAccessToHospital(address);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	const removeAccess = async (e, address) => {
		e.preventDefault();
		try {
			await removeAccessFromHospital(address);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.hospitals_wrapper}>
			<RegisterUser closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<Sidebar value="Hospitals" />
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
							// onClick={(e) => filterHospitals(e)}
						>
							Search
						</button>
					</div>
					<div className={styles.hospitalContainer}>
						<div className={styles.hospitalsGrid}>
							{hospitals &&
								hospitals.map((hospital, id) => {
									if (
										searchInput == "" ||
										hospital.hosAdd.includes(searchInput)
									) {
										return (
											<div
												key={id}
												id={id}
												className={styles.hosBox}
											>
												<div className={styles.hosName}>
													<span>{hospital.name}</span>
												</div>
												<div
													className={
														styles.hospitalDescription
													}
												>
													<b>Email Id:</b>{" "}
													{hospital.emailId}
												</div>

												<div
													className={
														styles.hospitalDescription
													}
												>
													<b>Mobile No:</b>{" "}
													{hospital.contactNo}
												</div>
												<div
													className={
														styles.hosAddress
													}
												>
													<b>Address:</b>
													<br />
													{hospital.personalAdd}
												</div>
												{hospital.access === true ? (
													<button
														className={
															styles.grantButton
														}
														onClick={(e) =>
															removeAccess(
																e,
																hospital.hosAdd
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
																hospital.hosAdd
															)
														}
													>
														Grant Access
													</button>
												)}
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

export default Hospitals;
