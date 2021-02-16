import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "9922072d7050b3c0d06742b42c0fc086",
    language: "en-US"
  }
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: (page = 1) => api.get(`movie/popular?page=${page}`),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: (term, page = 1) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
        page
      }
    }),
  cast: id => api.get(`movie/${id}/credits`),
  photo: id => api.get(`movie/${id}/images`, {
    params: {
      include_image_language: "en,null"
    }
  }),
  review: id => api.get(`movie/${id}/reviews`),
  recommend: id => api.get(`movie/${id}/recommendations`),
  collection: collection_id => api.get(`collection/${collection_id}`),
  discover: query => api.get(`discover/movie?${query}`),
  genres: () => api.get("/genre/movie/list"),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: (page = 1) => api.get(`tv/popular?page=${page}`),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: (term, page = 1) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
        page
      }
    }),
  cast: id => api.get(`tv/${id}/credits`),
  photo: id => api.get(`tv/${id}/images`, {
    params: {
      include_image_language: "en,null"
    }
  }),
  review: id => api.get(`tv/${id}/reviews`),
  recommend: id => api.get(`tv/${id}/recommendations`),
  season: (tv_id, season_number) => api.get(`/tv/${tv_id}/season/${season_number}`),
  discover: query => api.get(`discover/tv?${query}`),
  genres: () => api.get("/genre/tv/list"),
};