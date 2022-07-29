import React from 'react';
import {Link} from 'react-router-dom';
import estilos from '../Landing Page/LandingPage.module.css';
import video from '../../assets/perroVideo.mp4';

export default function LandingPage(){
return (
<div >
    <div className={estilos.center}>
    <video autoPlay loop muted playsInline className={estilos.video}>
    <source src={video}/>
    </video>
    <div className={estilos.welcome}>
        <Link to='/home'>
            <button className={estilos.btn}>INGRESAR</button>
        </Link>
    </div>
    </div>
</div>
)}