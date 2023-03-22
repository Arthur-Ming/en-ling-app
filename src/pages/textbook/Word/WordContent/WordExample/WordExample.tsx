import styles from '../index.module.scss';

type Props = {
  textExample: string;
  textExampleTranslate: string;
  audio: string;
};

const WordExample = ({ textExample, textExampleTranslate }: Props) => {
  return (
    <div>
      <h4 dangerouslySetInnerHTML={{ __html: textExample }}></h4>
      <h4 className={styles.text}>{textExampleTranslate}</h4>
    </div>
  );
};

export default WordExample;
