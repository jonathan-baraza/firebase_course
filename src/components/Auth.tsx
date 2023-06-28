import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSignIn = async () => {
    if (!email || !password) {
      return toast.error("Please provide all inputs");
    }
    toast("Aluta continua! " + email + password);
  };

  return (
    <div className="w-full flex justify-center min-h-[100vh] items-center p-3">
      <div className="border bg-[#f4ffff] flex flex-col space-y-4 items-center md:w-50 w-[90%] p-9 rounded-2xl shadow-sm">
        <span className="text-2xl font-bold ">Signup</span>

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded-xl w-full pl-6 outline-none"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded-xl w-full pl-6 outline-none"
        />
        <div className="flex w-full justify-end">
          <button
            onClick={handleSignIn}
            className="bg-green-600 text-white p-2 mt-2  px-8 rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
