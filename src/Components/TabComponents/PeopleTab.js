import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import Person from '../Person';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 125px);
  grid-gap: calc((100% - 625px)/4);
  margin-top: 20px;
`;

const PeopleTab = ({ people }) => {
  return (
    <Container>
      {people.map(person => (
        <Person name={person.name} description={person.character} imgURL={person.profile_path} />
      ))}
    </Container>
  );
};

PeopleTab.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default PeopleTab;