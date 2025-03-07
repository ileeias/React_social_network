import { axiosInstance } from '../../services/axios';
import styles from './CreateComment.module.css';
import { useForm } from 'react-hook-form';
export default function CreateComment({ id, newComment, changePosts }) {
  const { register, handleSubmit } = useForm();

  const onError = (errors, e) => console.log('ERRORS', errors, e);
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('post', id);
      formData.append('text', data.text);
      // formData.append('image', data.image[0] ? data.image[0] : null);

      const response = await axiosInstance.post('./my_comment', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      newComment(!changePosts);
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <div className={styles.container}>
      <input
        id={`${id}comments_create`}
        type="checkbox"
        className={styles.input}
      />
      <label htmlFor={`${id}comments_create`} className={styles.label}>
        ➕
      </label>
      <article className={styles.ac}>
        <div className={styles.create_comment}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <textarea
              className={styles.text}
              placeholder="Прокомментируй..."
              {...register('text', { required: true })}
            ></textarea>
            {/* <div className={styles.image_container}>
              <label htmlFor="file_input" className={styles.image_label}>
                Картинка
              </label>
              <input
                type="file"
                id="file_input"
                className={styles.image_input}
                {...register('image', { required: true })}
              />
            </div> */}
            <button type="sunmit" className={styles.create_new_comment}>
              отправить комментарий
            </button>
          </form>
        </div>
      </article>
    </div>
  );
}
