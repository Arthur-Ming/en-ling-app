import styles from './feature.module.scss';
import text from './text';

type Props = {
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const Feature = ({ label, icon: Icon }: Props) => (
  <div className={styles.root}>
    <Icon className={styles.icon} />
    <div className={styles.text}>{text[label]}</div>
  </div>
);

export default Feature;
