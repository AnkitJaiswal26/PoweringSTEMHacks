import React, { useCallback, useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./Profile.module.css";

import { EHRContext } from "../../../Context/EHRContext";
import { useNavigate } from "react-router-dom";
import RegisterUser from "../RegisterUser/RegisterUser";

const ProfileScreen = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const {
		checkIfWalletConnected,
		currentAccount,
		checkRole,
		fetchUserByAddress,
	} = useContext(EHRContext);

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
				gender:
					data.gender.toNumber() === 0
						? "Male"
						: data.gender.toNumber() === 1
						? "Female"
						: "Cannot specify",
				dob: data.dob,
			});
		}
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	const [user, setUser] = useState({
		name: "",
		email: "",
		mobile: "",
		gender: 0,
		dob: "",
		pernonalAdd: "",
	});

	return (
		<div className={styles.hospitals_wrapper}>
			<RegisterUser closeModal={closeModal} modalIsOpen={modalIsOpen} />
			<Sidebar value="Profile" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
				</div>
				<div className={styles.inforWrapper}>
					<div className={styles.hospitals_search}>
						<button className={styles.searchButton} disabled>
							Profile Information
						</button>
					</div>
					<div className={styles.profileContainer}>
						{Object.keys(user).map((key, index) => (
							<div key={index}>
								<div className={styles.profileRow}>
									<h4 className={styles.title}>
										{key.toLocaleUpperCase()} :
									</h4>
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

export default ProfileScreen;
