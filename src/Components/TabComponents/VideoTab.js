import React, { useState } from 'react';
import PropTypes from "prop-types";
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Container = styled.div``;

const YT = styled(YouTube)`
  margin-top: 20px;
  width: 100%;
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

const Video = ({ id }) => {
  const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
        origin: window.location.origin,
      },
    };

  const _onReady = (event) => {
      event.target.pauseVideo();
  }

  return <YT videoId={id} opts={opts} onReady={(e) => _onReady(e)} />;
}

const VideoTab = ({ video }) => {
  const [videoIdx, setVideoIdx] = useState(0);
  const selectVideo = (e) => {
    const idx = e.target.innerText;
    setVideoIdx(idx-1);
  }
  return (
    <Container>
      {video[videoIdx] && <Video id={video[videoIdx].key} />}
      {video.map((_, idx) => <TabButton select={videoIdx === idx} onClick={ (e) => selectVideo(e) }>{idx+1}</TabButton>)}
    </Container>
  )
}

VideoTab.propTypes = {
  video: PropTypes.array.isRequired
};

export default VideoTab;