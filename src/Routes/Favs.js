import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { moviesApi, tvApi } from '../api';
import Loader from "../Components/Loader"
import Section from "../Components/Section";
import Poster from "../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const Info = styled.p`
  color: white;
  font-size: 2rem;
  line-height: 2.5rem;
`;

const Favs = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let movies = [];
      let shows = [];
      let FavsData = localStorage.getItem('Favs');
      FavsData = FavsData ? FavsData.split(',') : [];
      for(let i=0; i<FavsData.length; ++i) {
        let id = FavsData[i];
        const isMovie = id[0] === 'm';
        id = id.substr(1);
        if (isMovie) {
          const { data } = await moviesApi.movieDetail(id);
          movies.push(data);
        } else {
          const { data } = await tvApi.showDetail(id);
          shows.push(data);
        }
      }
      setMovies(movies);
      setShows(shows);
      setLoading(false);
      console.log(movies);
      console.log(shows);
    }
    fetchData();
  }, [])
  return (
    <>
      <Helmet>
        <title>Favorites | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {movies.length === 0 && shows.length === 0 &&
            <div>
              <Info>You don't have items in the favorite list.</Info>
              <Info>Click <FontAwesomeIcon icon={faHeart} size="1x" color={"white"}/> to make favorite movies or tv shows.</Info>
            </div>
          }
          {movies && movies.length > 0 && (
            <Section title="Favorite Movies">
              {movies.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {shows && shows.length > 0 && (
            <Section title="Favorite Shows">
              {shows.map(show => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
        </Container>
      )}
    </>
  )
}

export default Favs;