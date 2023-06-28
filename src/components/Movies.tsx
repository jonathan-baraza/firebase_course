import { useState, useEffect } from "react";
import { db } from "../config/firebase";

type movieType = {
  title: string;
  releaseData: number;
  receivedAnOscar: boolean;
};

const Movies = () => {
  const [movieList, setMovieList] = useState<movieType[]>([]);

  const getMovieList = async () => {
    //
  };
  return <div>Movies </div>;
};

export default Movies;
