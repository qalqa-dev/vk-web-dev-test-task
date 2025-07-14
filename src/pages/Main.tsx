import { CardGrid, Group, Header } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import { useContext, useMemo } from 'react';
import { Filter } from '../components/Filter/Filter';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { StoreContext } from '../stores/RootStore';

export const Main = observer(() => {
  const store = useContext(StoreContext);

  const movies = store.movies;

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
            poster={movie.poster}
            name={movie.name}
            alternativeName={movie.alternativeName}
            year={movie.year}
            rating={movie.rating}
          />
        ))}
      </CardGrid>
    </Group>
  );
});
