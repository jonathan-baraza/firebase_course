import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import AddMovie from "./AddMovie";

type movieType = {
  id: string;
  title: string;
  releaseDate: number;
  receivedAnOscar: boolean;
};

const Movies = () => {
  const [movieList, setMovieList] = useState<movieType[]>([]);
  const moviesCollectionRef = collection(db, "movies");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);

  const getMovieList = async () => {
    try {
      //READ THE DATABASE
      const data = await getDocs(moviesCollectionRef);
      const filteredData: movieType[] = data.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title as string,
        releaseDate: Number(doc.data().releaseDate),
        receivedAnOscar: doc.data().receivedAnOscar as boolean,
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

  useEffect(() => {
    getMovieList();
  }, []);
  if (loading)
    return <div className="p-4 font-bold text-center">Loading movies...</div>;
  return (
    <>
      {showAddForm && (
        <AddMovie
          closeForm={() => setShowAddForm(false)}
          refetch={() => {
            setShowAddForm(false);
            getMovieList();
          }}
        />
      )}
      <div className="flex relative flex-col items-center space-y-5 p-4">
        <span className="text-2xl font-bold ">
          My movies #({movieList?.length})
        </span>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white p-2 px-6 rounded-lg absolute right-2 top-0"
        >
          Add
        </button>
        <table className="border w-full lg:w-3/4 ">
          <thead className="bg-green-600 font-semibold text-white">
            <tr>
              <td>ID</td>
              <td>MOVIE</td>
              <td>RELEASE DATE</td>
              <td>RECEIVED AN OSCAR</td>
              <td colSpan={2}>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {movieList.map((movie, index) => (
              <tr key={movie.id}>
                <td className="">{index + 1}</td>
                <td className="">{movie.title}</td>
                <td className="">{movie.releaseDate}</td>
                <td className="">{String(movie.receivedAnOscar)}</td>
                <td className="font-semibold text-yellow-500 cursor-pointer hover:underline">
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
