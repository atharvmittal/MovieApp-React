import React, { useEffect, useState } from 'react'
import Spinner from './components/spinner';
import Search from './Components/search'
const API_BASE_URL = 'https://imdb236.p.rapidapi.com';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'imdb236.p.rapidapi.com',
    'x-rapidapi-key': '445c7f386bmsh7b25f23e5eaa75bp149130jsn9afb2a7cc15e'
  }
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage('');
    try{
      const endpoint = '/api/imdb/search?type=movie&genre=Drama&rows=25&sortOrder=ASC&sortField=id';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, API_OPTIONS);
      // alert(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if(data.response=== 'False') {
        setErrorMessage(data.error || 'No movies found');
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
    } 
    catch (error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
    finally{
    setLoading(false);
    }
}

  useEffect(()=>{
    fetchMovies();
  },[])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2 className="mt-[40px]">All Movies</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ):(
            <ul>
              {movies.map((movie)=>(
                <li key={movie.id}>
                    <p className='text-white'>{movie.originalTitle}</p>
                </li>
              ))}
            </ul>
          )}

        </section>

        

      </div>
  </main>
  )
}

export default App