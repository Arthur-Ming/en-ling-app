import styles from '../index.module.scss';

type Props = {
  textMeaning: string;
  textMeaningTranslate: string;
  audio: string;
};

const WordMeaning = ({ textMeaning, textMeaningTranslate }: Props) => {
  return (
    <div>
      <h4 dangerouslySetInnerHTML={{ __html: textMeaning }}></h4>
      <h4 className={styles.text}>{textMeaningTranslate}</h4>
    </div>
  );
};

export default WordMeaning;
