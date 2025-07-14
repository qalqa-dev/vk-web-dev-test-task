import { Icon24StarsOutline, Icon28StarsOutline } from '@vkontakte/icons';
import {
  AdaptiveIconRenderer,
  Card,
  EllipsisText,
  Headline,
} from '@vkontakte/vkui';
import clsx from 'clsx';
import type { Movie } from '../../types/Movie';
import styles from './MovieCard.module.scss';
export const MovieCard = ({
  imgUrl,
  title,
  year,
  rating,
}: Omit<Movie, 'id'>) => {
  const ratingCondition = {
    [styles['rating--low']]: rating < 5,
    [styles['rating--mid']]: rating >= 5 && rating < 8,
    [styles['rating--high']]: rating >= 8,
  };
  return (
    <>
      <Card>
        <img src={imgUrl} width={'100%'} alt="img" />
        <div className={styles.content}>
          <Headline level="1">
            <EllipsisText>{title}</EllipsisText>
          </Headline>
          <div className={styles.content__info}>
            <Headline level="2" className={styles.year}>
              {year}
            </Headline>
            <div className={clsx(styles.rating, ratingCondition)}>
              <AdaptiveIconRenderer
                IconCompact={Icon24StarsOutline}
                IconRegular={Icon28StarsOutline}
              />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
