import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

const Name = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
  text-align: center;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
  text-align: center;
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
  position: relative;
`;

const Person = ({ name, description, imgURL }) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imgURL
              ? `https://image.tmdb.org/t/p/w300${imgURL}`
              : "/noPosterSmall.png"
          }
        />
      </ImageContainer>
      <Name><span>{name}</span></Name>
      <Description><span>{description}</span></Description>
    </Container>
  )
};

export default Person;

Person.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  imgURL: PropTypes.string
}