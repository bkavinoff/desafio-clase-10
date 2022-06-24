const express = require('express')
const app = express()
const rutas = require('./routes/index.js')
const puerto = 8080

//handlebars:
const path = require('path')
const { engine } = require('express-handlebars')
app.use(express.static('public'))

//para poder acceder al body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//seteo el motor de plantillas
app.engine('hbs', engine({ //primer parametro, el tipo de archivo
    extname:'.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials'),
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')


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