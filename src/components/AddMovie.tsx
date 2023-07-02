import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { movieType } from "../Types/movie";

interface PropTypes {
  closeForm: () => void;
  refetch: () => void;
  isEditing: boolean;
  editingMovie: movieType;
}

function AddMovie({ closeForm, refetch, isEditing, editingMovie }: PropTypes) {
  const [title, setTitle] = useState<string>(editingMovie?.title);
  const [releaseDate, setReleaseDate] = useState<number>(
    editingMovie?.releaseDate
  );
  const [receivedAnOscar, setReceivedAnOscar] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const moviesCollectionRef = collection(db, "movies");
  const [photo, setPhoto] = useState<File>();
  const handleSubmit = async () => {
    console.log("photo");
    console.log(photo);
    // if (!title || !releaseDate) {
    //   return toast.warning("kindly provide all inputs");
    // } else {
    //   setloading(true);
    //   try {
    //     await addDoc(moviesCollectionRef, {
    //       title,
    //       releaseDate,
    //       receivedAnOscar,
    //       userId: auth?.currentUser?.uid, //also check created rules in firebase
    //     });
    //     toast.success("Movie added successfully");
    //     refetch();
    //   } catch (error) {
    //     console.log(error);
    //     {
    //       error instanceof Error && toast.error(error.message);
    //     }
    //   } finally {
    //     setloading(false);
    //   }
    // }
  };

  const handleEditMovie = async () => {
    try {
      setloading(true);
      const movieRef = doc(db, "movies", editingMovie.id);
      await updateDoc(movieRef, {
        title,
        releaseDate,
        receivedAnOscar,
      });
      toast.info("Updated successfully");
      closeForm();
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-30"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white relative px-6 py-8 rounded-lg w-3/4 md:w-1/2 flex flex-col">
        <>
          <span
            onClick={closeForm}
            className="absolute right-2 top-0 text-3xl hover:scale-125 duration-150 cursor-pointer"
          >
            &times;
          </span>
          <span className="font-bold w-fit text-2xl mx-auto">
            {isEditing ? "Update" : "Add New "} Movie
          </span>
          <input
            className="border px-4 mt-4 rounded-lg py-2"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border px-4 mt-3 rounded-lg py-2"
            type="number"
            placeholder="Release Date (Year)"
            value={releaseDate}
            onChange={(e) => setReleaseDate(Number(e.target.value))}
          />
          <div className="mt-6 font-bold">Received an Oscar?</div>
          <div className="flex  space-x-10 p-3">
            <div className="flex items-center">
              <input
                className=""
                type="radio"
                name="receivedOscar"
                placeholder="Release Date"
                style={{ height: "20px", width: "20px" }}
                defaultChecked={editingMovie?.receivedAnOscar}
                onChange={() => {
                  setReceivedAnOscar(true);
                }}
              />
              <span className="ml-2">Yes</span>
            </div>
            <div className="flex items-center ">
              <input
                className=""
                type="radio"
                name="receivedOscar"
                defaultChecked={!editingMovie?.receivedAnOscar}
                placeholder="Release Date"
                style={{ height: "20px", width: "20px" }}
                onChange={() => {
                  setReceivedAnOscar(false);
                }}
              />
              <span className="ml-2">No</span>
            </div>
          </div>
          <div className="flex flex-col space-y-3 mt-3">
            <label htmlFor="photo" className="font-bold">
              Add movie wallpaper
            </label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files?.[0])}
              id="photo"
              className="ml-4"
            />
          </div>
          <button
            onClick={() => {
              if (isEditing) {
                handleEditMovie();
              } else {
                handleSubmit();
              }
            }}
            className={`${
              !isEditing ? "bg-green-600" : "bg-yellow-600"
            } hover:${
              !isEditing ? "bg-green-800" : "bg-yellow-800"
            } text-white p-2 rounded-xl w-fit px-6 mt-4 ml-auto`}
          >
            {!isEditing ? "Submit" : "Update"}
          </button>
        </>
        {loading && (
          <div
            className="absolute inset-0  flex justify-center items-center"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <span className="font-bold ">Please wait...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMovie;
