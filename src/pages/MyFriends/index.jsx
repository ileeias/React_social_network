import { useEffect, useState } from 'react';
import styles from './MyFriends.module.css';
import { axiosInstance } from '../../services/axios';

export default function MyFriends() {
  const [friends, setFriends] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getFriend() {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/my_friend', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Token ${token}`,
          },
        });
        setFriends(response.data);
    } catch (error) {
        console.log(error);
        setError(error);
    }
}
getFriend();
}, []);

console.log(friends);
  return (
    <div></div>
  );
}
