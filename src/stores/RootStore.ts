import { action, flow, makeObservable, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { Api } from '../api/api';
import type { Movie } from '../types/Movie';
import type { Genre, MovieDoc, rangeType } from '../types/Response';
import type { FilterType } from '../types/RootStore';

class RootStore {
  initialized: boolean = false;
  apiToken: string = '';
  movies: Movie[] = [];
  loading = false;
  filters: FilterType = {};
  availableGenres: Genre[] = [];
  favorites: Movie[] = [];
  page: number = 1;
  limit: number = 10;

  constructor(initialToken: string = '') {
    makeObservable(this, {
      apiToken: observable,
      movies: observable,
      loading: observable,
      initialized: observable,
      filters: observable,
      availableGenres: observable,
      page: observable,
      limit: observable,
      favorites: observable,

      setApiToken: action,
      getAllGenres: action,
      setGenres: action,
      setYear: action,
      setRating: action,
      setFavorites: action,

      getMovies: flow,
      initialize: flow,
      getMoviesWithQuery: flow,
      getMoviesWithFilters: flow,
      getFavorites: flow,
    });

    if (initialToken) {
      this.setApiToken(initialToken);
    }
  }

  setApiToken = (token: string) => {
    this.apiToken = token;
  };

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

  setFavorites = (favorites: Movie[]) => {
    this.favorites = favorites;
  };

  addToFavorites = (movie: Movie) => {
    this.favorites.push(movie);
    console.log('Favorites updated:', this.favorites);
  };

  removeFromFavorites = (movieId: number) => {
    this.favorites = this.favorites.filter((movie) => movie.id !== movieId);
    console.log('Favorites updated:', this.favorites);
  };

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

  getMovieById(id: number): Movie | null {
    const currentMovie = this.movies.find((movie) => movie.id === id);
    console.log('Movie loaded from cache:', currentMovie);
    return currentMovie || null;
  }

  *getMovies(): Generator {
    try {
      this.loading = true;
      const movies = yield Api.get('v1.4/movie/search');

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

  *getMoviesWithQuery(query: string) {
    try {
      this.loading = true;
      const queryParams = new URLSearchParams({
        page: this.page.toString(),
        limit: this.limit.toString(),
        query,
      });

      ['id', 'name', 'poster', 'alternativeName', 'description'].forEach(
        (field) => {
          queryParams.append('selectFields', field);
        },
      );

      const movies: { docs: MovieDoc[] } = yield Api.get(
        `v1.4/movie/search?${queryParams}`,
      );

      this.loading = false;
      this.movies = movies.docs;
      console.log('Movies loaded:', this.movies);
    } catch (error) {
      this.loading = false;
      console.error('Error fetching movies:', error);
    }
  }

  *getMoviesWithFilters() {
    try {
      console.log('nig');
      this.loading = true;
      const filterParams = {
        genres: this.filters?.genres,
        year: this.filters?.year,
        rating: this.filters?.rating,
      };

      const queryParams = new URLSearchParams({
        page: this.page.toString(),
        limit: this.limit.toString(),
      });

      if (filterParams.genres) {
        queryParams.append(
          'genres.name',
          filterParams.genres.map((e) => e.name).join(','),
        );
      }

      if (filterParams.year) {
        if (filterParams.year.start && filterParams.year.end) {
          queryParams.append(
            'year',
            filterParams.year.start + '-' + filterParams.year.end,
          );
        } else if (filterParams.year.start) {
          queryParams.append('year', filterParams.year.start.toString());
        } else if (filterParams.year.end) {
          queryParams.append('year', filterParams.year.end.toString());
        }
      }

      if (filterParams.rating) {
        if (filterParams.rating.start && filterParams.rating.end) {
          queryParams.append(
            'rating.kp',
            filterParams.rating.start + '-' + filterParams.rating.end,
          );
        } else if (filterParams.rating.start) {
          queryParams.append('rating.kp', filterParams.rating.start.toString());
        } else if (filterParams.rating.end) {
          queryParams.append('rating.kp', filterParams.rating.end.toString());
        }
      }

      ['id', 'name', 'poster', 'alternativeName', 'description'].forEach(
        (field) => {
          queryParams.append('selectFields', field);
        },
      );

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

  *getFavorites() {}

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
