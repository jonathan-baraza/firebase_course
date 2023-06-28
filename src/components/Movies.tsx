import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { getDocs, collection } from "firebase/firestore";

type movieType = {
  title: string;
  releaseData: number;
  receivedAnOscar: boolean;
};

const Movies = () => {
  const [movieList, setMovieList] = useState<movieType[]>([]);
  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      //READ THE DATABASE
      const data = await getDocs(moviesCollectionRef);
      console.log("data");
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  return <div>Movies </div>;
};

export default Movies;
