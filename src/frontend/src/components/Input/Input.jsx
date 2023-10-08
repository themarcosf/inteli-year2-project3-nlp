import React from 'react';
import styles from './styles.module.scss';

const Input = ({label,placeholder,type,value,onChange}) => {
    return (
        <div>
            <label className={styles.inputLabel}>{label}</label>
            <input value={value} onChange={onChange} placeholder={placeholder} type={type} className={styles.inputField}></input>
        </div>
    )
}

export default Input;