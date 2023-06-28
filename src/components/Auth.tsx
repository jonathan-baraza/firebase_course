import { useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  // Boolean(auth?.currentUser)
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
        // setIsAuthenticated(true);
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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(Boolean(user));
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
        .then((res) => {
          // setIsAuthenticated(true);
          console.log("Google Sign in response");
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast("You have been logged out!");
      // setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
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
      {isAuthenticated && (
        <div className="absolute left-4 top-4 flex items-center">
          <span className=" border flex items-center border-green-600 rounded text-green-600 text-sm p-2 px-2 bg-green-50">
            {auth?.currentUser?.photoURL && (
              <img
                src={auth?.currentUser?.photoURL}
                className="w-[30px] h-[30px] mr-2 rounded-full"
              />
            )}
            <span> {auth?.currentUser?.email}</span>
          </span>
          <button
            onClick={handleSignOut}
            className="bg-gray-800 text-white p-2 ml-2 text-sm rounded-xl"
          >
            Sign out
          </button>
        </div>
      )}
      <div className="border bg-[#f4ffff] flex flex-col space-y-4 items-center md:w-1/2 w-[90%] p-9 rounded-2xl shadow-sm">
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
