import styles from './MyPost.module.css';

export default function MyPost({ img, title, text, date, update, likes, dislikes}) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.date}>{(update ? update : date).slice(0,10)}</p>
      <p className={styles.text}><img src={img} alt="image" />{text}</p>
      <span>❤️{likes}   💩{dislikes}</span>
    </div>
  );
}
