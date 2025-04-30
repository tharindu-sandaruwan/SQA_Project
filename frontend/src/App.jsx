import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,Phones, StaffPage, AddAccessories, AccessoriesHome, Promotions} from "./pages";
import DisplayStaffsPage from "./pages/DisplayStaffsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/addAccessories" element={<AddAccessories />} />
        <Route path="/accessoriesHome" element={<AccessoriesHome />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/displayStaff" element={<DisplayStaffsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
