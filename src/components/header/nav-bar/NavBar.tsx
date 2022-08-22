import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './nav-bar.module.scss';
import { ReactComponent as TextbookIcon } from './textbook.svg';
import { ReactComponent as StatisticsIcon } from './statistics.svg';
import { ReactComponent as GamesIcon } from './games.svg';

const links = [
  {
    link: 'textbook',
    icon: TextbookIcon,
  },
  {
    link: 'games',
    icon: GamesIcon,
  },
  {
    link: 'statistics',
    icon: StatisticsIcon,
  },
];

const NavBar = () => (
  <nav>
    <ul className={styles.list}>
      {links.map(({ link, icon: Icon }) => (
        <li key={link}>
          <NavLink
            to={`/${link}`}
            className={({ isActive }) => classNames(styles.link, { [styles.active]: isActive })}
          >
            <Icon className={styles[link]} />
            <span className={styles.text}>{link}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavBar;
