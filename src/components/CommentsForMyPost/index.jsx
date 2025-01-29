  import styles from './CommentsForMyPost.module.css';
  import BoxShadowWrapper from "../Wrapper"

  export default function CommentsForMyPost({ comments }) {
    return (
      <div className={styles.container}>
        {comments.map((comment) => (
          <BoxShadowWrapper>
            <p className={styles.author}>{comment.author}</p>
          <p className={styles.comment}>{comment.text}</p>
        </BoxShadowWrapper>
          ))}
      </div>
    );
  }