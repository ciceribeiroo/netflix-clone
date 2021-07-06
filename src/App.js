import React, {useEffect, useState} from 'react'
import Tmdb from './Tmdb'

const App = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    const loadAll = async () => {
      Tmdb.getHomeList().then((res)=>{
        setMovieList(res);
      });
      console.log(movieList);
    }

    loadAll();
  }, []);

  return(
    <div className="page">
      <section className="lists">
        {movieList.forEach((item, key)=>{
          <div>
            {item.title}
          </div>
        })}
      </section>
    </div>
  )
}
export default App;