import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default class TVContainer extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    page: 1,
    loading: true,
    error: null
  };
  
  async loadMore() {
    this.setState((state) => ({ page: state.page+1, loading: true }));
    try {
      const {
        data: { results: popular }
      } = await tvApi.popular(this.state.page);
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
        data: { results: topRated }
      } = await tvApi.topRated();
      const {
        data: { results: popular }
      } = await tvApi.popular(this.state.page);
      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();
      this.setState({ topRated, popular, airingToday });
    } catch {
      this.setState({
        error: "Can't find TV information."
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }
  
  render() {
    const { topRated, popular, airingToday, loading, error } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        loading={loading}
        error={error}
      />
    );
  }
}