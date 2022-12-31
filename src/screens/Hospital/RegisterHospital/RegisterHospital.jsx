import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { EHRContext } from "../../../Context/EHRContext";

const RegisterHospital = ({ modalIsOpen, closeModal }) => {
	const { registerHospital } = useContext(EHRContext);

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
	const [personalAdd, setPersonalAdd] = useState("");
	const [emailId, setEmailId] = useState("");
	const [mobileNo, setMobileNo] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerHospital(name, personalAdd, emailId, mobileNo);
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
				<input
					type="text"
					placeholder="Address"
					value={personalAdd}
					onChange={(e) => setPersonalAdd(e.target.value)}
				/>

				<button onClick={(e) => handleSubmit(e)}>Register</button>
			</form>
		</Modal>
	);
};

export default RegisterHospital;
