import React from 'react';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { useState } from 'react';
import estilos from '../Contact/Contact.module.css';

export default function Contact(){
const form = useRef();
const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_bjdbhc8','template_o298usm',form.current, 'Tzum1NZID2R1-oR2O')
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const expresiones = {
    nombre:/^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    ausnto:/^[a-zA-ZÀ-ÿ\s]{1,40}$/
}
const [errors,setErrors] = useState({
    name: 'se debe completar el nombre'
});
const [input,setInput] = useState({
    name: '', asunto:'', email:'',mensaje:'', 
})
function validar(input){
    let errors ={};
    if(!input.name) errors.name ='debe completar el nombre'
    if(expresiones.nombre.test(input.name) === false) errors.name ='el nombre solo puede ser con mayusculas y entre 4 a 40 caracteres'
    if(expresiones.nombre.test(input.asunto) === false) errors.asunto = 'no puede colorcar simbolos en el asunto, minimo de caracteres: 4'
    if(!input.email) errors.email = 'el email es obligatorio'
    if(expresiones.correo.test(input.email) === false) errors.email = 'email debe ser de la forma: dog_Api@gmail.com'
    if(!input.mensaje) errors.mensaje = 'no puede enviar un mensaje vacio'
    return errors
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

    return(
        <div className={estilos.main}>
            <div >
            <strong className={estilos.titulo}>Contactame</strong>
            </div>
            <form  ref={form} onSubmit={sendEmail} className={estilos.formulario}>
                <div> 
                    <label className={estilos.label}>nombre</label>
                    <input className={estilos.inputs} name='name' placeholder="Ejemplo:juan"  value={input.name}  onChange={(e) => handleChange(e)} />
                    {errors.name ? (<p>{errors.name}</p>) : null}
                </div>
                <div> 
                    <label className={estilos.label} >email</label>
                    <input  className={estilos.inputs} name='email' placeholder="Ejemplo:dogApi@gmail.com" value={input.email}  onChange={(e) => handleChange(e)} />
                    {errors.email ? (<p>{errors.email}</p>) : null}
                </div>
                <div> 
                    <label className={estilos.label}>asunto</label>
                    <input   className={estilos.inputs} name='asunto'placeholder="Ejemplo: consulta"  onChange={(e) => handleChange(e)}/>
                    {errors.asunto ? (<p>{errors.asunto}</p>) : null}
                </div>
                <div> 
                    <label className={estilos.label}>Mensaje</label>
                    <textarea   className={estilos.textar} name='mensaje'placeholder="escriba su mensaje aqui" cols='40' rows='10'  onChange={(e) => handleChange(e)}/>
                    {errors.asunto ? (<p>{errors.asunto}</p>) : null}
                </div>
                <button className={estilos.botonF} type="submit">Enviar Mensaje</button>
            </form>
        
        </div>
    )
}