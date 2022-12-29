import { Container } from "@mui/system";
import Sidebar from "../components/Sidebar/Sidebar";

const HomeScreen = () => {
	return (
		<>
			<Sidebar />
			{/* <Header /> */}
			<Container>
				<h3>Body goes here...</h3>
			</Container>
		</>
	);
};

export default HomeScreen;
