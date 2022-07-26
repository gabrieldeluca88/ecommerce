import React from 'react';
import { useState } from 'react';
import './ItemCount.css'



const ItemCount = ({ stock, initial, onAdd }) => {


const [count, setCount] = useState(initial);


const add = (num) => {
    setCount(count + num);
};

return (
    <div className="count-container">
    <div className="count-container__contador">
        <button
        className="count-container__button"
        onClick={() => add(-1)}
        disabled={count === initial}>-</button>
        <span className="count-container__qty">{count}</span>
        <button
        className="count-container__button"
        onClick={() => add(+1)}
        disabled={count === stock}>+</button>
    </div>

    <button
        className="button-agregar"
        onClick={() => onAdd(count)}
        disabled={stock === 0 ? true : null}
    >
        Agregar
    </button>
    </div>
);
};

export default ItemCount;



