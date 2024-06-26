import "./App.css";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signup from "./screens/Signup.jsx";
import CardProvider from "./components/contextReducer.jsx";
import MyOrderData from "./screens/MyOrderData.jsx";

function App() {
  return (
    <>
      <CardProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/myorder" element={<MyOrderData />} />
        </Routes>
      </CardProvider>
    </>
  );
}

export default App;
