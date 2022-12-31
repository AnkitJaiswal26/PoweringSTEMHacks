import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { EHRContext } from "../../../Context/EHRContext";

const RegisterOrg = ({ modalIsOpen, closeModal }) => {
	const { registerOrganization } = useContext(EHRContext);

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			width: "700px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
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
			<div>Register as a Hospital</div>
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
			</form>
		</Modal>
	);
};

export default RegisterOrg;
