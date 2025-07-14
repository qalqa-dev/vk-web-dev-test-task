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
import { Rating } from '../components/Rating/Rating';
import { StoreContext } from '../stores/RootStore';
import type { MovieDoc } from '../types/Response';

export const MovieDetails = observer(() => {
  const { id } = useParams();

  const store = useContext(StoreContext);

  const [movie, setMovie] = useState<MovieDoc | null>(null);

  useEffect(() => {
    if (id) {
      const movie = store.getMovieById(+id);
      setMovie(movie);
    }
  }, [id, store]);

  if (!movie) return <div>Фильм не найден</div>;

  return (
    <Group style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Flex justify="center">
        <img
          width={218}
          height={318}
          src={
            movie.poster?.url || movie.poster?.previewUrl || '/no-poster.webp'
          }
          alt={(movie.name || movie.alternativeName) + 'image'}
        />
        <Div>
          <Flex gap="m">
            <DisplayTitle style={{ fontSize: '32px' }} level="1">
              {movie.name || movie.alternativeName}
            </DisplayTitle>
            <Rating rating={movie.rating.kp} />
          </Flex>

          <Title level="2">О фильме</Title>
          <SimpleGrid columns={2} margin="auto-block">
            <Headline>Год выпуска</Headline>
            <Paragraph>{movie.year}</Paragraph>

            <Headline>Жанр</Headline>
            <Paragraph>
              {movie.genres.map(({ name: label }) => label).join(', ')}
            </Paragraph>

            {/* <Headline>Режиссер</Headline>
            <Paragraph>{movie.director}</Paragraph>

            <Headline>Композитор</Headline>
            <Paragraph>{movie.composer}</Paragraph> */}
          </SimpleGrid>
          <div style={{ padding: '10px 0' }}>
            <Paragraph>{movie.description}</Paragraph>
          </div>
          <ToolButton IconCompact={Icon24Like} IconRegular={Icon28Like}>
            Добавить в понравившиеся
          </ToolButton>
        </Div>
      </Flex>
    </Group>
  );
});
