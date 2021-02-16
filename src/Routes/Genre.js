import Loader from "Components/Loader";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { moviesApi, tvApi } from "../api";
import { getPageArray } from "../utils";
import Section from "../Components/Section";
import Message from "../Components/Message";
import Poster from "../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
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

const Genre = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const isMovie = location.pathname.includes("movie");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageArray, setPageArray] = useState([]);
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data = null;
        if (isMovie) {
          const result = await moviesApi.discover(`with_genres=${id}&page=${page}`);
          data = result.data;
        } else {
          const result = await tvApi.discover(`with_genres=${id}&page=${page}`);
          data = result.data;
        }
        setResults(data.results);
        setTotalPage(data.total_pages);
        const pageArray = getPageArray(page, data.total_pages);
        setPageArray(pageArray);
      } catch {
        setError("Can't find results");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, isMovie, page]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data = null;
        if (isMovie) {
          const result = await moviesApi.genres();
          data = result.data.genres;
        } else {
          const result = await tvApi.genres();
          data = result.data.genres;
        }
        setGenres(data);
        const genreData = data.find(element => element.id === parseInt(id));
        if(genreData === undefined) {
          history.push("/");
        }
        setTitle(genreData.name);
      } catch {
        setError("Can't find results");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, isMovie, page, history]);

  return (
    <Container>
      <TitleContainer>
        <span>{title} {isMovie ? "Movies" : "TV shows"}</span>
      </TitleContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isMovie && genres && genres.length > 0 && (
            <GenreContainer>
              {genres.map(g => (
                <Link to={`/movie/genre/${g.id}`}>
                  <Button>{g.name}</Button>
                </Link>
              ))}
            </GenreContainer>
          )}
          {!isMovie && genres && genres.length > 0 && (
            <GenreContainer>
              {genres.map(g => (
                <Link to={`/tv/genre/${g.id}`}>
                  <Button>{g.name}</Button>
                </Link>
              ))}
            </GenreContainer>
          )}
          {results && results.length > 0 && (
            <Section title={""} >
              {results.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date?.substring(0, 4)}
                  isMovie={isMovie}
                />
              ))}
            </Section>
          )}
          <PageContainer>
            <ButtonContainer>
              {pageArray && pageArray.map((p) => 
                <TabButton select={p === parseInt(page)} onClick={() => setPage(p)}>{p}</TabButton>
              )}
            </ButtonContainer>
            {totalPage > 0 && <div>{page}/{totalPage}</div>}
          </PageContainer>
          {error && <Message color="#e74c3c" text={error} />}
        </>
      )}
    </Container>
  );
}

export default Genre;