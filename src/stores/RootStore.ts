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
  searchInputValue: string = '';
  page: number = 1;
  limit: number = 12;

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
      searchInputValue: observable,

      setApiToken: action,
      getAllGenres: action,
      setGenres: action,
      setYear: action,
      setRating: action,
      setFavorites: action,
      setMovies: action,
      setSearchInputValue: action,
      resetPage: action,

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

  resetPage = () => {
    this.page = 1;
  };

  setGenres = (genres: Genre[]) => {
    this.filters.genres = genres;
  };

  setYear = (year: rangeType) => {
    this.filters.year = year;
  };

  setRating = (rating: rangeType) => {
    this.filters.rating = rating;
  };

  setMovies = (movies: Movie[]) => {
    this.movies = movies;
  };

  clearMovies = () => {
    this.movies = [];
  };

  setFavorites = (favorites: Movie[]) => {
    this.favorites = favorites;
  };

  setSearchInputValue = (value: string) => {
    this.searchInputValue = value;
  };

  addToFavorites = (movie: Movie) => {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites: Movie[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    if (!favorites.some((fav) => fav.id === movie.id)) {
      favorites.push(movie);

      this.setFavorites(favorites);

      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Favorites updated:', favorites);
    }
  };

  removeFromFavorites = (movieId: number) => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      let favorites: Movie[] = JSON.parse(storedFavorites);

      favorites = favorites.filter((fav) => fav.id !== movieId);

      this.setFavorites(favorites);

      if (favorites.length > 0) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } else {
        localStorage.removeItem('favorites');
      }

      console.log('Favorites updated:', favorites);
    }
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
    const cachedMovie = this.favorites.find((movie) => movie.id === id);
    console.log('Movie loaded from cache:', currentMovie);
    return currentMovie || cachedMovie || null;
  }

  *getMovies(): Generator {
    const queryParams = new URLSearchParams({
      page: this.page.toString(),
      limit: this.limit.toString(),
    });

    try {
      this.loading = true;
      const movies = yield Api.get(`v1.4/movie?${queryParams}`);

      runInAction(() => {
        if (this.page === 1) {
          this.setMovies(movies.docs);
        } else {
          this.setMovies([...this.movies, ...movies.docs]);
        }
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

  *getMoviesWithQuery() {
    try {
      this.loading = true;
      const queryParams = new URLSearchParams({
        page: this.page.toString(),
        limit: this.limit.toString(),
        query: this.searchInputValue,
      });

      const movies: { docs: MovieDoc[] } = yield Api.get(
        `v1.4/movie/search?${queryParams}`,
      );

      runInAction(() => {
        if (this.page === 1) {
          this.setMovies(movies.docs);
        } else {
          this.setMovies([...this.movies, ...movies.docs]);
        }
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

  *getMoviesWithFilters() {
    try {
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

      [
        'id',
        'name',
        'alternativeName',
        'description',
        'rating',
        'year',
        'poster',
      ].forEach((field) => {
        queryParams.append('selectFields', field);
      });

      if (filterParams.genres && filterParams.genres.length > 0) {
        queryParams.append(
          'genres.name',
          filterParams.genres.map((e) => e.name).join(','),
        );
      }

      if (filterParams.year) {
        if (
          (filterParams.year.start || filterParams.year.start === 0) &&
          filterParams.year.end
        ) {
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
        if (
          (filterParams.rating.start || filterParams.rating.start === 0) &&
          filterParams.rating.end
        ) {
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

      const movies: { docs: MovieDoc[] } = yield Api.get(
        `v1.4/movie?${queryParams}`,
      );

      runInAction(() => {
        if (this.page === 1) {
          this.setMovies(movies.docs);
        } else {
          this.setMovies([...this.movies, ...movies.docs]);
        }
        this.loading = false;
        console.log('Movies loaded:', this.movies);
      });
    } catch (error) {
      runInAction(() => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      });
    }
  }

  *getFavorites() {
    try {
      this.loading = true;
      const favorites: string | null = yield localStorage.getItem('favorites');
      if (favorites) {
        this.favorites = JSON.parse(favorites);
      }
      this.loading = false;
      console.log('Favorites loaded:', this.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      this.loading = false;
    }
  }

  initialize = flow(
    function* (this: RootStore) {
      if (this.initialized) return;

      try {
        if (this.apiToken) {
          yield this.getMovies();
        }
        yield this.getAllGenres();

        yield this.getFavorites();

        this.initialized = true;
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    }.bind(this),
  );
}

export const rootStore = new RootStore(import.meta.env.VITE_API_TOKEN);
export const StoreContext = createContext(rootStore);
