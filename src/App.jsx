import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CabinetPage from './pages/CabinetPage';
import MyPostPage from './pages/MyPostPage';
import Header from './components/Header';
import Login from './components/Login';
import Registration from './components/Registration';
import { useState, useEffect } from 'react';
import { axiosInstance } from './services/axios';
import './assets/css/style.css';
import FirstPage from './pages/FirstPage';

function App() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('saveSession'))

  //Проверка авторизации
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthenticated(true)
      localStorage.setItem("saveSession", authenticated)
    } else {setAuthenticated(false)}
  })

  //Управление модальным окном
  const changeModalLogin = () => {
    setModal(<Login changeModalClose={changeModalClose} />);
  };
  const changeModalRegistration = () => {
    setModal(<Registration changeModalClose={changeModalClose} />);
  };
  const changeModalClose = () => {
    setModal(null);
  };

  //Разлогирование
  const logout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axiosInstance.post('/auth/token/logout', null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('saveSession');
      navigate('/');
    } catch (error) {
      console.log('Error', error);
    }
  };
  

  return (
    <>
      <Header
        changeModalLogin={changeModalLogin}
        changeModalRegistration={changeModalRegistration}
        logout={logout}
        authenticated={authenticated}
      />
      {modal}
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/1" element={<CabinetPage changeModalLogin={changeModalLogin}/>} />
        <Route path="/2" element={<MyPostPage changeModalLogin={changeModalLogin}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
