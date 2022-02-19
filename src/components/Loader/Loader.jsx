import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.css';
import { BallTriangle } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={styles.Loader}>
      <BallTriangle color="teal" height={80} width={80} /> Loading...
    </div>
  );
};
