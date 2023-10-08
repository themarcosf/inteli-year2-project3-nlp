import React from "react";
import UserTemplate from "../../assets/images/UserTemplate.jpg";
import styles from "./styles.module.scss";

const HomeHeader = ({profileClassName}) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.imageContainer}>
                <img className={styles.profileImage} src={UserTemplate} alt="User Profile Image"/>
                <p className={styles.text}>Hello, Victor!</p>
            </div>
            <img className={styles.profileImage} src={UserTemplate} alt="User Profile Image"/>
            <p className={styles.text}>Hello, Victor!</p>
            <button>
                <img src="" alt="" />
            </button>
        </div>
    )
}

export default HomeHeader;