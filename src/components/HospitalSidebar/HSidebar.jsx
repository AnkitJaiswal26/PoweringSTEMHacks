import React from "react";
import { Link } from "react-router-dom";
import { hosSidebar } from "./hosSidebar";
import styles from "./Sidebar.module.css";

const HSidebar = ({ value }) => {
	return (
		<div className={styles.sidebar_wrapper}>
			<div className={styles.logoDiv}>EHRecord</div>
			<hr className="bg-gray-200 border-0" />

			<div>
				<ul className={styles.sidebarList}>
					{hosSidebar.map((item, index) => {
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

export default HSidebar;
