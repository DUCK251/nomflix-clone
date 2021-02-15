import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class HomeContainer extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    page: 1,
    error: null,
    loading: true
  };
  
  async loadMore() {
    this.setState((state) => ({ page: state.page+1, loading: true }));
    try {
      const {
        data: { results: popular }
      } = await moviesApi.popular(this.state.page);
      this.setState((state) => ({ popular: state.popular.concat(popular)}));
    } catch {
      this.setState({
        error: "Can't find movie information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  handleScroll = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.scrollHeight
    ) {
      this.loadMore();
    }
  }

  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    try {
      const {
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming }
      } = await moviesApi.upcoming();
      const {
        data: { results: popular }
      } = await moviesApi.popular(this.state.page);
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movie information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}