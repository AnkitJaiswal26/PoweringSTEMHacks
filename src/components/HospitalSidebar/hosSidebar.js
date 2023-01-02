import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import BiotechIcon from "@mui/icons-material/Biotech";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./Sidebar.module.css";
export const hosSidebar = [
	{
		name: "New Record",
		url: "/createNewRecord",
		icon: <LocalHospitalIcon className={styles.listIcon} />,
	},
	{
		name: "Past History",
		url: "/hospital/history",
		icon: <HistoryEduIcon className={styles.listIcon} />,
	},
	{
		name: "Users",
		url: "/hospital/users",
		icon: <BiotechIcon className={styles.listIcon} />,
	},
	{
		name: "Profile",
		url: "/hospital/profile",
		icon: <Person2Icon className={styles.listIcon} />,
	},
];
