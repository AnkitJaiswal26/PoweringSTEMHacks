import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Researchs.module.css";
import { useNavigate } from "react-router-dom";

const Researchs = () => {
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();
	const [researchs, setResearchs] = useState([
		{
			id: 1,
			orgAdd: "orgadd",
			name: "Research Paper",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
			cid: "cid",
		},
		{
			id: 2,
			orgAdd: "orgadd",
			name: "Research Paper",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
			cid: "cid",
		},
		{
			id: 3,
			orgAdd: "orgadd",
			name: "Research Paper",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
			cid: "cid",
		},
		{
			id: 4,
			orgAdd: "orgadd",
			name: "Research Paper",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
			cid: "cid",
		},
	]);

	const [filteredData, setFilteredData] = useState(researchs);

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
			<Sidebar value="Researchs" />
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
												<b>Description:</b> <br />
												{research.description.length >=
												200
													? research.description.substring(
															1,
															200
													  ) + "..."
													: research.description}
											</div>
											<button
												className={styles.grantButton}
											>
												Grant Access
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

export default Researchs;
