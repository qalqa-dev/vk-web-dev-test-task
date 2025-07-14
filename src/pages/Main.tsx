import { CardGrid, Group, Header } from '@vkontakte/vkui';
import { useMemo } from 'react';
import { Filter } from '../components/Filter/Filter';
import { MovieCard } from '../components/MovieCard/MovieCard';
import type { Movie } from '../types/Movie';

export const Main = ({ movies }: { movies: Movie[] }) => {
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
    <Group header={<Header size="xl">Главная</Header>}>
      <Filter chipGroups={groups} />
      <CardGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
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
