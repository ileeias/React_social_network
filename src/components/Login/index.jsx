import styles from './Login.module.css';
import { axiosInstance } from '../../services/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Login({changeModalClose}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onError = (errors, e) => console.log('ERRORS', errors, e);
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/token/login', data);
      const token = response.data.auth_token;
      localStorage.setItem('token', token);
      changeModalClose()
      navigate('/1');
    } catch (error) {
      console.log('Error', error);
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.mcontainer}>
          <div className={styles.header}>
            <h2>Log in</h2>
            <span className={styles.close} onClick={changeModalClose}>✕</span>
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
                <div className={styles.actions}>
                  <button type="submit">SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
