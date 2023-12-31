import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { toast } from "react-toastify";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import AddMovie from "./AddMovie";

import { movieType } from "../Types/movie";

const Movies = () => {
  const [movieList, setMovieList] = useState<movieType[]>([]);
  const moviesCollectionRef = collection(db, "movies");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const [editingMovie, setEditingMovie] = useState<movieType | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getMovieList = async () => {
    try {
      //READ THE DATABASE
      const data = await getDocs(moviesCollectionRef);
      const filteredData: movieType[] = data.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title as string,
        releaseDate: Number(doc.data().releaseDate),
        receivedAnOscar: doc.data().receivedAnOscar as boolean,
        wallpaper: doc.data().wallpaper as string,
        // ...doc.data(),
      }));

      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  const handleDelete = async (movie: movieType) => {
    try {
      //append movie id to the end
      const movieDoc = doc(db, "movies", movie.id);
      await deleteDoc(movieDoc);
      toast.error("Movie deleted successfully");
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowEditForm = (movie: movieType) => {
    setIsEditing(true);
    setEditingMovie(movie);
    setShowAddForm(true);
  };

  useEffect(() => {
    getMovieList();
  }, []);
  if (loading)
    return <div className="p-4 font-bold text-center">Loading movies...</div>;
  return (
    <>
      {showAddForm && (
        <AddMovie
          closeForm={() => {
            setIsEditing(false);
            setEditingMovie(null);
            setShowAddForm(false);
          }}
          refetch={() => {
            setShowAddForm(false);
            getMovieList();
          }}
          isEditing={isEditing}
          editingMovie={editingMovie!}
        />
      )}
      <div className="flex relative flex-col items-center space-y-5 p-4">
        <span className="text-2xl font-bold ">
          My movies #({movieList?.length})
        </span>
        <button
          onClick={() => {
            if (!auth.currentUser) {
              return toast.warning("kindly login first");
            }
            setShowAddForm(true);
          }}
          className="bg-blue-500 text-white p-2 px-6 rounded-lg absolute right-2 top-0"
        >
          Add
        </button>
        <table className="border w-full ">
          <thead className="bg-green-600 font-semibold text-white">
            <tr>
              <td>ID</td>
              <td>MOVIE</td>
              <td>TITLE</td>
              <td>RELEASE DATE</td>
              <td>RECEIVED AN OSCAR</td>
              <td colSpan={2}>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {movieList.map((movie, index) => (
              <tr key={movie.id}>
                <td className="">{index + 1}</td>
                <td className="">
                  <img
                    src={movie.wallpaper}
                    className="w-[50px] object-contain mx-auto"
                  />
                </td>
                <td className="">{movie.title}</td>
                <td className="">{movie.releaseDate}</td>
                <td className="">{String(movie.receivedAnOscar)}</td>
                <td
                  onClick={() => {
                    handleShowEditForm(movie);
                  }}
                  className="font-semibold text-yellow-500 cursor-pointer hover:underline"
                >
                  Edit
                </td>
                <td
                  onClick={() => handleDelete(movie)}
                  className="font-semibold text-red-500 cursor-pointer hover:underline"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Movies;
