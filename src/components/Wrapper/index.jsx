import React from "react";
import styles from "./Wrapper.module.css"

const BoxShadowWrapper = (props) => {
    return (
        <div className={styles.shadow}>
            {props.children}
        </div>
    )
}
export default BoxShadowWrapper;