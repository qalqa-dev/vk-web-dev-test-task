interface Genre {
  name: string;
}

interface Country {
  name: string;
}

interface ReleaseYear {
  start: number;
  end: number;
}

interface Poster {
  url: string;
  previewUrl: string;
}

interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

interface Votes {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

interface MovieDoc {
  id: number;
  name: string | null;
  alternativeName: string | null;
  enName: string | null;
  type: string;
  typeNumber: number;
  year: number;
  description: string | null;
  shortDescription: string | null;
  status: string | null;
  rating: Rating;
  votes: Votes;
  movieLength: number | null;
  totalSeriesLength: number | null;
  seriesLength: number | null;
  ratingMpaa: string | null;
  ageRating: string | null;
  genres: Genre[];
  countries: Country[];
  releaseYears?: ReleaseYear[];
  top10: number | null;
  top250: number | null;
  isSeries: boolean;
  ticketsOnSale: boolean;
  poster?: Poster;
}

export interface MovieResponse {
  movie: {
    docs: MovieDoc[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}
