import { AdaptiveIconRenderer } from '@vkontakte/vkui';
import clsx from 'clsx';

import { Icon24StarsOutline, Icon28StarsOutline } from '@vkontakte/icons';
import styles from './Rating.module.scss';

export const Rating = ({ rating }: { rating: number }) => {
  const ratingCondition = {
    [styles['rating--low']]: rating < 5,
    [styles['rating--mid']]: rating >= 5 && rating < 8,
    [styles['rating--high']]: rating >= 8,
  };

  return (
    <div className={clsx(styles.rating, ratingCondition)}>
      <AdaptiveIconRenderer
        IconCompact={Icon24StarsOutline}
        IconRegular={Icon28StarsOutline}
      />
      <span>{rating}</span>
    </div>
  );
};
