import React,{useState, useEffect} from "react";
import { useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postDog, getTemperaments} from '../../actions/index'; 
import estilos from '../Created dog/CreateDog.module.css';

export default function CreateDog(){
const dispatch = useDispatch();
const history = useHistory();
const temps = useSelector((state) => state.temperaments)
const dogs = useSelector((state) => state.allDogs)
const [errors,setErrors] = useState({
    name: 'se debe completar el nombre de la raza'
});
const [input,setInput] = useState({
    name: '', maxHeight:'',minHeight:'',maxWeight:'',minWeight:'' ,maxLife:'',minLife:'',image:'', temperament: []
})
function validar(input){
    let errors = {};
    if(!input.name) errors.name = 'se requiere un nombre'
    if(dogs.find(x=> x.name.toLowerCase() === input.name.toLowerCase().replace(/\s\s+/g, ' ').trim())) errors.name = 'no pueden llevar el nombre de uno ya creado'
    
    if(input.maxHeight <= input.minHeight) errors.minHeight = 'la altura maxima no puede ser menor o igual a la minima'
    if(!input.maxHeight) errors.maxHeight = 'debe ingresar una altura maxima'
    if(input.maxHeight <= 0) errors.maxHeight = 'no se pueden ingresar numeros negativos ni 0'

    if(!input.minHeight) errors.minHeight = 'debe ingresar una altura minima'
    if(input.minHeight <= 0) errors.minHeight = 'no se pueden ingresar numeros negativos ni 0'

    if(input.maxWeight <= input.minWeight) errors.minWeight = 'la altura maxima no puede ser menor o igual a la minima'
    if(!input.maxWeight) errors.maxWeight = 'debe ingresar una altura maxima'
    if(input.maxWeight <= 0) errors.maxWeight = 'no se pueden ingresar numeros negativos ni 0'

    if(!input.minWeight) errors.minWeight = 'debe ingresar una altura minima'
    if(input.minWeight <= 0) errors.minWeight = 'no se pueden ingresar numeros negativos ni 0'

    if(input.maxLife <= input.minLife) errors.minLife = 'la altura maxima no puede ser menor o igual a la minima'
    if(!input.maxLife) errors.maxLife = 'debe ingresar una estimado de vida maximo'
    if(input.maxLife <= 0) errors.maxLife = 'no se pueden ingresar numeros negativos ni 0'

    if(!input.minLife) errors.minLife = 'debe ingresar una estimado de vida minimo'
    if(input.minLife <= 0) errors.minLife = 'no se pueden ingresar numeros negativos  y el estimado de vida debe ser mayor que 0'
    
    if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image) && input.image){
        errors.image = "Debe insertar una URL de imagen válida o dejar el espacio vacío"
    }
    return errors;
}


function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validar({
        ...input,
        [e.target.name] : e.target.value
    }))
}
function handleSelect(e){
    setInput({
        ...input,
        temperament: [...input.temperament,e.target.value]
    })
}
function handleClick(e){
setInput({...input,
    temperament: input.temperament.filter( t => t !== e)})  
    
}
function handleSubmit(e){
    e.preventDefault();
    dispatch(postDog({
        name: input.name,
        height: `${input.minHeight} - ${input.maxHeight}`, 
        weight:`${input.minWeight} - ${input.maxWeight}`, 
        life: `${input.minLife} - ${input.maxLife} years`, 
        image: input.image ? input.image : "https://i.ibb.co/gzLLbz9/12432821.jpg" ,
        temperament: input.temperament
    }))
    alert('creado con exito')
    setInput({
        name: '', maxHeight:'',minHeight:'',maxWeight:'',minWeight:'' ,maxLife:'',minLife:'',image:'', temperament: []
    })
    history.push('/home')
}
useEffect(() => {
    dispatch(getTemperaments())
},[dispatch])
return(
<div className={estilos.container}>
    <br/>
        <h1>Crea una Raza de Perro</h1>
        <br/>
<form className={estilos.formu} onSubmit={(e) => handleSubmit(e)}>
    <div>
        <label>Nombre:</label>
        <input className={estilos.inputs} type='text' value={input.name} name='name' onChange={handleChange}/>
        {errors.name ? (<p>{errors.name}</p>) : null}
    </div>
    <br/>
    <div>
        <label>max Height:</label>
        <input className={estilos.inputs} type='text' value={input.maxHeight} name='maxHeight' onChange={(e) => handleChange(e)}/>
        {errors.maxHeight ? (<p>{errors.maxHeight}</p>) : null}
    </div>
    <br/>
    <div>
        <label>min Height:</label>
        <input className={estilos.inputs} type='text' value={input.minHeight} name='minHeight' onChange={(e) => handleChange(e)}/>
        {errors.minHeight ? (<p>{errors.minHeight}</p>) : null}
    </div>
    <br/>
    <div>
        <label>max Weight:</label>
        <input className={estilos.inputs} type='text' value={input.maxWeight} name='maxWeight' onChange={(e) => handleChange(e)}/>
        {errors.maxWeight ? (<p>{errors.maxWeight}</p>) : null}
    </div>
    <br/>
    <div>
        <label>min Weight: </label>
        <input className={estilos.inputs} type='text' value={input.minWeight} name='minWeight' onChange={(e) => handleChange(e)}/>
        {errors.minWeight ? (<p>{errors.minWeight}</p>) : null}
    </div>
    <br/>
    <div>
        <label>max Life: </label>
        <input className={estilos.inputs} type='text' value={input.maxLife} name='maxLife'onChange={(e) => handleChange(e)}/>
        {errors.maxLife ? (<p>{errors.maxLife}</p>) : null}
    </div>
    <br/>
    <div>
        <label>min Life: </label>
        <input className={estilos.inputs} type='text' value={input.minLife} name='minLife'onChange={(e) => handleChange(e)}/>
        {errors.minLife ? (<p>{errors.minLife}</p>) : null}
    </div>
    <br/><select  className={estilos.temps} onChange={e => { handleSelect(e)}}>
        { temps.map((t) => (
            <option  key={t.id} value={t.name}> {t.name}</option>
        ))}
    </select >
    <br/>
    <span>Temperamentos:</span>
    {input.temperament.map(t =>{
    return(
        <ul className={estilos.lis} key={t.id}>
        <li  className={estilos.listado}>{t}</li>
        <button  onClick={() => handleClick(t)}>X</button>
        </ul>)})}
    <div className={estilos.container2}> 
        <br/>
        <label>Image: </label>
        <input className={estilos.inputs} type='text' value={input.image} name='image' onChange={(e) => handleChange(e)}/>
        {errors.image ? (<p>{errors.image}</p>) : null}
    </div>
    <br/>
<button type='submit' disabled={ Object.keys(errors).length === 0 ? false : true} className={estilos.botonF}>Crear Raza</button>
</form>
</div>
)
}