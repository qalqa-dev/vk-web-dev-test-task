import type { Movie } from '../../types/Movie';
import { MovieCard } from '../MovieCard/MovieCard';
import styles from './MovieList.module.scss';

export const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          imgUrl={movie.imgUrl}
          title={movie.title}
          year={movie.year}
          rating={movie.rating}
        />
      ))}
    </ul>
  );
};
