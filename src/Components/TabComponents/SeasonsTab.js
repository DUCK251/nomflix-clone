import React, { useState } from 'react';
import styled from 'styled-components';
import { paginateArray } from "../../utils";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 125px);
  grid-gap: 25px calc((100% - 625px)/4);
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

const PosterContainer = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const PosterTitle = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const SeasonsTab = ({ seasons }) => {
  seasons = paginateArray(seasons);
  const [index, setIndex] = useState(0);

  const selectIndex = (e) => {
    const idx = e.target.innerText;
    setIndex(idx-1);
  }

  return (
    <>
    <Container>
    {seasons[index] && seasons[index].map((season) => {
      return (
        <PosterContainer>
          <ImageContainer>
          <Image
            bgUrl={
              season.poster_path
                ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                : "/noPosterSmall.png"
            }
          />
          </ImageContainer>
          <PosterTitle>
            {season.name}
          </PosterTitle>
          <Year>{season.air_date}</Year>
        </PosterContainer>
      )
    })}
    </Container>
    <div>
      {seasons.map((_, idx) => <TabButton select={index === idx} onClick={(e) => selectIndex(e)}>{idx+1}</TabButton>)}
    </div>
    </>
  );
}

export default SeasonsTab;