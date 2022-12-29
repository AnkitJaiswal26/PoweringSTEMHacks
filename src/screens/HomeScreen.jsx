import { Container ,typography} from "@mui/system";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomeScreen = () => {
    return (<>
        <Header />
        <Container>
            <h3>Body goes here...</h3>
        </Container>
        <Footer />
    </>);
}

export default HomeScreen;