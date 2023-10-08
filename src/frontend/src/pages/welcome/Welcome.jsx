import React from 'react';
import styles from './styles.module.scss';
import IbmLogo from '../../assets/images/IbmLogo.svg';
import WelcomeBackground from '../../assets/images/WelcomeBackground.svg';
import WelcomeIcon from '../../assets/images/WelcomeIcon.svg';
import Button from '../../components/Button/Button';

const Welcome = () => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.svgImage} style={{ backgroundImage: `url(${WelcomeBackground})` }}>
                <header className={styles.alignRight}>
                    <img src={IbmLogo} alt="Ibm Logo" />
                </header>
                <div className={styles.paddingLeft}>
                    <h1 className={styles.welcomeTitle}>Welcome to</h1>
                    <h1 className={styles.nexusTitle}>Nexus</h1>
                    <p className={styles.subtitle}>A new way to be updated.</p>
                </div>
                <div className={styles.svgContainer}>
                    <img className={styles.womenImage} src={WelcomeIcon} alt="Welcome Icon" />
                </div>
                <div className={styles.alignRight}>
                    <Button destination="/login" buttonLabel="Let's start" ></Button>
                </div>
            </div>
        </div>
    )
}

export default Welcome;