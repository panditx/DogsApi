import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dogsByName } from "../../actions";
import estilos from '../SearchBar/SearchBar.module.css';
export default function SearchBar(){
const dispatch = useDispatch();
const [name,setName] = useState("");

const handleInputChange = (e) => { 
    e.preventDefault()
    setName(e.target.value)
}
const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(dogsByName(name))
}
return(
    <div className={estilos.contenedor}>
        <input className={estilos.barra} type='text' placeholder="Buscar. . ."  onChange={(e) => {handleInputChange(e)}}/>
        <button  className={estilos.busqueda} type='submit' onClick={(e) => {handleSubmit(e)}}>Buscar</button>
    </div>
)

}