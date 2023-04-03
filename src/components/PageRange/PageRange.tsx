import { getTrackBackground, Range } from 'react-range';
import styles from './index.module.scss';
import classNames from 'classnames';
import { RANGE_PAGE } from '../../constants';

const STEP = 1;
const MIN = RANGE_PAGE[0];
const MAX = RANGE_PAGE[1];

type Props = {
  values: number[];
  setValues: (values: number[]) => void;
};

const PageRange = ({ values, setValues }: Props) => {
  return (
    <div className={styles.root}>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={setValues}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className={styles.track}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ffffff75', '#0079bf', '#ffffff75'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div {...props} className={styles.thumbs}>
            <div className={styles.label}>{values[index]}</div>
            <div
              className={classNames(styles.thumb, {
                [styles.dragged]: isDragged,
              })}
            />
          </div>
        )}
      />
    </div>
  );
};

export default PageRange;
