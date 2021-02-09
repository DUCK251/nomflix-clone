import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from 'styled-components';
import Poster from '../Poster';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 125px);
  grid-gap: calc((100% - 625px)/4);
  margin-top: 20px;
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

const RecommendTab = ({ recommend, isMovie }) => {
  const [recommendIdx, setRecommendIdx] = useState(0);

  // let history = useHistory();

  // const handleRoute = (id) => {
  //   history.push(isMovie ? `/movie/${id}` : `/show/${id}`);
  //   console.log(history);
  //   window.location.reload()
  // }

  const selectRecommend = (e) => {
    const idx = e.target.innerText;
    setRecommendIdx(idx-1);
  }

  return (
    <>
    <Container>
      {recommend[recommendIdx] && recommend[recommendIdx].map(movie => (
        <Poster
          key={movie.id}
          id={movie.id}
          imageUrl={movie.poster_path}
          title={movie.original_title}
          rating={movie.vote_average}
          year={movie.release_date ? movie.release_date.substring(0, 4) : ""}
          isMovie={isMovie}
        />
      ))}
    </Container>
    <div>
      {recommend.map((_, idx) => <TabButton select={recommendIdx === idx} onClick={(e) => selectRecommend(e)}>{idx+1}</TabButton>)}
    </div>
    </>
  );
};

RecommendTab.propTypes = {
  isMovie: PropTypes.bool.isRequired,
  recommend: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
        original_title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        release_date: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired
};

export default RecommendTab;