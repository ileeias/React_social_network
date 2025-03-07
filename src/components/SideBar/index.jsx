import styles from './SideBar.module.css'

export default function SideBar() {

    return(
        <div className={styles.side_bar}>
          <div className={styles.side_bar_inner}>
            <ol>
              <li><a href="">Профиль</a></li>
              <li><a href="">Лента</a></li>
              <li><a href="">Мессенджер</a></li>
              <li><a href="">Друзья</a></li>
              <li><a href="">-</a></li>
              <li><a href="">-</a></li>
            </ol>
          </div>
        </div>
    )
}