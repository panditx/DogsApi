import estilos from '../About/About.module.css'
import image from '../../assets/react.png'
import image2 from '../../assets/redux.png'
import image3 from '../../assets/nodejs.png'
import image4 from '../../assets/sequalize.png'
import image5 from '../../assets/javaScrypt.png'
import image6 from '../../assets/html.png'
import image7 from '../../assets/css.png'
export default function About(){

    return(
        <div className={estilos.container}>
        <p  className={estilos.txt1}>Esta página fue creada como uno de los proyectos finales del curso intensivo full-time de Soy Henry.
        El objetivo de esta página es mostrar mis conocimientos adquiridos a través de las funciones de la página,
        entre ellos:</p>
        <ul className={estilos.lista}>
        <li>traer un listado de razas desde la api</li>
        <li>crear tu propia raza</li>
        <li>buscar la raza por nombre</li>
        <li>filtrar por Temperamento, Creados o Existentes</li>
        <li>Ordenar por peso y alfabeto</li>
        </ul> 
        <br/>
        <br/>
        <p>La informacion de las razas  fue obtenida de <a href='https://thedogapi.com/'>https://thedogapi.com/</a></p> 
        
        <br/>
        <br/>
        <strong className={estilos.txt} >Principales herramientas y software utilizados en el desarrollo de la página</strong>
    <br/>
    <div className={estilos.images}>
        <div>
        <img src={image}  alt='' width='100px'/>
        </div>
        <div>
        <img src={image2}  alt='' width='100px'/>
        </div>
        <div>
        <img src={image3}  alt='' width='100px'/>
        </div>
        <div>
        <img src={image4}  alt='' width='130px'/>
        </div>
        <div>
        <img src={image5}  alt='' width='105px'/>
        </div>
        <div>
        <img src={image6}  alt='' width='100px'/>
        </div>
        <div>
        <img src={image7} alt='' width='71px'/>
        </div>
        </div> 
    </div>
    )
}