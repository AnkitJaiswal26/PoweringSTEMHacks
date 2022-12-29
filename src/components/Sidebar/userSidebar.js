import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import BiotechIcon from "@mui/icons-material/Biotech";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./Sidebar.module.css";
export const userSidebar = [
	{
		name: "Dashboard",
		url: "/",
		icon: <DashboardIcon className={styles.listIcon} />,
	},
	{
		name: "Hospitals",
		url: "/hospitals",
		icon: <LocalHospitalIcon className={styles.listIcon} />,
	},
	{
		name: "Past History",
		url: "/history",
		icon: <HistoryEduIcon className={styles.listIcon} />,
	},
	{
		name: "Researchs",
		url: "/researchs",
		icon: <BiotechIcon className={styles.listIcon} />,
	},
	{
		name: "Profile",
		url: "/profile",
		icon: <Person2Icon className={styles.listIcon} />,
	},
];
