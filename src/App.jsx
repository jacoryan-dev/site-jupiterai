import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import DocPage from "./components/pages/Docpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documentacao" element={<DocPage />} />
      </Routes>
    </Router>
  );
};

export default App;
