import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header({
  authenticated,
  changeModalLogin,
  changeModalRegistration,
  logout,
}) {
  return (
    <div className={styles.container}>
      {authenticated ? (
        <nav>
          <form action="" className={styles.search}>
            <input
              type="search"
              placeholder="Search🔍"
              className={styles.search_icon}
            />
          </form>
          <div className={styles.nav_bar}>
            <span>🧑‍💻</span>
            <Link to="/1" className="nav-link">
              My cabinet
            </Link>
            <span className={styles.vertical_line}></span>
            <Link to="/2" className="nav-link">
              My posts
            </Link>
            <span className={styles.vertical_line}></span>
            <Link to="/5" className="nav-link">
              All posts
            </Link>
            <span className={styles.vertical_line}></span>
            <Link to="/3" className="nav-link">
              Peoples
            </Link>
            <span className={styles.vertical_line}></span>
            <img src="/icons/invites.svg" alt="icon" />
            <span className={styles.vertical_line}></span>
            <img src="/icons/messages.svg" alt="icon" />
            <span className={styles.vertical_line}></span>
            <img
              src="/icons/notifications.svg"
              alt="icon"
            />
            <span className={styles.vertical_line}></span>
            <Link className="nav-link" onClick={logout}>
              logout
            </Link>
          </div>
        </nav>
      ) : (
        <nav>
          <div className={styles.nav_bar_sing}>
            <Link className="nav-link" onClick={changeModalRegistration}>
              Registration
            </Link>
            <span className={styles.vertical_line}></span>
            <Link className="nav-link" onClick={changeModalLogin}>
              Login
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}

{
  /* // return (
  //   <div className={styles.header}>
  //     <div className={styles.logo}>🐇</div>
  //     {authenticated ? (
  //       <nav className={styles.nav}>
  //         <Link to="/3" className="nav-link">
  //           Peoples
  //         </Link>
  //         <Link to="/1" className="nav-link">
  //           My cabinet
  //         </Link>
  //         <Link to="/2" className="nav-link">
  //           My posts
  //         </Link>
  //         <Link to="/4" className="nav-link">
  //           My friends
  //         </Link>
  //         <Link className="nav-link" onClick={logout}>
  //           logout
  //         </Link>
  //       </nav>
  //     ) : (
        <nav className={styles.nav}>
          <Link className="nav-link" onClick={changeModalRegistration}>
            Registration
          </Link>
          <Link className="nav-link" onClick={changeModalLogin}>
            Login
          </Link>
        </nav>
  //     )}
  //   </div>
  // ); */
}
