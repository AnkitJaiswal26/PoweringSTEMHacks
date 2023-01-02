import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./NewRecord.module.css";
import HSidebar from "../../../components/HospitalSidebar/HSidebar";
import { useNavigate } from "react-router-dom";
import RegisterHospital from "../RegisterHospital/RegisterHospital";

const NewRecord = () => {
	const {
		createNewRecord,
		uploadFilesToIPFS,
		checkIfWalletConnected,
		fetchHospitalByAddress,
		currentAccount,
		checkRole,
	} = useContext(EHRContext);
	const [user, setUser] = useState({ name: "" });

	const [modalIsOpen, setIsOpen] = useState(false);

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
				mobileNo: data.mobileNo,
				personalAdd: data.personalAdd,
			});
		}
	});

	useEffect(() => {
		fetchUser(currentAccount);
	}, [currentAccount]);

	const uploadRecord = useRef(null);

	const [recordName, setRecordName] = useState("");
	const [docName, setDocName] = useState("");
	const [recordFile, setRecordFile] = useState(null);
	const [patientAddress, setPatientAddress] = useState("");
	const [testSuggested, setTestSuggested] = useState("");

	const handlePosterUploadImage = (e) => {
		e.preventDefault();
		uploadRecord.current.click();
	};

	const handlePosterFileChange = (e) => {
		setRecordName(e.target.files[0].name);
		setRecordFile(e.target.files);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("Hello");
		try {
			const cid = await uploadFilesToIPFS(recordFile);
			console.log(cid);
			await createNewRecord(
				patientAddress,
				docName,
				cid,
				recordName,
				String(new Date()),
				testSuggested
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.dashboard_wrapper}>
			<RegisterHospital
				closeModal={closeModal}
				modalIsOpen={modalIsOpen}
			/>
			<HSidebar value="New Record" />

			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
				</div>

				<div className="min-h-fit mt-3 mb-1 flex flex-col justify-center sm:px-6 lg:px-8">
					<div className="text-center text-2xl font-bold">
						Create a new Record
					</div>
					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg">
						<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
							<form
								className="space-y-6"
								action="#"
								method="POST"
								onSubmit={handleSubmit}
							>
								{/* patient address  */}
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700"
									>
										Patient address
									</label>
									<div className="mt-1">
										<input
											id="name"
											name="name"
											type="text"
											autoComplete="name"
											required
											value={patientAddress}
											onChange={(e) =>
												setPatientAddress(
													e.target.value
												)
											}
											placeholder="Enter Patient address"
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
										/>
									</div>
								</div>
								{/* doctor address  */}
								<div>
									<label
										htmlFor="dname"
										className="block text-sm font-medium text-gray-700"
									>
										Doctor Name
									</label>
									<div className="mt-1">
										<input
											id="dname"
											name="dname"
											type="text"
											placeholder="Enter doctor Name"
											value={docName}
											onChange={(e) =>
												setDocName(e.target.value)
											}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
										/>
									</div>
								</div>
								{/* report file  */}
								<div>
									<label
										htmlFor="formFile"
										className="block text-sm font-medium text-gray-700"
									>
										Upload Report
									</label>
									<div className="mt-1">
										<input
											type="file"
											id="formFile"
											onChange={handlePosterFileChange}
											className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
										/>
									</div>
								</div>
								{/* text suggested  */}
								<div>
									<label
										htmlFor="dname"
										className="block text-sm font-medium text-gray-700"
									>
										Test suggested
									</label>
									<div className="mt-1">
										<textarea
											id="dname"
											name="dname"
											type="text"
											placeholder="Prescribe the test"
											value={testSuggested}
											onChange={(e) =>
												setTestSuggested(e.target.value)
											}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
										/>
									</div>
								</div>
								{/* submit  */}
								<div>
									<button
										type="submit"
										onClick={handleSubmit}
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										Create
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewRecord;
