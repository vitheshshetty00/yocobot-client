import "./App.css";
import Chat from "./components/Chat";
import Summarizer from "./components/Summarizer";
import ImageGenerator from "./components/ImageGenerator";
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
// import Header from './components/Header';

const App = () => {
	return (
		<main>
			<div className="main">
				<div className="gradient" />
			</div>
			{/* <Header /> */}
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Chat/>} />
					<Route exact path="/chat" element={<Chat/>} />
					<Route exact path="/summarizer" element={<Summarizer/>} />
					<Route exact path="/image-generator" element={<ImageGenerator/>} />
				</Routes>
			</BrowserRouter>
      {/* <Chat /> */}
		</main>
	);
};

export default App;
