import React from "react";
import styles from "./styles.module.scss";
import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className={styles.backgroundContainer}>
            <header>
                <HomeHeader></HomeHeader>
            </header>

            <div className={styles.tabContainer}>
            </div>

            <footer className={styles.footerContainer}>
                <h1 className={styles.title}>Start by asking something!</h1>
                <Link to="/ask" className={styles.plusBtn}>
                    <p>+</p>
                </Link>
            </footer>
        </div>
    )
}

export default Home;