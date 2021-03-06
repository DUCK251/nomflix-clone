import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faHeart as sFaHeart, faHome, faClone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Tab from "../../Components/Tab";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  margin: 0px auto;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 40px;
  max-width: 800px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 2rem;
  margin: 20px 0;
`;

const Item = styled.span`
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  line-height: 1.5;
  width: 100%;
`;

const TabContainer = styled.div`
  margin-top: 20px;
`;

const Rate = styled.div`
  font-size: 16px;
  margin-top: 0.3rem;
`;

const Icon =styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const DetailPresenter = ({ result, loading, error, isMovie, isFav, toggleFav }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? `${result.original_title}` : `${result.original_name}`}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
            <Rate>
              <span role="img" aria-label="rating">
                ⭐️
              </span>{" "}
              {result.vote_average}/10
            </Rate>
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date?.substring(0, 4)
                : result.first_air_date?.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : (result.episode_run_time && result.episode_run_time[0])} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {isMovie && result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? <Link to={`/movie/genre/${genre.id}`}>{genre.name}</Link>
                    : <Link to={`/movie/genre/${genre.id}`}>{`${genre.name} / `}</Link>
              )}
              {!isMovie && result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? <Link to={`/tv/genre/${genre.id}`}>{genre.name}</Link>
                    : <Link to={`/tv/genre/${genre.id}`}>{`${genre.name} / `}</Link>
              )}
            </Item>
            {result.belongs_to_collection &&
            <>
              <Divider>•</Divider>
              <Link to={`/collection/${result.belongs_to_collection.id}`}>
                <FontAwesomeIcon icon={faClone} size="2x" color={"white"}/>
              </Link>
            </>
            }
            {result.imdb_id &&
            <>
              <Divider>•</Divider>
              <a href={`https://www.imdb.com/title/${result.imdb_id}/`} >
                <FontAwesomeIcon icon={faImdb} size="2x" color={"white"}/>
              </a>
            </>
            }
            {result.homepage &&
            <>
              <Divider>•</Divider>
              <a href={result.homepage}>
                <FontAwesomeIcon icon={faHome} size="2x" color={"white"}/>
              </a>
            </>
            }
            <>
              <Divider>•</Divider>
              {isFav ? 
                <Icon onClick={toggleFav} icon={sFaHeart} size="2x" color={"white"}/>: 
                <Icon onClick={toggleFav} icon={faHeart} size="2x" color={"white"}/>}
            </>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TabContainer>
            <Tab
              cast={result.cast}
              crew={result.crew}
              photo={result.photo}
              video={result.videos?.results} 
              country={result.production_countries}
              company={result.production_companies}
              review={result.review}
              recommend={result.recommend}
              seasons={result.seasons}
              isMovie={isMovie}
            />
          </TabContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
