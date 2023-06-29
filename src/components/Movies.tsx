import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { getDocs, collection } from "firebase/firestore";
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
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <>
      <AddMovie />
      <div className="flex flex-col items-center space-y-5 p-4">
        <span className="text-2xl font-bold ">
          My movies {movieList?.length}
        </span>
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
                <td className="font-semibold text-red-500 cursor-pointer hover:underline">
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
