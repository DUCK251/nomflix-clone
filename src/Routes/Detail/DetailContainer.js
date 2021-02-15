import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";
import { paginateArray } from "../../utils";

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
      isMovie: pathname.includes("/movie/"),
      isFav: false
    };
  }

  toggleFav() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const value = this.state.isMovie ? `m${id}` : `t${id}`;
    let Favs = localStorage.getItem("Favs");
    Favs = Favs ? Favs.split(',') : [];
    const isFav = Favs.findIndex((movieId) => movieId === value) !== -1
    if(isFav) {
      Favs = Favs.filter(Fav => Fav !== value);
    } else {
      Favs.push(value);
    }
    localStorage.setItem("Favs", Favs.toString());
    this.setState({isFav: !isFav});
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    
    // reload when url change 
    window.addEventListener('popstate', function (event) {
      window.location.reload();
    });

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
      recommend = paginateArray(recommend, 10);
      review = paginateArray(review, 5);
      // Check Fav
      let Favs = localStorage.getItem("Favs");
      Favs = Favs ? Favs.split(',') : [];
      let isFav = false;
      if(this.state.isMovie) {
        isFav = Favs.findIndex((Fav) => Fav === `m${id}`) !== -1
      } else {
        isFav = Favs.findIndex((Fav) => Fav === `t${id}`) !== -1
      }
      // combine all results
      result = {...result, cast, crew, photo, review, recommend };
      if(result.id === undefined) {
        return push("/");
      }
      console.log(result);
      this.setState({ loading: false, result, isFav });
    }
  }

  render() {
    const { result, error, loading, isMovie, isFav } = this.state;
    return <DetailPresenter
              result={result}
              error={error}
              loading={loading}
              isMovie={isMovie}
              isFav={isFav}
              toggleFav={this.toggleFav.bind(this)}
            />;
  }
}