import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const CompanyTab = ({ company }) => {
  return (
    company && company.map(company => (
      <Container>
        <span>{company.name}</span>
      </Container>
    ))
  );
};

CompanyTab.propTypes = {
  company: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CompanyTab;