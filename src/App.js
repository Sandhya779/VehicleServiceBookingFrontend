import React ,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceHistory from "./pages/History";
import MajorServices from "./pages/Majorservices"; 
import SpecializedServices from "./pages/Specializedservices";
import BasicServices from "./pages/BasicServices";
import { CartProvider } from "./pages/CartContext";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import ServiceBookingForm from "./pages/BookingForm";

function App() {
  const [formData, setFormData] = useState({
    StoreId: "",
    VehicleDetails: "",
    BookingDate: new Date().toISOString().split("T")[0], // Default to today
    StatusId: 1, // Default status
  });
  return (
    <Provider store={store}>
      <CartProvider> {/* Wrap everything inside CartProvider */}
        <Router>
          <Routes>
          <Route path="/" element={<User />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/history" element={<ServiceHistory />} />
            <Route path="/major-services" element={<MajorServices />} />
            <Route path="/basic-services" element={<BasicServices />} />
            <Route path="/specialized-services" element={<SpecializedServices />} />
            <Route path="/cart" element={<Cart formData={formData}/>} />
            <Route path="/service-booking" element={<ServiceBookingForm formData={formData} setFormData={setFormData} />} />

          </Routes>
        </Router>
      </CartProvider>
    </Provider>
  );
}

export default App;