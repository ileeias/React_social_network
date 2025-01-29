import styles from './Registration.module.css';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../services/axios';
import { useForm } from 'react-hook-form';

export default function RegPage({ changeModalClose }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onError = (errors, e) => console.log('ERRORS', errors, e);
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/reg', data);
      console.log(response);
      navigate('/0');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.mcontainer}>
          <div className={styles.header}>
            <h2>Registration</h2>
            <span className={styles.close}  onClick={changeModalClose}>✕</span>
          </div>
          <div className={styles.body}>
            <div className={styles.formcontainer}>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={styles.group}>
                  <label htmlFor="name">Номер телефона</label>
                  <input
                    type="number"
                    {...register('phone_number', { required: true })}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="name">Пароль</label>
                  <input
                    type="password"
                    {...register('password', { required: true })}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="name">Повторите пароль</label>
                  <input
                    type="password"
                    {...register('repeat_password', { required: true })}
                  />
                </div>
                <button type="submit">Registration</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
