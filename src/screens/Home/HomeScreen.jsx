import { Box, Container, Typography } from "@mui/material";
import Header from "./Header";
import styles from "./HomeScreen.module.css";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, quos!";

const HomeScreen = () => {
  const Footer = () => {
    return (
      <>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
          </Container>
        </Box>
      </>
    );
  };

  const CustomButton = ({ text, color = "blue" }) => {
    return (
      <button className={styles.btn} style={{ backgroundColor: `${color}` }}>
        {text}
      </button>
    );
  };

  const FeatureCard = ({ name, text, icon }) => {
    return (
      <div className={`${styles.feature_card}`}>
        <div className={styles.icon}>{icon}</div>
        <h3>{name}</h3>
        <p>{text}</p>
        <a href="#">see more..</a>
      </div>
    );
  };

  return (
    <>
      <Header />

      <section className={`${styles.container} ${styles.hero}`}>
        <h1>Reorgnize System for Healthcare</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
          sapiente ea est consequatur nesciunt doloremque incidunt, animi nulla
          corrupti veniam nostrum et accusamus repudiandae molestiae quidem esse
          atque optio sed!
        </p>
        <CustomButton text="get started now" />
      </section>

      <section className={styles.features}>
        <div className={`${styles.container}`}>
          <button>Key Features</button>
          <h3>what is PoweringSTEM?</h3>
          <p>{lorem}</p>
          <div className={`${styles.row} ${styles.features__flex}`}>
            <FeatureCard
              icon={<LocalHospitalIcon sx={{ fontSize: "80px" }} />}
              name="Hospital"
              text={lorem}
            />
            <FeatureCard
              icon={<PersonIcon sx={{ fontSize: "80px" }} />}
              name="Patient"
              text={lorem}
            />
            <FeatureCard
              icon={<PublicIcon sx={{ fontSize: "80px" }} />}
              name="Orgnization"
              text={lorem}
            />
          </div>
        </div>
      </section>

      {/* <section className={styles.info}>
        <div className={`${styles.container}`}>
          <div className={`${styles.row}`}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              dolorum.
            </p>
          </div>
        </div>
      </section> */}

      <Footer />
    </>
  );
};

export default HomeScreen;
