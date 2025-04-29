import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,Phones, StaffPage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </Router>
  );
}

export default App;
