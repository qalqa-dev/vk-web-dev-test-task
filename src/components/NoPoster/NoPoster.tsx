import { Icon56LogoVk } from '@vkontakte/icons';
import { Flex } from '@vkontakte/vkui';
import styles from './NoPoster.module.scss';

export const NoPoster = () => {
  return (
    <div className={styles['no-poster__container']}>
      <Flex
        className={styles['no-poster__flex']}
        align="center"
        justify="center"
      >
        <Icon56LogoVk width={100} height={100} color="#fff" />
      </Flex>
    </div>
  );
};
