import React from "react";
import styles from "./styles.module.scss"; // Substitua pelo seu arquivo de estilos personalizado

const CustomButton = ({ buttonLabel, isDisabled, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.customButton} ${isDisabled ? styles.disabled : ""}`}
            disabled={isDisabled}
        >
            {buttonLabel}
        </button>
    );
};

export default CustomButton;
