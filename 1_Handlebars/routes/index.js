const express = require('express')
const { Router } = require('express')
const router = Router()

//declaro mi clase contenedor
const Contenedor = require('../controllers/contenedor')

//inicializo el contenedor con el archivo de productos
const contenedor = new Contenedor('./productos.txt');

router.get('/', express.static('public'))

router.get('/productos', (req, res) =>{
    const p = async () => {
        const productos = await contenedor.getAll();
        console.log("productos:")
        console.log(productos)
        console.log(typeof productos)
        res.status(200).render('productos', {productos})
    }

    p();
})

router.get('/agregarProducto', (req, res) =>{
    res.render('addProductForm')
})

router.get('/productos/:id', (req, res) =>{
    //transformo a Number el contenido de id que era string
    const id = Number(req.params.id) //en caso de no contener un numero, la funciona devuelve un NaN
    if (isNaN(id)) //NaN = Not a Number
    {
        res.status(400).json({error:`${req.params.id} no es un número válido`})
        return
    }

    const p = async () => {
        res.status(200).json(await contenedor.getById(id));
    }
    p();
})

router.post('/productos', (req,res) =>{
    const {nombre, precio, thumbnail} = req.body //se levantan los parametros del req.body
    const p = async()=>{
        try{
            await contenedor.add({nombre:nombre, precio:precio, thumbnail:thumbnail})
            res.status(201).redirect('/api/productos') //status 201 es OK
        }catch(e){
            res.sendStatus(500) //status 500 es Server Error
        }
    }
    p();    
})

router.delete('/productos/:id', (req,res) =>{

    //transformo a Number el contenido de id que era string
    const id = Number(req.params.id) //en caso de no contener un numero, la funciona devuelve un NaN
    if (isNaN(id)) //NaN = Not a Number
    {
        console.log('error')
        res.status(400).json({error:`${req.params.id} no es un número válido`})
        return
    }

    const p = async()=>{
        try{
            await contenedor.deleteById(id)
            res.sendStatus(200) //status 201 es OK
        }catch(e){
            res.sendStatus(500) //status 500 es Server Error
        }
    }
    p();
})

{//PUT
// router.put('/productos/:id', (req,res) =>{
//     const {nombre, precio, thumbnail} = req.body //se levantan los parametros del req.body

//     //transformo a Number el contenido de id que era string
//     const id = Number(req.params.id) //en caso de no contener un numero, la funciona devuelve un NaN
//     if (isNaN(id)) //NaN = Not a Number
//     {
//         console.log('error')
//         res.status(400).json({error:`${req.params.id} no es un número válido`})
//         return
//     }

//     //transformo a Number el precio
//     const precioFinal = Number(precio) //en caso de no contener un numero, la funciona devuelve un NaN
//     if (isNaN(precioFinal)) //NaN = Not a Number
//     {
//         console.log('error')
//         res.status(400).json({error:`${precioFinal} no es un número válido`})
//         return
//     }

//     //obtengo la posición del producto dentro del array
//     const index = productos.findIndex(p => {
//         return p.id === id;
//     });

//     //si no existe, devuelvo el error correspondiente
//     if (index == -1){
//         res.status(400).json({error:`No existe producto con el id: ${id}`})
//         return
//     }

//     //actualizo el producto
//     productos[index].nombre = nombre;
//     productos[index].precio = precio;
//     productos[index].thumbnail = thumbnail;

//     res.sendStatus(202) //status 202 es OK
// })
}

module.exports = router; //exporto para poder usarlo en otro file