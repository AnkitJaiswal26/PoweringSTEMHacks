import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import BiotechIcon from "@mui/icons-material/Biotech";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./Sidebar.module.css";
export const orgSidebar = [
	{
		name: "New Research",
		url: "/createNewResearch",
		icon: <LocalHospitalIcon className={styles.listIcon} />,
	},
	{
		name: "Researchs",
		url: "/org/researchs",
		icon: <HistoryEduIcon className={styles.listIcon} />,
	},
	{
		name: "Profile",
		url: "/org/profile",
		icon: <Person2Icon className={styles.listIcon} />,
	},
];
