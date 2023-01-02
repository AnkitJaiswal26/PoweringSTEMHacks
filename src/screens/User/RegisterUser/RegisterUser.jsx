import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { EHRContext } from "../../../Context/EHRContext";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PublicIcon from "@mui/icons-material/Public";

const RegisterUser = ({ modalIsOpen, closeModal }) => {
	const { registerUser } = useContext(EHRContext);

	const customStyles = {
		content: {
			top: "50%",
			left: "60%",
			right: "auto",
			bottom: "auto",
			width: "45%",
			display: "flex",
			flexDirection: "column",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	const [name, setName] = useState("");
	const [personalAdd, setPersonalAdd] = useState("");
	const [emailId, setEmailId] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [gender, setGender] = useState(0);
	const [dob, setDOB] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		toast.success("Trying to register!");
		try {
			await registerUser(
				name,
				personalAdd,
				emailId,
				mobileNo,
				gender,
				dob
			);
			toast.success("Registration successfull!");
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Register"
		>
			<div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
				<div className="text-center text-2xl font-bold">
					Register as a User
				</div>
				<div className="mt-4 sm:w-full sm:max-w-2xl">
					<div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
						<form
							className="space-y-6 w-full"
							onSubmit={handleSubmit}
						>
							<div className="w-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<div className="mt-1 w-full">
									<input
										id="name"
										type="text"
										placeholder="Name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										type="text"
										placeholder="Email"
										value={emailId}
										onChange={(e) =>
											setEmailId(e.target.value)
										}
										id="email"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Mobile Number
								</label>
								<div className="mt-1">
									<input
										id="password"
										type="text"
										placeholder="Mobile No"
										value={mobileNo}
										onChange={(e) =>
											setMobileNo(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<div style={{ width: "45%" }}>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Gender
									</label>
									<div className="mt-1">
										<select
											value={gender}
											onChange={(e) => {
												setGender(e.target.value);
											}}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										>
											<option value={0}>Male</option>
											<option value={1}>Female</option>
											<option value={2}>
												Cannot specify
											</option>
										</select>
									</div>
								</div>

								<div style={{ width: "45%" }}>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										dob
									</label>
									<div className="mt-1">
										<input
											id="password"
											type="date"
											placeholder="DOB"
											value={dob}
											onChange={(e) =>
												setDOB(e.target.value)
											}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										/>
									</div>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									address
								</label>
								<div className="mt-1">
									<input
										id="password"
										type="text"
										placeholder="Address"
										value={personalAdd}
										onChange={(e) =>
											setPersonalAdd(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Register
								</button>
							</div>
						</form>
						<div className="mt-1">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300" />
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white text-gray-500">
										Or continue with
									</span>
								</div>
							</div>
							<div className="mt-6 grid grid-cols-2 gap-3">
								<div>
									<a
										href="/org/profile"
										className="w-full inline-flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm bg-white text-sm font-medium text-red-500 hover:bg-red-50"
									>
										<PublicIcon />{" "}
										<span className="px-1 text-base">
											Orgnization
										</span>
									</a>
								</div>
								<div>
									<a
										href="/hospital/profile"
										className="w-full inline-flex justify-center py-2 px-4 border border-green-300 rounded-md shadow-sm bg-white text-sm font-medium text-green-500 hover:bg-green-50"
									>
										<LocalHospitalIcon />{" "}
										<span className="px-1 text-base">
											Hospital
										</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default RegisterUser;
