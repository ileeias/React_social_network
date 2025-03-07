import styles from "./FirstPage.module.css";

export default function FirstPage() {
    const count = Array.from({ length: 13 }, (_, i) => i + 1);
    return(
        <div className={styles.container}>
            <p className={styles.title}>Добро пожаловать!</p>
            <p className={styles.text}>Очень рады видеть вас на нашей странице!</p>
            {count.map((i) => (<div className={styles.crop_cont}>
                <img key={i} src={`../../public/images/${i}.jpg`} alt={`image-${i}`} />
            </div>
            ))}
        </div>
    );
}
