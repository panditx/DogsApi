const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Dog, Temperamento} = require ('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getDogs = async () => {
    const  dogsBreeds = await axios.get('https://api.thedogapi.com/v1/breeds')
    const dataBreeds = await  dogsBreeds.data.map(b => {
        return  {
        id: b.id,
        name:  b.name,
        temperament: b.temperament,
        weight : b.weight.metric,
        height: b.height.metric,
        life: b.life_span,
        image: b.image.url,
        }
        
        })
        return dataBreeds;
}
const DbDogs = async () => {
    return await Dog.findAll({
        include:{
            model: Temperamento,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        } 
    })
}
const getAllDogs = async () => {
    const apiInfo = await getDogs();
    const baseDogs = await DbDogs();
    const allInfo = apiInfo.concat(baseDogs);
    return allInfo;
}

router.get('/dogs', async (req,res) => {
    const name = req.query.name
    let allBreeds = await getAllDogs();
    if(name) {
        let dogsName = await allBreeds.filter( p => p.name.toLowerCase().includes(name.toLowerCase()));
        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(404).send('No se encuentra la raza')
    }else{
        res.status(200).send(allBreeds) }
})

router.get('/dogs/:id', async (req,res) => { 
const {id} = req.params;
    let  breeds = await getAllDogs();
if(id){
    let dogId = await breeds.filter(b => b.id == id)
    dogId.length ?
    res.status(200).json(dogId) :
    res.status(404).send('no se encontro la raza')
}
})

router.get('/temperaments', async (req,res) => {
const apiTemp = await axios.get('https://api.thedogapi.com/v1/breeds')
let temperament = []
const temp =   apiTemp.data.map( t => {
    if(t.temperament !==undefined){
        let tempArr = t.temperament.split(', ')
        tempArr.map(t => temperament.push(t))
    }
})

temperament.forEach(t => {
    Temperamento.findOrCreate({
        where: {name: t}
    })
})
const allDogs = await Temperamento.findAll();
res.send(allDogs)
})

router.post('/dogs', async (req,res) => {
    let {
        
        name,
        height,
        weight,
        life,
        image,
        createdInDb,
        temperament
    } = req.body;

    const dogCreate = await Dog.create({
        
        name,
        height,
        weight,
        life,
        image,
        createdInDb
    })

let tempInDb = await Temperamento.findAll({where: {name: temperament }})
dogCreate.addTemperamento(tempInDb)
res.send('personaje creado')
})

module.exports = router;
