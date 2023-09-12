import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Payments from "./components/Payments/Payments";
import Home from "./components/Home/Home";
import Users from "./components/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
