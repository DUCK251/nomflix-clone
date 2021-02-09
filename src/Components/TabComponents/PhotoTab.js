import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import Flickity from 'react-flickity-component'
import "../../flickity.css";

const flickityOptions = {
  initialIndex: 0,
}

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
`;

const SFlickity = styled(Flickity)`
  width: 100%;
`;

const PhotoTab = ({ photo }) => {
  return (
    <Container>
      {photo && photo.length > 0 &&
        <SFlickity
            className={'carousel'}
            elementType={'div'}
            options={flickityOptions}
            disableImagesLoaded={false}
            reloadOnUpdate
            static
          >
          {photo && photo.map(photo => (
            <img src={`https://image.tmdb.org/t/p/w500${photo.file_path}`} alt="backdrops"></img>
          ))}
        </SFlickity>
      }
    </Container>
  );
};

PhotoTab.propTypes = {
  photo: PropTypes.arrayOf(
    PropTypes.shape({
      file_path: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PhotoTab;