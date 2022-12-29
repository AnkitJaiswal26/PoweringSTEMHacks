import React from "react";
import { Link } from "react-router-dom";
import { userSidebar } from "./userSidebar";
import styles from "./Sidebar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = ({ value }) => {
	console.log(value);
	return (
		<div className={styles.sidebar_wrapper}>
			<div className={styles.logoDiv}>EHRecord</div>
			<hr className="bg-gray-200 border-0" />

			<div>
				<ul className={styles.sidebarList}>
					{userSidebar.map((item, index) => {
						console.log(item.name, item.name === value);
						return (
							<li key={item.name}>
								<div
									className={`${
										item.name === value ? styles.active : ""
									}`}
								>
									{item.icon}
									<Link to={item.url}>{item.name}</Link>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
