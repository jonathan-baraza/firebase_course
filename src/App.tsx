import { useState } from "react";
import { Auth } from "./components/Auth";
// import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="">
        <Auth />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
