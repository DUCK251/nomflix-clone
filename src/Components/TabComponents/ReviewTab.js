import React, { useState } from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import Review from '../Review';

const Container = styled.div`
  width: 100%;
  min-height: 550px;
  background-color: black;
  color: white;
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

const ReviewTab = ({ review }) => {
  const [reviewIdx, setReviewIdx] = useState(0);

  const selectReview = (e) => {
    const idx = e.target.innerText;
    setReviewIdx(idx-1);
  }

  return (
    <>
    {review[reviewIdx] ? 
      <Container>
        {review[reviewIdx].map(review => (
          <Review
            name={review.author}
            rate={review.author_details.rating}
            content={review.content}
          />
        ))}
      </Container>
      : <span>No review</span>
    }
    <div>
      {review.map((_, idx) => 
        <TabButton select={reviewIdx === idx} onClick={(e) => selectReview(e)}>{idx+1}</TabButton>
      )}
    </div>
    </>
  );
};

ReviewTab.propTypes = {
  review: PropTypes.array,
};

export default ReviewTab;