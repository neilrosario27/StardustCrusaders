import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Flowchart from "./Flowchart";
import Resume from "./Resume";
import Questions from "./Questions";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/flowchart" element={<Flowchart />} />
          {/* Add more routes here */}
        </Routes>
        <Routes>
          <Route path="/resume" element={<Resume />} />
          {/* Add more routes here */}
        </Routes>
        <Routes>
          <Route path="/questions" element={<Questions />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
