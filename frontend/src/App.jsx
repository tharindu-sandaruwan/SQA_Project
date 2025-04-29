import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,Phones, StaffPage, AddAccessories, AccessoriesHome} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/addAccessories" element={<AddAccessories />} />
        <Route path="/accessoriesHome" element={<AccessoriesHome />} />
      </Routes>
    </Router>
  );
}

export default App;
