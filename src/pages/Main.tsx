import { CardGrid, Group, Header, Skeleton } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useEffect } from 'react';
import { Filter } from '../components/Filter/Filter';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { StoreContext } from '../stores/RootStore';

export const Main = observer(() => {
  const store = useContext(StoreContext);

  const movies = store.movies;

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !store.loading) {
      store.page += 1;
      if (store.filters.genres || store.filters.year || store.filters.rating) {
        store.getMoviesWithFilters();
      } else if (store.searchInputValue) {
        store.getMoviesWithQuery();
      } else {
        store.getMovies();
      }
    }
  }, [store]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Group header={<Header size="xl">Главная</Header>}>
      <Filter />
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
      {store.loading && (
        <CardGrid size="s">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} height="400px" width="100%" />
          ))}
        </CardGrid>
      )}
    </Group>
  );
});
