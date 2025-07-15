import { action, flow, makeObservable, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { Api } from '../api/api';
import type { Genre, MovieDoc, rangeType } from '../types/Response';
import type { FilterType } from '../types/RootStore';

class RootStore {
  initialized = false;
  apiToken = '';
  movies: MovieDoc[] = [];
  loading = false;
  filters: FilterType = {};
  availableGenres: Genre[] = [];

  constructor(initialToken: string = '') {
    makeObservable(this, {
      apiToken: observable,
      movies: observable,
      loading: observable,
      initialized: observable,
      filters: observable,
      availableGenres: observable,
      setApiToken: action,
      getAllGenres: action,
      getMovies: flow,
      initialize: flow,
      getMoviesWithQuery: flow,
    });

    if (initialToken) {
      this.setApiToken(initialToken);
    }
  }

  setApiToken = (token: string) => {
    this.apiToken = token;
  };

  *getMovies(): Generator {
    try {
      this.loading = true;
      const movies = yield Api.get('v1.4/movie');

      runInAction(() => {
        this.movies = movies.docs;
        this.loading = false;
        console.log('Movies loaded:', this.movies);
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        console.error('Error fetching movies:', error);
      });
    }
  }

  getMovieById(id: number): MovieDoc | null {
    const currentMovie = this.movies.find((movie) => movie.id === id);
    console.log('Movie loaded from cache:', currentMovie);
    return currentMovie || null;
  }

  setGenres = (genres: Genre[]) => {
    this.filters.genres = genres;
    console.log('Filters updated:', this.filters);
  };

  setYear = (year: rangeType) => {
    this.filters.year = year;
  };

  setRating = (rating: rangeType) => {
    this.filters.rating = rating;
  };

  clearMovies = () => {
    this.movies = [];
  };

  *getMoviesWithQuery(query?: string, page: number = 1, limit: number = 10) {
    try {
      this.loading = true;
      const filterParams = {
        genres: this.filters?.genres,
        year: this.filters?.year,
        rating: this.filters?.rating,
      };

      const queryParams = new URLSearchParams({
        // query: query || '',
        page: page.toString(),
        limit: limit.toString(),
        year:
          JSON.stringify(filterParams.year?.start) +
          '-' +
          JSON.stringify(filterParams.year?.end),
        'rating.kp':
          JSON.stringify(filterParams.rating?.start) +
          '-' +
          JSON.stringify(filterParams.rating?.end),
        ...(filterParams.genres?.length && {
          'genres.name': filterParams.genres.map((e) => e.name).join(','),
        }),
      })
        .toString()
        .replace(/%2C/g, ',');

      const movies: { docs: MovieDoc[] } = yield Api.get(
        `v1.4/movie?${queryParams}`,
      );

      this.loading = false;
      this.movies = movies.docs;
      console.log('Movies loaded:', this.movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.loading = false;
    }
  }

  getAllGenres = async () => {
    try {
      const genres: Genre[] = await Api.getAllPossibleValuesByField(
        'v1/movie',
        'genres.name',
      );
      this.availableGenres = genres;
      console.log('Genres loaded:', genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  initialize = flow(
    function* (this: RootStore) {
      if (this.initialized) return;

      try {
        if (this.apiToken) {
          yield this.getMovies();
        }
        yield this.getAllGenres();

        this.initialized = true;
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    }.bind(this),
  );
}

export const rootStore = new RootStore(import.meta.env.VITE_API_TOKEN);
export const StoreContext = createContext(rootStore);
