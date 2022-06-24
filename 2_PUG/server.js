const express = require('express')
const app = express()
const rutas = require('./routes/index.js')
const puerto = 8080

//pug:
const path = require('path')
app.set("views", path.join( __dirname, "./views"));
app.set('view entinge', 'pug')

//para poder acceder al body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//rutas
app.use('/api', rutas)

//middleware de error:
app.use((error, req, res, next)=>{    
    console.log(error.statusMessage)
    res.status(500).send(error.message)
    //res.error(error)
})

app.listen(puerto, (err) => {
    if (err){
        console.log(`Hubo un error al iniciar el servidor: ${err}`)
    }else{
        console.log(`Servidor iniciado, escuchando en puerto: ${puerto}`)
    }
})