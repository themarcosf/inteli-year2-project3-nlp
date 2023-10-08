// import React from "react";
// import styles from "./styles.module.scss";
// import { Link } from "react-router-dom"

// const Button = ({buttonLabel, onPressed, destination}) => {
//     return (
//         <div>
//             {/* <button onPressed={onPressed} className={styles.btn}>{buttonLabel}</button> */}
//             <Link to={destination} className={styles.btn}>{buttonLabel}</Link>
//         </div>
//     )
// }

// export default Button;


import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Button = ({ buttonLabel, destination }) => {
    return (
        <div>
            {/* <button onPressed={onPressed} className={styles.btn}>{buttonLabel}</button> */}
            <Link to={destination} className={styles.btn} onClick={onPressed}>{buttonLabel}</Link>
        </div>
    );
};

export default Button;
