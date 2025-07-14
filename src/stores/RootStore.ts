import { action, flow, makeObservable, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { Api } from '../api/api';
import type { Movie } from '../types/Movie';

class RootStore {
  initialized = false;
  apiToken = '';
  movies: Movie[] = [];
  loading = false;

  constructor(initialToken: string = '') {
    makeObservable(this, {
      apiToken: observable,
      movies: observable,
      loading: observable,
      initialized: observable,
      setApiToken: action,
      getMovies: flow,
      initialize: flow,
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

      const movies = yield Api.get('films');

      runInAction(() => {
        this.movies = movies;
        this.loading = false;
        console.log('Movies loaded:', movies);
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        console.error('Error fetching movies:', error);
      });
    }
  }

  getMovieById = (id: string) => {
    const localMovie = this.movies.find((movie) => movie.id.toString() === id);

    if (localMovie) {
      return localMovie;
    }
    return Api.getById('films', id);
  };

  clearMovies = () => {
    this.movies = [];
  };

  initialize = flow(function* (this: RootStore) {
    if (this.initialized) return;

    try {
      if (this.apiToken) {
        yield this.getMovies();
      }

      runInAction(() => {
        this.initialized = true;
      });
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  });
}

export const rootStore = new RootStore(import.meta.env.VITE_API_TOKEN);
export const StoreContext = createContext(rootStore);
