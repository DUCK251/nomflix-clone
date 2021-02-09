import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Poster from "./Poster";
import VideoTab from "./TabComponents/VideoTab";
import CompanyTab from "./TabComponents/CompanyTab";
import CountryTab from "./TabComponents/CountryTab";
import PhotoTab from "./TabComponents/PhotoTab";
import ReviewTab from "./TabComponents/ReviewTab";
import PeopleTab from "./TabComponents/PeopleTab";
import RecommendTab from "./TabComponents/RecommendTab";
import "../flickity.css";

const Container = styled.div`
`;

const Tabs = styled.div`
  display: flex;
  background-color: black;
  width:100%;
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

const Link = styled.a``;

const Content = styled.div``;

const Tab = ({
    isMovie,
    crew,
    cast,
    photo,
    video,
    company,
    country,
    review,
    recommend
  }) => {
  const [isCast, setIsCast] = useState(true);
  const [isCrew, setIsCrew] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isCountry, setIsCountry] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [isRecommend, setIsRecommend] = useState(false);

  const tabSelect = (func) => {
    const taps = [
      setIsCast, 
      setIsVideo, 
      setIsCompany, 
      setIsCountry,
      setIsCrew,
      setIsPhoto,
      setIsReview,
      setIsRecommend
    ]
    taps.map((f) => {
      if (f === func) {
        return f(true);
      } else {
        return f(false);
      }
    })
  }

  const onClick = (e) => {
    const flag = e.target.innerText;
    if (flag === "Company") {
      tabSelect(setIsCompany);
    } else if (flag === "Country") {
      tabSelect(setIsCountry);
    } else if (flag === "Video") {
      tabSelect(setIsVideo);
    } else if (flag === "Cast") {
      tabSelect(setIsCast);
    } else if (flag === "Crew") {
      tabSelect(setIsCrew);
    } else if (flag === "Photo") {
      tabSelect(setIsPhoto);
    } else if (flag === "Review") {
      tabSelect(setIsReview);
    } else if (flag === "Recommend") {
      tabSelect(setIsRecommend);
    }
  }

  return (
  <Container>
    <Tabs>
      <TabButton select={isCast} onClick={ (e) => onClick(e) }>Cast</TabButton>
      <TabButton select={isCrew} onClick={ (e) => onClick(e) }>Crew</TabButton>
      <TabButton select={isPhoto} onClick={ (e) => onClick(e) }>Photo</TabButton>
      <TabButton select={isVideo} onClick={ (e) => onClick(e) }>Video</TabButton>
      <TabButton select={isCompany} onClick={ (e) => onClick(e) }>Company</TabButton>
      <TabButton select={isCountry} onClick={ (e) => onClick(e) }>Country</TabButton>
      <TabButton select={isReview} onClick={ (e) => onClick(e) }>Review</TabButton>
      <TabButton select={isRecommend} onClick={ (e) => onClick(e) }>Recommend</TabButton>
    </Tabs>
    <Content>
      {isCast && <PeopleTab people={cast}/>}
      {isCrew && <PeopleTab people={crew}/>}
      {isPhoto && <PhotoTab photo={photo}/>}
      {isVideo && <VideoTab video={video}/>}
      {isCompany && <CompanyTab company={company}/>}
      {isCountry && <CountryTab country={country}/>}
      {isReview && <ReviewTab review={review}/>}
      {isRecommend && <RecommendTab recommend={recommend} isMovie={isMovie}/>}
    </Content>
  </Container>
)};
  
Tab.propTypes = {
  cast: PropTypes.array,
  video: PropTypes.array,
  company: PropTypes.array,
  country: PropTypes.array,
  review: PropTypes.array,
  recommend: PropTypes.array
};

export default Tab;