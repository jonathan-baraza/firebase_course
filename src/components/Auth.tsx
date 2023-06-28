import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleSignIn = async () => {
    if (!email || !password) {
      return toast.error("Please provide all inputs");
    }
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("Sign in response");
        console.log(res);
        toast.success("Sign up was successfull");
      })
      .catch((err) => {
        setError(err.message.split(":")[1]);
        setTimeout(() => {
          setError("");
        }, 4000);
        // toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    toast("google singing in now");
  };

  if (loading) {
    return (
      <div className="p-10 w-full h-full font-bold text-center">
        Loading, please wait...
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center min-h-[100vh] items-center p-3">
      {auth.currentUser?.email && (
        <span className="absolute left-4 top-4 border border-green-600 rounded text-green-600 text-sm p-2 px-2 bg-green-50">
          {auth.currentUser.email}
        </span>
      )}
      <div className="border bg-[#f4ffff] flex flex-col space-y-4 items-center md:w-50 w-[90%] p-9 rounded-2xl shadow-sm">
        <span className="text-2xl font-bold ">Signup</span>
        {error && (
          <span className="text-red-500 bg-red-100 border-red-500 border p-2 rounded-lg px-4 py-2">
            {error}
          </span>
        )}

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
        <span className="font-bold">Or</span>
        <FcGoogle
          onClick={handleGoogleSignIn}
          className="border p-2 border-gray-300 bg-white rounded h-[40px] w-[40px] hover:cursor-pointer hover:scale-110 duration-150  rounded-full"
        />
      </div>
    </div>
  );
};
