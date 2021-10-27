import React from "react";

/**
 * Square component props:
 * @param {boolean} highlight if Square is in win streak or not
 * @param {callback} onClick
 * @param {string} value 'X' or 'O'
 * @returns {JSX.Element}
 */
const Square = ({highlight, onClick, value}) => (
     <button
         className={highlight ? 'square highlight' : 'square'}
         onClick={onClick}>{value}
    </button>
);

export default Square;