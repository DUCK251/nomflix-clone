import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(10, 125px);
  grid-gap: 25px calc((100% - 1250px)/9);
`;

const Section = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Section;