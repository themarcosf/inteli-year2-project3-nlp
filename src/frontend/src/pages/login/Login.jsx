import React, { useState } from 'react';
import styles from './styles.module.scss';
import IbmLogo from '../../assets/images/IbmLogo.svg';
import Capa1 from '../../assets/images/Capa1.svg';
import Input from '../../components/Input/Input';
import CustomButton from '../../components/ButtonLogin/ButtonLogin';
import CustomInput from '../../components/InputLogin/InputLogin';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from "react-router-dom";
import { InlineNotification } from 'carbon-components-react';   
// import { AiFillEye } from 'react-icons/ai';

const Login = () => {
    const [isPassword, setIsPassword] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [passwordInput, setPasswordInput] = useState(""); 
    // const history = useHistory(); 
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      const checkPassword = (password) => {
        return password === "1234567";
      };
    
      const handleLogin = () => {
        if (checkPassword(passwordInput)) {
          setIsPasswordCorrect(true);
          openModal();
    
          setTimeout(() => {
            navigate("/start")
          }, 3000);
        } else {
          setIsPasswordCorrect(false);
          openModal();
        }
      };

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.svgImage} style={{ backgroundImage: `url(${Capa1})` }}>
                <header className={styles.headerContainer}>
                    <img src={IbmLogo} alt="IBM Logo" />
                </header>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Login</h1>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputMain}>
                        <Input type="text" label="Email" ></Input>
                    </div>
                    <div className={styles.inputMain}>
                        <Input type={isPassword ? "password" : "text"} label="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}></Input>
                    </div>
                    <div className={styles.linkContainer}>
                        <a className={styles.link} href="/">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                <footer className={styles.footerContainer}>
                    <Button  buttonLabel="Login" onPressed={handleLogin}></Button>
                    <p className={styles.subtitle}>Don't have an account? <Link className={styles.link} to="/signup">Sign up</Link></p>
                {isPasswordCorrect && isModalOpen && (
                    <InlineNotification
                    kind="success"
                    title="Login Successful!"
                    hideCloseButton={true}
                    open={isModalOpen}
                    onCloseButtonClick={closeModal}
                    />
                )}

                {!isPasswordCorrect && isModalOpen && (
                    <InlineNotification
                    kind="error"
                    title="Invalid password."
                    subtitle="Please try again."
                    hideCloseButton={true}
                    open={isModalOpen}
                    onCloseButtonClick={closeModal}
                    />
                )}
                </footer>
            </div>
        </div>
    );
};

export default Login;