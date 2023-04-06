import styles from './index.module.scss';
import { useNavigate } from 'react-router';
import { GiSoundWaves } from 'react-icons/gi';
import { ReactComponent as SprintIcon } from './sprint.svg';

const gameItems = [
  {
    title: 'Спринт',
    description: `Это игра на время.
    Твоя задача - выбрать правильный перевод слов.
    Чем больше ты дашь правильных ответов за 60 секунд, тем больше баллов получишь.`,
    icon: SprintIcon,
    link: 'sprint',
  },
  {
    title: 'Аудиовызов',
    description: `Это игра улучшает восприятие речи на слух.
    Твоя задача - выбрать правильный перевод слов.
    Чем больше ты дашь правильных ответов, тем больше баллов получишь.`,
    icon: GiSoundWaves,
    link: 'audiochallenge',
  },
];

const GamesEntry = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.root}>
      <div className={styles.box}>
        {gameItems.map(({ title, description, link, icon: Icon }) => (
          <div key={link} className={styles.item} onClick={() => navigate(link)}>
            <div className={styles.header}>
              <h4 className={styles.title}>{title}</h4>
              <Icon className={styles.icon} />
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GamesEntry;
