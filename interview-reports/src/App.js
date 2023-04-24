import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import CandidatePage from "./components/CandidatePage/CandidatePage";
import NoPage from "./components/NoPage/NoPage";
import Admin from "./components/Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/candidate-page" element={<CandidatePage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
