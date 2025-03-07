import { axiosInstance } from '../../services/axios';
import styles from './CreatePost.module.css';
import { useForm } from 'react-hook-form';
export default function CreatePost({ newPost, changePosts }) {
  const { register, handleSubmit } = useForm();

  const onError = (errors, e) => console.log('ERRORS', errors, e);
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('text', data.text);
      formData.append('image', data.image[0]);

      const response = await axiosInstance.post('./my_posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      newPost(!changePosts);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className={styles.create_post}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles.title}>
          Создайте новый пост:
          <input type="text" {...register('title', { required: true })} placeholder="Название поста"/>
        </div>
        <textarea
          className={styles.text}
          placeholder="Что сегодня произошло?"
          {...register('text', { required: true })}
        ></textarea>
        <div className={styles.image_container}>
          <label htmlFor="file_input" className={styles.image_label}>
            Картинка
          </label>
          <input type="file" id="file_input" className={styles.image_input} {...register('image', { required: true })}/>
        </div>
        <button type="sunmit" className={styles.create_new_post}>Создать</button>
      </form>
    </div>
  );
}
