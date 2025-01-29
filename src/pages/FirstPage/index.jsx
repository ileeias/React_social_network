import first_page from "./first_page.jpg"
import styles from "./FirstPage.module.css"

export default function FirstPage() {

    return(
        <div className={styles.container}>
            <img src={first_page} alt="Welcome" />
            <p className={styles.title}>Добро пожаловать!</p>
            <p className={styles.text}>Очень рады видеть вас на нашей странице!
            <span className={styles.loader}></span>
            </p>
        </div>
    )
}