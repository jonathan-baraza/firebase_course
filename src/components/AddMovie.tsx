import React from "react";

function AddMovie() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white relative px-6 py-8 rounded-lg w-3/4 md:w-1/2 flex flex-col">
        <span
          onClick={closeForm}
          className="absolute right-2 top-0 text-3xl hover:scale-125 duration-150 cursor-pointer"
        >
          &times;
        </span>
        <span className="font-bold w-fit text-2xl mx-auto">Add New Movie</span>
        <input
          className="border px-4 mt-3 rounded-lg py-2"
          type="text"
          placeholder="Title"
        />
        <input
          className="border px-4 mt-3 rounded-lg py-2"
          type="number"
          placeholder="Release Date"
        />
        <div className="mt-6">Received an Oscar?</div>
        <div className="flex  space-x-10 p-3">
          <div className="flex items-center">
            <input
              className=""
              type="radio"
              name="receivedOscar"
              placeholder="Release Date"
              style={{ height: "20px", width: "20px" }}
            />
            <span className="ml-2">Yes</span>
          </div>
          <div className="flex items-center ">
            <input
              className=""
              type="radio"
              name="receivedOscar"
              placeholder="Release Date"
              style={{ height: "20px", width: "20px" }}
            />
            <span className="ml-2">No</span>
          </div>
        </div>
        <button className="bg-green-600 hover:bg-green-800 text-white p-2 rounded-xl w-fit px-6 mt-4 ml-auto">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddMovie;
