import React, { useState } from 'react';
import styles from './styles.module.scss';
import IbmLogo from '../../assets/images/IbmLogo.svg';
import Capa1 from '../../assets/images/Capa1.svg';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { AiFillEye } from 'react-icons/ai';

const SignUp = () => {

    const [isPassword, setIsPassword] = useState(true);

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.svgImage} style={{ backgroundImage: `url(${Capa1})` }}>
                <header class={styles.headerContainer}>
                    <img src={IbmLogo} />
                </header>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Sign Up</h1>
                    <p className={styles.subtitle}>To start using Nexus.</p>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputMain}>
                        <Input labelClassName='labelInput' type="text" label="Full Name" inputClassName='inputField'></Input>
                    </div>
                    <div className={styles.inputMain}>
                        <Input labelClassName='labelInput' type="text" label="Email" inputClassName='inputField'></Input>
                    </div>
                    <div className={styles.inputMain}>
                        <Input labelClassName='labelInput' type={isPassword ? "password" : "text"} label="Password" inputClassName='inputField'></Input>
                    </div>
                    <div className={styles.inputMain}>
                        <Input placeholder='Confirm password' labelClassName='labelInput' type={isPassword ? "password" : "text"} inputClassName='inputField'></Input>
                    </div>
                    <div className={styles.linkContainer}>
                        <a className={styles.link} href="">Forgot your password?</a>
                    </div>
                </div>
                <footer className={styles.footerContainer}>

                    <Button destination="/start" buttonLabel="Create"></Button>

                </footer>
            </div>
        </div>
    )
}

export default SignUp;