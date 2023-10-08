import React from 'react';
import styles from './styles.module.scss'; // Substitua pelo seu arquivo de estilos personalizado

const CustomInput = ({ label, placeholder, type, value, onChange }) => {
    return (
        <div>
            <label className={styles.inputLabel}>{label}</label>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                className={styles.inputField}
            />
        </div>
    )
}

export default CustomInput;
