import React, {useEffect, useState} from 'react'
import Tmdb from './Tmdb'
import './App.css'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    async function loadAll () {
      try{
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        let originals = list.filter(i=> i.slug === 'originals');
        let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randonChosen]
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

        setFeaturedData(chosenInfo)
      }
      catch(err){
        console.log(err.message)
      }
    }

    loadAll();
  }, []);

  useEffect(()=>{
     const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }
      else{
        setBlackHeader(false)
      }
     }
     window.addEventListener('scroll', scrollListener)
     return () => {
       window.removeEventListener('scroll', scrollListener)
     }
  }, [])

  return(
    <div className="page">
      <Header black={blackHeader}></Header>
      {featuredData && <FeaturedMovie item={featuredData}></FeaturedMovie>}
      <section className="lists">
        {movieList && movieList.map((item, key)=>{
          return(
            <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
          )
        })}
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por ciceribeiroo
        <br />
        Direitos de imagem para Netflix
        <br />
        Usando a API TMDB
      </footer>

      { movieList.length<= 0 && <div className="loading">
        <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando" />
      </div> }
    </div>
  )
}
export default App;