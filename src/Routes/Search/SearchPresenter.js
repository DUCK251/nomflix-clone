import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
`;

const Input = styled.input`
  all: unset;
  padding: 10px;
  border-radius: 5px;
  font-size: 28px;
  width: 100%;
  background-color: white;
  color: black;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 20px auto;
  justify-content: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  text-align: center;
  border: none;
  background-color: ${props => props.select ? "gray" : "black"};
  color: white;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const GenreContainer = styled.div`
  max-width: 700px;
  margin: 0px auto;
`;

const Button = styled.button`
  margin: 0.3rem;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  cursor: pointer;
`;

const tvGenres = [
  {id: 10759, name: "Action & Adventure"},
  {id: 16, name: "Animation"},
  {id: 35, name: "Comedy"},
  {id: 80, name: "Crime"},
  {id: 99, name: "Documentary"},
  {id: 18, name: "Drama"},
  {id: 10751, name: "Family"},
  {id: 10762, name: "Kids"},
  {id: 9648, name: "Mystery"},
  {id: 10763, name: "News"},
  {id: 10764, name: "Reality"},
  {id: 10765, name: "Sci-Fi & Fantasy"},
  {id: 10766, name: "Soap"},
  {id: 10767, name: "Talk"},
  {id: 10768, name: "War & Politics"},
  {id: 37, name: "Western"},
]

const movieGenres = [
  {id: 28, name: "Action"},
  {id: 12, name: "Adventure"},
  {id: 16, name: "Animation"},
  {id: 35, name: "Comedy"},
  {id: 80, name: "Crime"},
  {id: 99, name: "Documentary"},
  {id: 18, name: "Drama"},
  {id: 10751, name: "Family"},
  {id: 14, name: "Fantasy"},
  {id: 36, name: "History"},
  {id: 27, name: "Horror"},
  {id: 10402, name: "Music"},
  {id: 9648, name: "Mystery"},
  {id: 10749, name: "Romance"},
  {id: 878, name: "Science Fiction"},
  {id: 10770, name: "TV Movie"},
  {id: 53, name: "Thriller"},
  {id: 10752, name: "War"},
  {id: 37, name: "Western"},
]

const SearchPresenter = ({
  movieResults,
  moviePage,
  movieTotalPage,
  moviePageArray,
  tvResults,
  tvPage,
  tvTotalPage,
  tvPageArray,
  searchTerm, 
  loading, 
  error,
  handleSubmit,
  updateTerm,
  updateMoviePage,
  updateTvPage
}) => (
  <Container>
    <Helmet>
      <title>Search | Nomflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Title"
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {!searchTerm && !movieResults && !tvResults && (
      <GenreContainer>
        <span>Movie : </span>
        {movieGenres.map(g => (
          <Link to={`/movie/genre/${g.id}`}>
            <Button>{g.name}</Button>
          </Link>
        ))}
      </GenreContainer>
    )}
    {!searchTerm && !movieResults && !tvResults && (
      <GenreContainer>
        <span>Tv : </span>
        {tvGenres.map(g => (
          <Link to={`/tv/genre/${g.id}`}>
            <Button>{g.name}</Button>
          </Link>
        ))}
      </GenreContainer>
    )}
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title={`Movies searched by "${searchTerm}"`} >
            {movieResults.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date?.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        <PageContainer>
          <ButtonContainer>
            {moviePageArray && moviePageArray.map((page) => 
              <TabButton select={page === parseInt(moviePage)} onClick={updateMoviePage}>{page}</TabButton>
            )}
          </ButtonContainer>
          {movieTotalPage > 0 && <div>{moviePage}/{movieTotalPage}</div>}
        </PageContainer>
        {tvResults && tvResults.length > 0 && (
          <Section title={`TV Shows searched by "${searchTerm}"`}>
            {tvResults.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_title}
                rating={show.vote_average}
                year={show.first_air_date?.substring(0, 4)}
                isMovie={false}
              />
            ))}
          </Section>
        )}
        <PageContainer>
          <ButtonContainer>
            {tvPageArray && tvPageArray.map((page) => 
              <TabButton select={page === parseInt(tvPage)} onClick={updateTvPage}>{page}</TabButton>
            )}
          </ButtonContainer>
          {tvTotalPage > 0 && <div>{tvPage}/{tvTotalPage}</div>}
        </PageContainer>
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults && 
        movieResults &&
        tvResults.length === 0 &&
        movieResults.length === 0 && (
          <Message text="Nothing found" color="#95a5a6" />
        )}
      </>
    )}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;