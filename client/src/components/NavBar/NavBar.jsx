import React from "react";
import {Link} from 'react-router-dom';
import estilos from '../NavBar/NavBar.module.css';
import img from '../../assets/Logo.png'
export default function NavBar(){
    return (
        <header>
            <div className={estilos.ancho}>
                <div className={estilos.logo}>
                    <img src={img} alt='No se encontro la imagen'/>
                </div>
            
                <nav className={estilos.barra}>
                    <ul className={estilos.lista}>
                    <li className={estilos.items}><Link to='/'>INICIO</Link></li> 
                    <li className={estilos.items}> <Link to='/home'>HOME</Link></li>
                    <li className={estilos.items}><Link to='/about'>ABOUT</Link></li>
                    <li className={estilos.items}><Link to='/contact'>CONTACT</Link></li>
                    </ul>        
                </nav>
            </div>
        </header>
        
)}