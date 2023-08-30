import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main/:owner/:repo" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
