import { Card, EllipsisText, Headline } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';
import type { MovieDoc } from '../../types/Response';
import { NoPoster } from '../NoPoster/NoPoster';
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

  return (
    <>
      <Card className={styles.card} onClick={() => navigate(`/movies/${id}`)}>
        {poster?.url ? (
          <img src={poster?.url} width={218} height={318} alt="img" />
        ) : (
          <NoPoster />
        )}
        <div className={styles.content}>
          <Headline level="1">
            <EllipsisText>{name || alternativeName}</EllipsisText>
          </Headline>
          <div className={styles.content__info}>
            <Headline level="2" className={styles.year}>
              {year}
            </Headline>
            <Rating rating={Number(rating?.kp?.toFixed(1))}></Rating>
          </div>
        </div>
      </Card>
    </>
  );
};
