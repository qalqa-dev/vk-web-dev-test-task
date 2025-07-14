import { Icon28Like, Icon28LogoVk } from '@vkontakte/icons';
import { Flex, Title } from '@vkontakte/vkui';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

export const Navbar = () => (
  <nav className={styles.navbar}>
    <Link to={'/'}>
      <Flex>
        <Icon28LogoVk />
        <Title>ВКино</Title>
      </Flex>
    </Link>
    <Link to={'/favorites'}>
      <Icon28Like />
    </Link>
  </nav>
);
