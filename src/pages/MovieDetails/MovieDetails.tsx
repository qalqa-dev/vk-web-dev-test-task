import { Icon24Like, Icon28Like } from '@vkontakte/icons';
import {
  DisplayTitle,
  Div,
  Flex,
  Group,
  Headline,
  Paragraph,
  SimpleGrid,
  Title,
  ToolButton,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NoPoster } from '../../components/NoPoster/NoPoster';
import { Rating } from '../../components/Rating/Rating';
import { StoreContext } from '../../stores/RootStore';
import type { Movie } from '../../types/Movie';
import styles from './MovieDetails.module.scss';

export const MovieDetails = observer(() => {
  const { id } = useParams();
  const store = useContext(StoreContext);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      const movie = store.getMovieById(+id);
      setMovie(movie);
    }
  }, [id, store]);

  if (!movie) return <div>Фильм не найден</div>;

  const isFavorite = store.favorites.some((fav) => fav.id === movie.id);

  const favoriteButtonHandle = () => {
    if (isFavorite) {
      store.removeFromFavorites(movie.id);
    } else {
      store.addToFavorites(movie);
    }
  };

  return (
    <Group className={styles.card}>
      <div className={styles.flex}>
        {movie.poster?.url || movie.poster?.previewUrl ? (
          <img
            className={styles['movie-poster']}
            src={movie.poster?.url || movie.poster?.previewUrl}
            alt={(movie.name || movie.alternativeName) + 'image'}
          />
        ) : (
          <NoPoster />
        )}
        <Div>
          <Flex gap="m">
            <DisplayTitle style={{ fontSize: '32px' }} level="1">
              {movie.name || movie.alternativeName}
            </DisplayTitle>
            <Rating rating={Number(movie.rating.kp.toFixed(1))} />
          </Flex>

          <Title level="2">О фильме</Title>
          <SimpleGrid columns={2} margin="auto-block">
            <Headline>Год выпуска</Headline>
            <Paragraph>{movie.year}</Paragraph>

            <Headline>Жанр</Headline>
            <Paragraph>
              {movie.genres
                ? movie.genres.map(({ name: label }) => label).join(', ')
                : 'Жанр не определен'}
            </Paragraph>
          </SimpleGrid>
          <div style={{ padding: '10px 0' }}>
            <Paragraph>{movie.description}</Paragraph>
          </div>
          <ToolButton
            onClick={favoriteButtonHandle}
            IconCompact={Icon24Like}
            IconRegular={Icon28Like}
            mode={isFavorite ? 'primary' : 'secondary'}
          >
            {isFavorite
              ? 'Удалить из понравившихся'
              : 'Добавить в понравившиеся'}
          </ToolButton>
        </Div>
      </div>
    </Group>
  );
});
