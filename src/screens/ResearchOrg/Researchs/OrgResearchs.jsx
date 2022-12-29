import React, { useState } from "react";
import RSidebar from "../../../components/ReserachOrgSidebar/RSidebar";
import styles from "./OrgResearchs.module.css";

const OrgResearchs = () => {
	const [searchInput, setSearchInput] = useState("");
	const [researchs, setResearchs] = useState([
		{
			id: "id",
			orgAdd: "orgAdd",
			name: "Cancer Resesarch",
			description: "Cancer resolving till 2027 lorem espsum espsume espsum espsume espsum espsume spsume spsum espsum",
		},
		{
			id: "id",
			orgAdd: "orgAdd",
			name: "Skin Resesarch",
			description: "Cancer resolving till 2027 lorem espsum espsume espsum espsume espsum espsume spsume spsum espsum",
		},
		{
			id: "id",
			orgAdd: "orgAdd",
			name: "Cancer Resesarch",
			description: "Cancer resolving till 2027 lorem espsum espsume espsum espsume espsum espsume spsume spsum espsum",
		},
		{
			id: "id",
			orgAdd: "orgAdd",
			name: "Cancer Resesarch",
			description: "Cancer resolving till 2027 lorem espsum espsume espsum espsume espsum espsume spsume spsum espsum",
		},
	]);

	return (
		<div className={styles.hospitals_wrapper}>
			<RSidebar value="Researchs" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					<button className={styles.connectButton}>
						Connect Wallet
					</button>
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
									if (
										searchInput == "" ||
										research.recordName
											.toLowerCase()
											.includes(searchInput)
									) {
										return (
											<div
												id={id}
												className={styles.hosBox}
											>
												<div className={styles.hosName}>
													<span>
														{
															research.name
														}
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
													<b>Research id:</b>{" "}
													{research.id}
												</div>
												
												<div
													className={
														styles.hospitalDescription
													}
												>
													<b>Description:</b>{" "}
													{
														research.description
													}
												</div>
												<button
													className={
														styles.grantButton
													}
												>
													View Research
												</button>
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

export default OrgResearchs;
