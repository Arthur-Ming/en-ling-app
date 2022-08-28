import styles from './feature.module.scss';
import text from './text';

interface IProps {
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Feature = ({ label, icon: Icon }: IProps) => (
  <div className={styles.root}>
    <Icon className={styles.icon} />
    <div className={styles.text}>{text[label]}</div>
  </div>
);

export default Feature;
