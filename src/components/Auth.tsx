import React from "react";

export const Auth = () => {
  return (
    <div className="w-full flex justify-center min-h-[100vh] items-center p-3">
      <div className="border bg-[#f4ffff] flex flex-col space-y-4 items-center md:w-50 w-[90%] p-9 rounded-2xl shadow-sm">
        <span className="text-2xl font-bold ">Signup</span>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 rounded-xl w-full pl-6 outline-none"
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 rounded-xl w-full pl-6 outline-none"
        />
        <div className="flex w-full justify-end">
          <button className="bg-green-600 text-white p-2 mt-2  px-8 rounded-xl">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
