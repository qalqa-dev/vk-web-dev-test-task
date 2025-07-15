import { Group, Header } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { StoreContext } from '../../stores/RootStore';
import styles from './Favorites.module.scss';

export const Favorites = observer(() => {
  const store = useContext(StoreContext);

  const favorites = store.favorites;

  return (
    <Group header={<Header size="xl">Понравившиеся</Header>}>
      <div className={styles['movies-grid']}>
        {favorites ? (
          favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster}
              name={movie.name}
              alternativeName={movie.alternativeName}
              year={movie.year}
              rating={movie.rating}
            />
          ))
        ) : (
          <p>Понравившихся фильмов нет</p>
        )}
      </div>
    </Group>
  );
});
