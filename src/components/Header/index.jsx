import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header({
  authenticated,
  changeModalLogin,
  changeModalRegistration,
  logout,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>🐇</div>
      {authenticated ? (
        <nav className={styles.nav}>
          <Link className="nav-link" onClick={logout}>
            logout
          </Link>
          <Link to="/1" className="nav-link">
            My cabinet
          </Link>
          <Link to="/2" className="nav-link">
            My posts
          </Link>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <Link className="nav-link" onClick={changeModalRegistration}>
            Registration
          </Link>
          <Link className="nav-link" onClick={changeModalLogin}>
            Login
          </Link>
        </nav>
      )}
    </div>
  );
}
