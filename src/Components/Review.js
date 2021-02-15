import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${props => props.open ? "100%": "0px"};
  font-size: 20px;
  line-height: 2rem;
  position: fixed;
  z-index: 4;
  top: 0;
  right: 0;
  background-color: white;
  color: black;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const SideBarTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0px auto;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const Close = styled.a`
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const SideBarContent = styled.div`
  max-width: 1100px;
  margin: 0px auto;
`
const Icon = styled(FontAwesomeIcon)`
  &:hover {
    color: #3498db;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 0.7rem;
`;

const Review = ({ name, rate, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paragraphs, setParagraphs] = useState([]);
  const openSide = (e) => {
    e.preventDefault();
    setIsOpen(true);
    const arr = content.match(/[^\r\n]+/g);
    setParagraphs(arr);
  }
  const closeSide = (e) => {
    e.preventDefault();
    setIsOpen(false);
  }


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
        {content.length > 300 && <Link href="#" onClick={openSide}><Button>Read More</Button></Link>}
      </ContentContainer>
      <SideBar open={isOpen}>
        <SideBarTitle>
          <div>
            <Name>{name} </Name>
            <Rate>
              <span role="img" aria-label="rating">
                (⭐️
              </span>{" "}
              {rate ? `${rate}/10` : '??/10'})
            </Rate>
          </div>
          <div>
            <Close onClick={closeSide}>
              <Icon icon={faWindowClose} size="2x" color={"black"}/>
            </Close>
          </div>
        </SideBarTitle>
        <SideBarContent>
          {paragraphs.map((element) => <Paragraph>{element}</Paragraph>)}
        </SideBarContent>
      </SideBar>
    </Container>
  )
};

Review.propTypes = {
  name: PropTypes.string,
  rate: PropTypes.number,
  content: PropTypes.string
}

export default Review;