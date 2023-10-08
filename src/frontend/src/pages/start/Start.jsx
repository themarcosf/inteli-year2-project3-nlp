import React from "react";
import styles from "./styles.module.scss";
import IbmLogo from "../../assets/images/IbmLogo.svg";
import Capa1 from "../../assets/images/Capa1.svg";
import Marketplace from "../../assets/images/Marketplace.svg";
import GlobalPartner from "../../assets/images/GlobalPartner.svg";
import Button from "../../components/Button/Button";

const Start = () => {
    return (
        <div className={styles.svgImage} style={{ backgroundImage: `url(${Capa1})` }}>
            <header className={styles.headerContainer}>
                <img src={IbmLogo} />
            </header>
            <div className={styles.salesContainer}>
                <img className={styles.images} src={GlobalPartner} />
                <h2 className={styles.h2Title}>Sales Team</h2>
                <p className={styles.textStart}>Access an application that is simple and intuitive, ask your questions and receive answers in a summarized and focused way.</p>
            </div>
            <div className={styles.marketingContainer}>
                <img className={styles.images} src={Marketplace} />
                <h2 className={styles.h2Title}>Marketing Team</h2>
                <p className={styles.textEnd}>Receive recommendations for themes for campaigns, most relevant subjects, popular platforms and target audience</p>
            </div>
            <footer className={styles.footerContainer}>
                <Button destination="/home" buttonLabel="Start"></Button>
            </footer>
        </div>
    )
}

export default Start;