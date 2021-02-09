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
  popular: () => api.get("movie/popular"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
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
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
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
};