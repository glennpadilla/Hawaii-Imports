import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import './index.css';
import Footer from './Footer'

import AutomobileInventory from './inventory/automobile/AutomobileList';
import CreateAutomobile from './inventory/automobile/AutomobileForm';
import CreateManufacturer from './inventory/manufacturers/ManufacturerForm';
import ManufacturersList from './inventory/manufacturers/ManufacturersList';
import CreateVehicleModel from './inventory/vehicle/ModelForm';
import VehicleModelList from './inventory/vehicle/ModelList';

import SalespersonList from './sales/SalespersonList';
import SalespersonForm from './sales/SalespersonForm';
import SalespersonHistory from './sales/SalespersonHistory';
import CustomerList from './sales/CustomerList';
import CustomerForm from './sales/CustomerForm';
import SalesList from './sales/SalesList';
import SalesForm from './sales/SalesForm';

import TechnicianForm from './services/TechnicianForm';
import TechnicianList from './services/TechnicianList';
import AppointmentList from './services/AppointmentList';
import AppointmentForm from './services/AppointmentForm';
import ServiceHistoryList from './services/ServiceHistoryList';


function App() {
  return (
    <BrowserRouter>
    <div className = "mainpage">
      <Nav />
      <div className="mainbody">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="create" element={<CreateManufacturer />}/>
          </Route>

          <Route path="models">
            <Route path="" element={<VehicleModelList />} />
            <Route path="create" element={<CreateVehicleModel />} />
          </Route>

          <Route path="automobiles">
            <Route path="" element={<AutomobileInventory />} />
            <Route path="create" element={<CreateAutomobile />} />
          </Route>

          <Route path="salespeople">
            <Route path="" element={<SalespersonList />} />
            <Route path="create" element={<SalespersonForm />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>

          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>

          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="create" element={<SalesForm />} />
          </Route>

          <Route path="technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="create" element={<TechnicianForm />} />
          </Route>

          <Route path="appointment">
            <Route path="" element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
          </Route>

          <Route path="history">
            <Route path="service" element={<ServiceHistoryList />} />
          </Route>

        </Routes>
      </div>
        <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
