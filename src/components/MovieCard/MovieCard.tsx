import { Card, EllipsisText, Headline } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/Movie';
import { Rating } from '../Rating/Rating';
import styles from './MovieCard.module.scss';
export const MovieCard = ({ id, imgUrl, title, year, rating }: Movie) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className={styles.card} onClick={() => navigate(`/movies/${id}`)}>
        <img src={imgUrl} width={'100%'} alt="img" />
        <div className={styles.content}>
          <Headline level="1">
            <EllipsisText>{title}</EllipsisText>
          </Headline>
          <div className={styles.content__info}>
            <Headline level="2" className={styles.year}>
              {year}
            </Headline>
            <Rating rating={rating}></Rating>
          </div>
        </div>
      </Card>
    </>
  );
};
