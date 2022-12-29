import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./PastHistory.module.css";

const Hospitals = () => {
	const [searchInput, setSearchInput] = useState("");
	const [history, setHistory] = useState([
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Blood Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",

		},
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Skin Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",
		},
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Blood Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",
		},
		{
			userAdd: "userAdd",
			hosAdd: "hosAdd",
			docName: "Dr. Ankit",
			recordName: "Hair Cancer",
			issueDate: "10/10/2022",
			testSuggested: "blood test",
		},
	]);

	const [filteredHistory, setFilteredHistory] = useState(history);


	const handleSearch = () => {
    if(searchInput.length > 0)
    {     
     const searchData= history.filter((item)=> item.recordName.toLowerCase().includes(searchInput));
     setFilteredHistory(searchData);
		 console.log(searchData,"search")
    } 
		else {
		console.log(searchInput,"searchedd")
			setFilteredHistory(history)
    }
  }

	return (
		<div className={styles.hospitals_wrapper}>
			<Sidebar value="Past History" />
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
								handleSearch();
							}}
						/>
						<button className={styles.searchButton}>Search</button>
					</div>
					<div className={styles.hospitalContainer}>
						<div className={styles.hospitalsGrid}>
							{filteredHistory &&
								filteredHistory.map((recordHistory, id) => {
									return (
										<div id={id} className={styles.hosBox}>
											<div className={styles.hosName}>
												<span>{recordHistory.recordName}</span>
											</div>
											<hr style={{ marginBottom: "10px" }}></hr>
											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Doctor Name:</b>{" "}
												{recordHistory.docName}
											</div>

											<div
												className={
													styles.hospitalDescription
												}
											>
												<b>Test Suggested:</b>{" "}
												{recordHistory.testSuggested}
											</div>
											<div className={styles.hosAddress}>
												<b>Issue Date</b>
												<br />
												{recordHistory.issueDate}
											</div>
											<button
												className={styles.grantButton}
											>
												View Report
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

export default Hospitals;
