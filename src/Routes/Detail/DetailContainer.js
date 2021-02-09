import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let cast = [];
    let crew = [];
    let photo = [];
    let review = [];
    let recommend = [];
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        ({ data: { cast, crew }} = await moviesApi.cast(parsedId));
        ({ data: { backdrops: photo }} = await moviesApi.photo(parsedId));
        ({ data: { results: review }} = await moviesApi.review(parsedId));
        ({ data: { results: recommend }} = await moviesApi.recommend(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: { cast, crew }} = await tvApi.cast(parsedId));
        ({ data: { backdrops: photo }} = await tvApi.photo(parsedId));
        ({ data: { results: review }} = await tvApi.review(parsedId));
        ({ data: { results: recommend }} = await tvApi.recommend(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      crew = crew.slice(0,10);
      cast = cast.slice(0,10);
      // paginate recommend by 10
      let idx = 0;
      let temp = []
      while (idx < recommend.length) {
        temp.push(recommend.slice(idx,idx+10));
        idx += 10;
      }
      recommend = temp;
      temp = []; 
      idx = 0;
      while (idx < review.length) {
        temp.push(review.slice(idx, idx+5));
        idx += 5;
      }
      review = temp;
      // combine all results
      result = {...result, cast, crew, photo, review, recommend };
      console.log(result);
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading, isMovie } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} isMovie={isMovie}/>;
  }
}