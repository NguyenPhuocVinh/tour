import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "../../Pages/Users/users";
import Dashboard from "../../Pages/Dashboard";
import Tours from "../../Pages/Tours/Tours";
import Bookings from "../../Pages/Bookings";
import CreateTour from "../../Pages/CreateTour/createTour";
import UpdateTour from "../../Pages/UpdateTour/updateTour";
import Login from "../Login/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/tours" element={<Tours />}></Route>
      <Route path="/bookings" element={<Bookings />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/add-tour" element={<CreateTour />}></Route>
      <Route path="/update-tour/:id" element={<UpdateTour />}></Route>
    </Routes>
  );
}
export default AppRoutes;
