import { CardGrid, Group } from '@vkontakte/vkui';
import { useMemo } from 'react';
import type { Movie } from '../../types/Movie';
import { Filter } from '../Filter/Filter';
import { MovieCard } from '../MovieCard/MovieCard';
import styles from './MovieList.module.scss';

export const MovieList = ({ movies }: { movies: Movie[] }) => {
  const groups = useMemo(
    () => [
      {
        value: '1',
        label: 'Arctic Monkeys',
      },
      {
        value: '2',
        label: 'Звери',
        disabled: true,
      },
      {
        value: '3',
        label: 'Depeche Mode',
      },
      {
        value: '5',
        label: 'Linkin Park',
      },
    ],
    [],
  );
  return (
    <Group className={styles.list}>
      <Filter chipGroups={groups} />
      <CardGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            imgUrl={movie.imgUrl}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
          />
        ))}
      </CardGrid>
    </Group>
  );
};
