import { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axios';
import Profile from '../components/Cabinet';
import Loader from '../components/Loader';

export default function CabinetPage({ changeModalLogin }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/cabinet', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Token ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
        changeModalLogin();
      }
    }
    getProfile();
  }, []);

  return (
    <div className="coteiner">
      {profile ? (
        <Profile
          phone_number={profile.phone_number}
          name={profile.name}
          surname={profile.surname}
          bio={profile.bio}
          birthday={profile.birthday}
          residence={profile.residence}
          hobbies={profile.hobbies}
          photo={profile.photo}
          date_joined={profile.date_joined}
          friends={profile.friends}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
