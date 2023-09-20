import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./components/Home/Home"));
const Payments = lazy(() => import("./components/Payments/Payments"));
const Users = lazy(() => import("./components/Users/Users"));
const Loading = lazy(() => import("./components/Loading/Loading"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </BrowserRouter>{" "}
    </Suspense>
  );
}

export default App;
