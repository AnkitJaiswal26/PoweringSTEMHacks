import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { EHRProvider } from "./Context/EHRContext";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<EHRProvider>
				<App />
			</EHRProvider>
		</ThemeProvider>
	</React.StrictMode>
);
