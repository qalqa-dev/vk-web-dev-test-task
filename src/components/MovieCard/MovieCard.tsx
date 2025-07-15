import { Card, EllipsisText, Headline } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';
import type { MovieDoc } from '../../types/Response';
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

  // function calculateAverageRating(rating: RatingType): number {
  //   const values = Object.values(rating);
  //   const nonZeroValues = values.filter((value) => value !== 0);
  //   const nonZeroValuesNormalized = nonZeroValues
  //     .filter((value) => value > 10)
  //     .map((e) => e / 10);
  //   const merged = [...nonZeroValuesNormalized, ...nonZeroValues];

  //   if (merged.length === 0) return 0;

  //   const sum = merged.reduce((acc, value) => acc + value, 0);
  //   return Number((sum / merged.length).toFixed(1));
  // }

  // const [averageRating, setAverageRating] = useState(0);

  // useEffect(() => {
  //   if (rating) {
  //     setAverageRating(calculateAverageRating(rating));
  //   }
  // }, [rating]);

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
            <Rating rating={Number(rating?.kp?.toFixed(1)) || 0}></Rating>
          </div>
        </div>
      </Card>
    </>
  );
};
