import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

const Loader = () => (
  <Container>
    <Img src="/loading.gif"></Img>
  </Container>
);

export default Loader;