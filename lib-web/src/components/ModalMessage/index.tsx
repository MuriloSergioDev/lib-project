import { MouseEvent } from 'react';
import styles from './style.module.css'

type Props = {
  content?: string
  onClick: Function
}

const ModalMessage = ({ content, onClick }: Props) => {

  return (
    <div className={styles.container}>
      {content}
      <button
        className={styles.button}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          onClick(event)
        }}>Confirmar</button>
    </div>
  );
}

export default ModalMessage;