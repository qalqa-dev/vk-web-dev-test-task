import { action, flow, makeObservable, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { Api } from '../api/api';
import type { MovieDoc } from '../types/Response';

class RootStore {
  initialized = false;
  apiToken = '';
  movies: MovieDoc[] = [];
  loading = false;
  currentMovie: MovieDoc | null = null;

  constructor(initialToken: string = '') {
    makeObservable(this, {
      apiToken: observable,
      movies: observable,
      loading: observable,
      initialized: observable,
      setApiToken: action,
      getMovies: flow,
      initialize: flow,
      currentMovie: observable,
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
      const movies = yield Api.get('movie');

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

  // *getMovieById(id: number): Generator {
  //   try {
  //     const localMovie = this.movies.find((movie) => movie.id === id);

  //     if (localMovie) {
  //       runInAction(() => {
  //         this.currentMovie = localMovie;
  //         console.log('Movie loaded from cache:', this.currentMovie);
  //       });
  //       return;
  //     }

  //     this.loading = true;
  //     const movie = yield Api.getById<MovieDoc>('films', id);

  //     runInAction(() => {
  //       this.currentMovie = movie.docs[0];
  //       this.loading = false;
  //     });
  //   } catch {
  //     runInAction(() => {
  //       this.loading = false;
  //       this.currentMovie = null;
  //     });
  //   }
  // }

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
