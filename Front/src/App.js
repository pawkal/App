import AddEmployeeComponent from "./component/AddEmployeeComponent";
import AddEquipmentComponent from "./component/AddEquipmentComponent"; 
import ListEmployeeComponent from "./component/ListEmployeeComponent";
import ListEquipmentComponent from "./component/ListEquipmentComponent"; 
import FooterComponent from "./component/FooterComponent";
import HeaderComponent from "./component/HeaderComponent";
import DetailsEmployeeComponent from "./component/DetailsEmployeeComponent";
import DetailsEquipmentComponent from "./component/DetailsEquipmentComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employee" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          <Route path="/add-employee/:id" element={<AddEmployeeComponent />} />
          <Route path="/equipment" element={<ListEquipmentComponent />} /> 
          <Route path="/add-equipment" element={<AddEquipmentComponent />} /> 
          <Route path="/add-equipment/:id" element={<AddEquipmentComponent />} /> 
          <Route path="/details-employee/:id" element={<DetailsEmployeeComponent />} />
          <Route path="/details-equipment/:id" element={<DetailsEquipmentComponent />} />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
