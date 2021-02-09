import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CountryTab = ({ country }) => {
  return (
    country.map(country => (
      <Container>
        <img src={`https://www.countryflags.io/${country.iso_3166_1}/flat/64.png`} alt={country.name}></img>
        <span>{country.name}</span>
      </Container>
    ))
  );
};

CountryTab.propTypes = {
  country: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      iso_3166_1: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CountryTab;