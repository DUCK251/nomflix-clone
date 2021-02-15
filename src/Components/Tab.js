import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import VideoTab from "./TabComponents/VideoTab";
import CompanyTab from "./TabComponents/CompanyTab";
import CountryTab from "./TabComponents/CountryTab";
import PhotoTab from "./TabComponents/PhotoTab";
import ReviewTab from "./TabComponents/ReviewTab";
import PeopleTab from "./TabComponents/PeopleTab";
import RecommendTab from "./TabComponents/RecommendTab";
import SeasonsTab from "./TabComponents/SeasonsTab";

const Container = styled.div``;

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
    recommend,
    seasons
  }) => {
  const [tabIdx, setTabIdx] = useState(0);
  
  const contents = [
    {
      tab: "Cast",
      content: <PeopleTab people={cast}/>
    },
    {
      tab: "Crew",
      content: <PeopleTab people={crew}/>
    },
    {
      tab: "Photo",
      content: <PhotoTab photo={photo}/>
    },
    {
      tab: "Video",
      content: <VideoTab video={video}/>
    },
    {
      tab: "Company",
      content: <CompanyTab company={company}/>
    },
    {
      tab: "Country",
      content: <CountryTab country={country}/>
    },
    {
      tab: "Review",
      content: <ReviewTab review={review}/>
    },
    {
      tab: "Recommend",
      content: <RecommendTab recommend={recommend} isMovie={isMovie}/>
    },
  ]

  if (seasons) {
    contents.push({
      tab: "Seasons",
      content: <SeasonsTab seasons={seasons}/>
    })
  }

  return (
  <Container>
    <Tabs>
      {contents.map((section, idx) =>
        <TabButton 
          select={idx === tabIdx} 
          onClick={() => setTabIdx(idx)}
        >
          {section.tab}
        </TabButton>
      )}
    </Tabs>
    <Content>
      {contents[tabIdx].content}
    </Content>
  </Container>
)};
  
Tab.propTypes = {
  cast: PropTypes.array,
  video: PropTypes.array,
  company: PropTypes.array,
  country: PropTypes.array,
  review: PropTypes.array,
  recommend: PropTypes.array,
  seasons: PropTypes.array,
};

export default Tab;