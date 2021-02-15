import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class SearchContainer extends React.Component {
  state = {
    movieResults: null,
    moviePage: 0,
    movieTotalPage: 0,
    moviePageArray: [],
    tvResults: null,
    tvPage: 0,
    tvTotalPage: 0,
    tvPageArray: [],
    searchTerm: "",
    loading: false,
    error: null
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ moviePage: 1, tvPage: 1 }, () => {
      if (searchTerm !== "") {
        this.searchTv();
        this.searchMovie();
      }
    });
  };

  updateTerm = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      searchTerm: value,
      movieResults: null,
      moviePage: 1,
      movieTotalPage: 0,
      moviePageArray: [],
      tvResults: null,
      tvPage: 1,
      tvTotalPage: 0,
      tvPageArray: [],
    });
  };

  searchMovie = async () => {
    const { searchTerm, moviePage } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults, total_pages: movieTotalPage }
      } = await moviesApi.search(searchTerm, moviePage);
      const moviePageArray = this.getPageArray(moviePage, movieTotalPage);
      this.setState({ movieResults, movieTotalPage, moviePageArray });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchTv = async () => {
    const { searchTerm, tvPage } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: tvResults, total_pages: tvTotalPage }
      } = await tvApi.search(searchTerm, tvPage);
      const tvPageArray = this.getPageArray(tvPage, tvTotalPage);
      this.setState({ tvResults, tvTotalPage, tvPageArray });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  }

  updateMoviePage = (event) => {
    const {
      target: { innerText }
    } = event;
    this.setState({ moviePage: innerText }, () => {
      this.searchMovie();
    });
  }

  updateTvPage = (event) => {
    const {
      target: { innerText }
    } = event;
    this.setState({ tvPage: innerText }, () => {
      this.searchTv();
    });
  }

  getPageArray = (page, totalPage) => {
    page = parseInt(page);
    totalPage = parseInt(totalPage);
    let ret = [];
    let minPage = Math.max(page-4, 1);
    let maxPage = Math.min(page+5, totalPage);
    if ((maxPage-minPage) < 9) {
      while(maxPage < totalPage && ((maxPage-minPage) < 9)) {
        maxPage += 1;
      }
    }
    if (maxPage - minPage < 9) {
      while(minPage > 1 && ((maxPage-minPage) < 9)) {
        minPage -= 1;
      }
    }
    for(let i=minPage; i<=maxPage; ++i) {
      ret.push(i);
    }
    return ret;
  }

  render() {
    const { 
      movieResults,
      moviePage,
      movieTotalPage,
      moviePageArray,
      tvResults,
      tvPage,
      tvTotalPage,
      tvPageArray,
      searchTerm, 
      loading, 
      error 
    } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        moviePage={moviePage}
        movieTotalPage={movieTotalPage}
        moviePageArray={moviePageArray}
        tvPage={tvPage}
        tvTotalPage={tvTotalPage}
        tvPageArray={tvPageArray}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
        updateMoviePage={this.updateMoviePage}
        updateTvPage={this.updateTvPage}
      />
    );
  }
}