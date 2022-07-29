import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail, clear} from '../../actions/index';
import estilos from '../Details/Details.module.css';

export default function Details(props) {
const dispatch = useDispatch()
const {id} = useParams();
useEffect(() => {
dispatch(clear())
dispatch(getDetail(id))
},[dispatch,id])

const dogDetail = useSelector((state) => state.detail)

return(
    <div>
        { 
            dogDetail.length > 0 ?
            <div>
                <h1 className={estilos.titulo}>{dogDetail[0].name}</h1> 
                
                <div className={estilos.imgC}>
                <img src={dogDetail[0].image} alt='no img' className={estilos.img}/>
                </div>
                <div className={estilos.cajita}>
                <p>temperamento: {dogDetail[0].temperament ?dogDetail[0].temperament : dogDetail[0].temperamentos.map(t => t.name + ', ') }</p>
                </div>
                <div className={estilos.cajita}>
                <h4>altura: {dogDetail[0].height} CM</h4>
                </div>
                <div className={estilos.cajita}>
                <h4>peso: {dogDetail[0].weight} KG</h4>
                </div>
                <div className={estilos.cajita}>
                <h4>años de vida: {dogDetail[0].life}</h4>
                </div>
            </div> : <div className={estilos.contenedor1}>
                <div className={estilos.loader}></div>
            <p className={estilos.message}>Loading...</p> </div>
        }
                    <Link className={estilos.sub} to='/home'>
                    <button className={estilos.botonF}>Volver</button>
                    </Link>
    </div>
)

}

