import React from "react";
import styles from '../Paginado/Paginado.module.css'
export default function Paginado({allDogs, dogsPorPag, paginado, currentPage}){
const numeroDePag = [];
for (let i = 1; i <= Math.ceil(allDogs/dogsPorPag); i++) {
    numeroDePag.push(i)
}
return(
<nav className={styles.nav}>
    <ul className={styles.ul}>
    {currentPage > 1 ? (
                    <li onClick={() => Paginado(currentPage -1)}>
                        <button onClick={() => paginado(currentPage -1)}> Anterior </button>
                    </li>
                ) : null}
        {numeroDePag && numeroDePag.map( n =>( 
            <li key={n}>
            
            <a  onClick={() => paginado(n)}>{n}</a>
            </li>
            ))}
    {currentPage < allDogs/dogsPorPag ? (
                    <li onClick={() => Paginado(currentPage +1)}>
                        <button onClick={() => paginado(currentPage +1)}> Posterior </button>
                    </li>
                ) : null}
    </ul>
</nav>
)
}