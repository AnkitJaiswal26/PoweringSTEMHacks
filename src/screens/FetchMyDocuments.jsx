import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { EHRContext } from "../Context/EHRContext";
import { CardHeader } from "@mui/material";
import styles from "./Hospitals/Hospitals.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
export default () => {
    const [myDocuments, setMyDocuments] = useState([
        {   
            hosAdd: "hosAdd" ,
            userAdd: "userAdd",
            docName: "Venugopal Ayyar",
            recordHash: "Chinnaswammi",
            recordName: "muttuswami",
            issueDate: "Trichipalli",
            testSuggested: "Goa jao",
		},
        {   
            hosAdd: "hosAdd" ,
            userAdd: "userAdd",
            docName: "Venugopal Ayyar",
            recordHash: "Chinnaswammi",
            recordName: "muttuswami",
            issueDate: "Trichipalli",
            testSuggested: "Goa jao",
		},
        {   
            hosAdd: "hosAdd" ,
            userAdd: "userAdd",
            docName: "Venugopal Ayyar",
            recordHash: "Chinnaswammi",
            recordName: "muttuswami",
            issueDate: "Trichipalli",
            testSuggested: "Goa jao",
		},
        {   
            hosAdd: "hosAdd" ,
            userAdd: "userAdd",
            docName: "Venugopal Ayyar",
            recordHash: "Chinnaswammi",
            recordName: "muttuswami",
            issueDate: "Trichipalli",
            testSuggested: "Goa jao",
		},
        {   
            hosAdd: "hosAdd" ,
            userAdd: "userAdd",
            docName: "Venugopal Ayyar",
            recordHash: "Chinnaswammi",
            recordName: "muttuswami",
            issueDate: "Trichipalli",
            testSuggested: "Goa jao",
		},
    ]);
	const [searchInput, setSearchInput] = useState("");
    const { fetchMyDocuments, createNewRecord } = useContext(EHRContext);
    const fetchDocuments = async () => {
        const docs = await fetchMyDocuments();
        console.log(docs[0].docName);
        setMyDocuments(docs);
        console.log(docs);
    }
    // const docElements = myDocuments.map(doc => (
    //     <Card sx={{ minWidth: 275 }}>
    //         <CardHeader
    //             title={doc.hosAdd}
    //             subheader={doc.docName}
    //         />
    //         <CardContent>
    //             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                 Record
    //             </Typography>
    //             <Typography component="div">
                    
    //             </Typography>
    //             <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //                 doc.docName
    //             </Typography>
    //             <Typography variant="body2">
    //                 well meaning and kindly.
    //                 <br />
    //                 {'"a benevolent smile"'}
    //             </Typography>
    //         </CardContent>
    //         <CardActions>
    //             <Button size="small">Learn More</Button>
    //         </CardActions>
    //     </Card>
    // ))
    const userAdd = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const docName = 'doctor who';
    const recordHash = 'hash this';
    const recordName = 'name of record';
    const issueDate = 122334;
    const testSuggested = 'string this test';
    const createRecord = () => {
        createNewRecord(userAdd, docName, recordHash, recordName, issueDate, testSuggested);
    }
    const filterHospitals = (e) => {
		console.log("button isn't required")

	}
	return (
		<div className={styles.hospitals_wrapper}>
			<Sidebar value="Profiles" />
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
						<button className={styles.searchButton} onClick={(e) => filterHospitals(e)}>Search</button>
					</div>
					<div className={styles.hospitalContainer}>
						<div className={styles.hospitalsGrid}>
							{myDocuments &&
								myDocuments.map((hospital, id) => {
									if (searchInput == "" || hospital.hosAdd.includes(searchInput)) {
										return (
											<div key={id} id={id} className={styles.hosBox}>
												<div className={styles.hosName}>
													<span>{hospital.docName}</span>
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
												<div className={styles.hosAddress}>
													<b>Address:</b>
													<br />
													{hospital.personalAdd}
												</div>
												<button
													className={styles.grantButton}
												>
													Grant Access
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
}