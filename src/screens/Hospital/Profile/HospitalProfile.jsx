import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";

import HSidebar from "../../../components/HospitalSidebar/HSidebar";
import { useNavigate } from "react-router-dom";
import { EHRContext } from "../../../Context/EHRContext";
import RegisterHospital from "../RegisterHospital/RegisterHospital";

const HospitalProfileScreen = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();
	const [user, setUser] = useState({
		hosAdd: "",
		name: "",
		emailId: "",
		mobileNo: "",
		personalAdd: "",
	});

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const {
		checkIfWalletConnected,
		fetchHospitalByAddress,
		currentAccount,
		checkRole,
	} = useContext(EHRContext);

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
				mobileNo: data.contactNo,
				personalAdd: data.personalAdd,
			});
		}
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	return (
		<div className={styles.hospitals_wrapper}>
			<RegisterHospital
				closeModal={closeModal}
				modalIsOpen={modalIsOpen}
			/>
			<HSidebar value="Profile" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
				</div>
				<div className={styles.inforWrapper}>
					<div className={styles.hospitals_search}>
						<button className={styles.searchButton} disabled>
							Hospital Information
						</button>
					</div>
					<div className={styles.profileContainer}>
						{Object.keys(user).map((key, index) => (
							<div keys={index}>
								<div className={styles.profileRow}>
									<h4 className={styles.title}>
										{key.toLocaleUpperCase()}{" "}
									</h4>
									<p>:</p>
									<p className={styles.text}>{user[key]}</p>
								</div>
								<hr className={styles.horizontal} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HospitalProfileScreen;
