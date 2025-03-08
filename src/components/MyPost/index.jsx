import { axiosInstance } from '../../services/axios';
import styles from './MyPost.module.css';

export default function MyPost({
  id,
  img,
  title,
  text,
  date,
  update,
  likes,
  dislikes,
  newPost,
  changePosts,
  author_username,
  photo,
}) {
  function DeletePost(e) {
    const idPost = e.target.id;
    const token = localStorage.getItem('token');
    axiosInstance
      .delete('my_posts', {
        data: { id: idPost },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        newPost(!changePosts);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении поста:', error);
      });
  }

  async function Like(e) {
    try {
      const postID = e.currentTarget.getAttribute('data-post-id');
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(
        'like',
        { post: postID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
      newPost(!changePosts);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  async function Dislike(e) {
    try {
      const postID = e.currentTarget.getAttribute('data-post-id');
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(
        'dislike',
        { post: postID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
      newPost(!changePosts);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }

    async function CreateComment(e) {
      try {
        const postID = e.currentTarget.getAttribute('data-post-id');
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(
          'my_comment',
          { post: postID },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          }
        );
        newPost(!changePosts);
      } catch (error) {}
    }
  }
  return (
    <div className={styles.post}>
      <div className={styles.card_username}>
        {photo ? (
          <img src={`http://127.0.0.1:8000${photo}`} alt="" />
        ) : (
          <img src="/icons/ava.svg" alt="ava" />
        )}
        <p className={styles.username}>{author_username}</p>
        <p>{(update ? update : date).slice(0, 10)}</p>
      </div>
      <div className={styles.card_content}>
        <div className={styles.card_text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.card_image}>
          <img src={img} alt="image" />
        </div>
      </div>
      <div className={styles.card_counter_likes}>
        <span className={styles.card_like}>👍{likes}</span>
        <span className={styles.card_dislike}>👎{dislikes}</span>
      </div>
      <div className={styles.card_panel}>
        <button className={styles.like_button} data-post-id={id} onClick={Like}>
          👍
        </button>
        <button
          className={styles.dislike_button}
          data-post-id={id}
          onClick={Dislike}
        >
          👎
        </button>
        <label htmlFor={`${id}comments`} className={styles.label}>
          💬
        </label>

        <label htmlFor={`${id}comments_create`} className={styles.label}>
          ➕
        </label>
      </div>
      <button id={id} onClick={DeletePost}>
        Удалить этот пост
      </button>
    </div>
  );
}
