import styles from './features.module.scss';
import features from './data';
import Feature from './feature';

const Features = () => (
  <section className={styles.root}>
    <h2 className={styles.title}>ВОЗМОЖНОСТИ И ПРЕИМУЩЕСТВА</h2>
    <div className={styles.list}>
      {features.map(({ label, icon }) => (
        <Feature key={label} label={label} icon={icon} />
      ))}
    </div>
  </section>
);

export default Features;
