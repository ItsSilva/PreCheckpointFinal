import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Add from "./pages/Add";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
};

export default App;
