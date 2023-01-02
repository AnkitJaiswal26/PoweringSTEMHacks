import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import BiotechIcon from "@mui/icons-material/Biotech";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./Sidebar.module.css";
export const userSidebar = [
	{
		name: "Hospitals",
		url: "/user/hospitals",
		icon: <LocalHospitalIcon className={styles.listIcon} />,
	},
	{
		name: "Past History",
		url: "/user/history",
		icon: <HistoryEduIcon className={styles.listIcon} />,
	},
	{
		name: "Researchs",
		url: "/user/researchs",
		icon: <BiotechIcon className={styles.listIcon} />,
	},
	{
		name: "Profile",
		url: "/user/profile",
		icon: <Person2Icon className={styles.listIcon} />,
	},
];
