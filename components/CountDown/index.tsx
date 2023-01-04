import { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  time: number;
  onEnd: Function;
}

const CountDown = ({ time, onEnd }: IProps) => {
  const [count, setCount] = useState(time || 60);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count <= 0) {
        clearTimeout(timer);
        onEnd && onEnd();
        return;
      }

      setCount(count - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count, onEnd]);

  return <div className={styles.countDown}>{count}s后重新发送</div>;
};

export default CountDown;
