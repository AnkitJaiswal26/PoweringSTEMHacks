import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { EHRContext } from "../../../Context/EHRContext";
import styles from "./NewResearch.module.css";
import RSidebar from "../../../components/ReserachOrgSidebar/RSidebar";
import { useNavigate } from "react-router-dom";

const NewResearch = () => {
	const {
		createNewResearch,
		checkRole,
		currentAccount,
		fetchResearchOrgByAddress,
		uploadFilesToIPFS,
		checkIfWalletConnected,
	} = useContext(EHRContext);

	const [user, setUser] = useState({ name: "" });

	useEffect(() => {
		checkIfWalletConnected();
	});

	const uploadRecord = useRef(null);

	const [fileName, setFileName] = useState("");
	const [description, setDescription] = useState("");
	const [researchFile, setResearchFile] = useState(null);
	const [researchName, setResearchName] = useState("");
	const [usersRequired, setUsersRequired] = useState(0);

	const handlePosterUploadImage = (e) => {
		e.preventDefault();
		uploadRecord.current.click();
	};

	const handlePosterFileChange = (e) => {
		setFileName(e.target.files[0].name);
		setResearchFile(e.target.files);
	};

	const navigate = useNavigate();
	const [modalIsOpen, setIsOpen] = useState(false);

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("Hello");
		try {
			const cid = await uploadFilesToIPFS(researchFile);
			console.log(cid);

			await createNewResearch(
				researchName,
				description,
				cid,
				fileName,
				usersRequired
			);
		} catch (err) {
			console.log(err);
		}
	};
	let button;

	return (
		<div className={styles.dashboard_wrapper}>
			<RSidebar value="New Research" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome {user.name}!</h3>
				</div>
				<div className="min-h-fit mt-10 mb-1 flex flex-col justify-center sm:px-6 lg:px-8">
					<div className="text-center text-2xl font-bold">
						Create New Research
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
										Research Title
									</label>
									<div className="mt-1">
										<input
											id="name"
											name="name"
											type="text"
											autoComplete="name"
											required
											value={researchName}
											onChange={(e) =>
												setResearchName(e.target.value)
											}
											placeholder="Enter Research Title"
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
										/>
									</div>
								</div>
								{/* doctor address  */}
								<div>
									<label
										htmlFor="dname"
										className="block text-sm font-medium text-gray-700"
									>
										Description
									</label>
									<div className="mt-1">
										<textarea
											id="dname"
											name="dname"
											type="text"
											placeholder="Describe about your research, its requirements, etc"
											value={description}
											onChange={(e) =>
												setDescription(e.target.value)
											}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
										/>
									</div>
								</div>
								{/* report file  */}
								<div>
									<label
										htmlFor="formFile"
										className="block text-sm font-medium text-gray-700"
									>
										Upload Poster
									</label>
									<div className="mt-1">
										<input
											type="file"
											id="formFile"
											accept="image/*"
											onChange={handlePosterFileChange}
											className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700"
									>
										Minimum users required
									</label>
									<div className="mt-1">
										<input
											id="name"
											name="name"
											type="number"
											autoComplete="name"
											required
											value={usersRequired}
											onChange={(e) =>
												setUsersRequired(e.target.value)
											}
											placeholder="Enter the no of users required"
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
										/>
									</div>
								</div>
								{/* submit  */}
								<div>
									<button
										type="submit"
										onClick={handleSubmit}
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

export default NewResearch;
