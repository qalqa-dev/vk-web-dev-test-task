import { Card, EllipsisText, Headline } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MovieDoc, RatingType } from '../../types/Response';
import { Rating } from '../Rating/Rating';
import styles from './MovieCard.module.scss';
export const MovieCard = ({
  id,
  poster,
  name,
  alternativeName,
  year,
  rating,
}: Partial<MovieDoc>) => {
  const navigate = useNavigate();

  function calculateAverageRating(rating: RatingType): number {
    const values = Object.values(rating);
    const nonZeroValues = values.filter((value) => value !== 0);

    if (nonZeroValues.length === 0) return 0;

    const sum = nonZeroValues.reduce((acc, value) => acc + value, 0);
    return sum / nonZeroValues.length;
  }

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (rating) {
      setAverageRating(calculateAverageRating(rating));
    }
  }, [rating]);

  return (
    <>
      <Card className={styles.card} onClick={() => navigate(`/movies/${id}`)}>
        <img
          src={poster?.url || '/no-poster.webp'}
          width={218}
          height={318}
          alt="img"
        />
        <div className={styles.content}>
          <Headline level="1">
            <EllipsisText>{name || alternativeName}</EllipsisText>
          </Headline>
          <div className={styles.content__info}>
            <Headline level="2" className={styles.year}>
              {year}
            </Headline>
            {averageRating > 0 && <Rating rating={averageRating}></Rating>}
          </div>
        </div>
      </Card>
    </>
  );
};
