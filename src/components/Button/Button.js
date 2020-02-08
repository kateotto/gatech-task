import React from 'react';
import styles from './Button.module.css';

export default function Button (props) {
   const {id, text} = props;

   return (
        <button 
        type="button"
        id={id}
        className={styles.button}
        >
            {text}
        </button>
   )
}