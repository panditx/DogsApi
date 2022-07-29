import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Paginado from '../Paginado/Paginado';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import { getDogs, filterCreated, orderByName, orderByWeight, getTemperaments, filterByTemp } from '../../actions';
import estilos from '../Home/Home.module.css';
export default function Home(){
const dispatch = useDispatch()
const allDogs = useSelector((state) => state.dogs)
const [orden,setOrden] = useState('')
const [currentPag, setCurrentPag] = useState(1)
const [dogsPorPag,setDogsPorPag] = useState(8)
const indexDogsU = currentPag * dogsPorPag
const indexDogsP = indexDogsU - dogsPorPag
const currentDogs = allDogs.slice(indexDogsP,indexDogsU)
const paginado = (Npag) => {
    setCurrentPag(Npag)
}
const temps = useSelector((state) => state.temperaments)
useEffect(() => {
    dispatch(getDogs()) 
    dispatch(getTemperaments())
},[dispatch])

function handleFilterCreated(e){
dispatch(filterCreated(e.target.value))
}
function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
}
function handleSort(e){
e.preventDefault();
dispatch(orderByName(e.target.value))
setCurrentPag(1);
setOrden(`Ordenado ${e.target.value}`)
}
function handleEvent(e){
    e.preventDefault();
    dispatch(orderByWeight(e.target.value))
    setCurrentPag(1);
    setOrden(`Ordenado ${e.target.value}`)
}
function handleSelect(e){
e.preventDefault()
    dispatch(filterByTemp(e.target.value))
setCurrentPag(1)
}

return(
    <div className={estilos.home}>
        <div>
            <button onClick={e => handleClick(e)}>volver a cargar</button>
        </div>
        <div className={estilos.botonF}>
            <Link className={estilos.dir} to='/dog'>Crear Un Perro</Link>
        </div>
        <br/>
        <div>
            <div className={estilos.opciones}><select onChange={e => handleFilterCreated(e)}>
                <option value='all'>Todos</option>
                <option value='api'>Api</option>
                <option value='created'>Creados</option>
            </select>
            <select   onChange={e=> handleSelect(e)}>
                    <option  key="Temperament" value="Temperamentos">Temperamentos</option>
                {
                    temps?.map((t) => {
                        return(
                            <option key={t.id} value={t.name}>{t.name}</option>
                            )})}
                    </select>
                    </div>
            <div className={estilos.opciones}>
            <select onChange={e => handleSort(e)}> 
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select onChange={e => handleEvent(e)}>
                <option value='menosPeso'>Peso Descendente</option>
                <option value='peso'>Peso Ascendente</option>
            </select>
            </div>
        </div>
        <SearchBar/>
    <div>
    <Paginado
            dogsPorPag={dogsPorPag}
            allDogs={allDogs.length}
            paginado={paginado}
            currentPage={currentPag}
            />
            <br/>
            <br/>
            <br/>
            { currentDogs.length === 0 ? 
            <div className={estilos.contenedor1}>
                <div className={estilos.loader}></div>
            <p className={estilos.message}>Loading...</p> </div>:
                currentDogs?.map((d)=>{
                    return(
                    <div className={estilos.cards} key={d.id}>
                        <Link className={estilos.dir} to={'/home/' + d.id}>
                        <Card name={d.name} image={d.image}  temperament={d.temperament ? d.temperament : d.temperamentos && (d.temperamentos.map((x) => x.name.concat(" "))).join(", ")} /> 
                        </Link>
                    </div> 
                    )
                })
            } 
   </div>
    </div>
    )
}