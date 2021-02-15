import React from "react";
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