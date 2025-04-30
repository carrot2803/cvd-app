import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PageContent from "./pages/PageContent";

export default function App() {
	return (
		<BrowserRouter>
			<PageContent />
		</BrowserRouter>
	);
}
