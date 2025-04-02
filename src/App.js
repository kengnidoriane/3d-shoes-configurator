import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatalogPage from "./Components/CatalogPage";
import CustomizationPage from "./Components/CustomizationPage.jsx";
import CustomizePage from "./Components/CustomizePage";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar /> */}
        <main>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/customize/:modelId" element={<CustomizationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;