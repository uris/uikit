import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for React 18+
import App from "./App";
import "./fonts.css";

const rootElement = document.getElementById("root");

// Ensure 'rootElement' exists (optional null check)
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of render
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
} else {
	console.error("Root element not found");
}
