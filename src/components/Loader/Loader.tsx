import React from "react";
import styles from "./loader.module.css";
import {RotatingLines} from "react-loader-spinner";

const Loader = () => {
    return (
        <div className={styles.block}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};
export  {Loader};