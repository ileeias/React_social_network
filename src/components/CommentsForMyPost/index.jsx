import styles from './CommentsForMyPost.module.css';

export default function CommentsForMyPost({ comments, id }) {
  return (
    <div className={styles.container}>
      <input id={`${id}comments`} type="checkbox" className={styles.input} />
      <article className={styles.ac}>
        {comments.map((comment) => (
          <div className={styles.comment_box}>
            <p className={styles.author}>{comment.author_username}</p>
            <p className={styles.comment}>{comment.text}</p>
          </div>
        ))}
      </article>
    </div>
  );
}
