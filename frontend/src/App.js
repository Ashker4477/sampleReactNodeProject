import RecipeReviewCard from './screens/CardComponent';
import axios from "axios";
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(()=>{
    getMoviesData();
  },[]);

  async function getMoviesData(){
    const response = await axios.get('http://localhost:5000/movies/data');
    setMoviesList(response.data);
  }

  return (
    <div className="App">
      {
        moviesList.map((item)=>{
          return(
            <div key={item.id} className="d-flex justify-content-center m-2">
              <RecipeReviewCard name={item.name} rating={item.rating} released={item.released} />
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
