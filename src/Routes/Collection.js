import { moviesApi } from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Poster from "../Components/Poster";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const TitleContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
  margin-bottom: 2rem;
`;

const Title = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size:1rem;
`

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 125px);
  grid-gap: 25px calc((100% - 625px)/4);
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Collection = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  useEffect(()=>{
    const FetchData = async () => {
      const {data} = await moviesApi.collection(id);
      setMovies(data);
      console.log(data);
      setLoading(false);
    }
    FetchData();
  }, []);

  return (
    loading ? (
      <>
        <Helmet>
          <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
          <title>
            {movies.name ? movies.name : "Collection"}{" "}
            | Nomflix
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
        />
        <TitleContainer>
          <Title>
            {movies.name}
          </Title>
          <Overview>
            {movies.overview}
          </Overview>
        </TitleContainer>
        <ContentContainer>
        {movies.parts && movies.parts.map((movie) => {
          return (
            <Poster 
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date?.substr(0,4)}
              isMovie
            />
          )
        })}
        </ContentContainer>
      </Container>
    )
  )
}

export default Collection;