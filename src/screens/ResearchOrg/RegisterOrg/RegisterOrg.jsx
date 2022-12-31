import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { EHRContext } from "../../../Context/EHRContext";

const RegisterOrg = ({ modalIsOpen, closeModal }) => {
	const { registerOrganization } = useContext(EHRContext);

	const customStyles = {
		content: {
			top: "50%",
			left: "60%",
			right: "auto",
			bottom: "auto",
			width: "45%",
			display: "flex",
			flexDirection: "column",
			// alignItems: "center",
			// borderColor: "white",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	const [name, setName] = useState("");
	const [emailId, setEmailId] = useState("");
	const [mobileNo, setMobileNo] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerOrganization(name, emailId, mobileNo);
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
			<div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
				<div className="text-center text-2xl font-bold">Register as a Hospital</div>
				<div className="mt-4 sm:w-full sm:max-w-2xl" >
					<div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
						<form className="space-y-6 w-full" onSubmit={handleSubmit}>
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
										onChange={(e) => setName(e.target.value)}
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
										onChange={(e) => setEmailId(e.target.value)}
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
										onChange={(e) => setMobileNo(e.target.value)}
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

					</div>
				</div>
			</div>

			{/* <div>Register as a Hospital</div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email"
					value={emailId}
					onChange={(e) => setEmailId(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Mobile No"
					value={mobileNo}
					onChange={(e) => setMobileNo(e.target.value)}
				/>

				<button onClick={(e) => handleSubmit(e)}>Register</button>
			</form> */}
		</Modal>
	);
};

export default RegisterOrg;