import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  :not(:last-child) {
    margin-bottom: 10px;
  }
  padding: 10px;
  line-height: 1.3rem;
`;

const UserContainer = styled.div``;

const Name = styled.span``;

const Rate = styled.span``;

const ContentContainer = styled.div``;

const Content = styled.span``;

const Link = styled.a``;

const Button = styled.button`
  margin-left: 1rem;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  cursor: pointer;
`;

const Review = ({ name, rate, content, url }) => {
  return (
    <Container>
      <UserContainer>
        <Name>{name} </Name>
        <Rate>
          <span role="img" aria-label="rating">
            (⭐️
          </span>{" "}
          {rate ? `${rate}/10` : '??/10'})
        </Rate>
      </UserContainer>
      <ContentContainer>
        {content.length > 300 ? (<span>{content.substring(0,300)}...  </span>) : (<span>{content}</span>)}
        {content.length > 300 && <Link href={url}><Button>View Details</Button></Link>}
      </ContentContainer>
    </Container>
  )
};

export default Review;