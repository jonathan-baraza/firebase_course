import { useState } from "react";
import { Auth } from "./components/Auth";
// import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Movies from "./components/Movies";

function App() {
  return (
    <>
      <div className="">
        <Auth />
        {/* <Movies /> */}
      </div>
      <ToastContainer pauseOnHover={false} autoClose={2000} />
    </>
  );
}

export default App;
