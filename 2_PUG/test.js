const Contenedor = require('./controllers/contenedor.js')

const p = async () => {
    const contenedor = new Contenedor('./productos.txt');
    console.log(await contenedor.save({nombre:'silla', precio:1500}))
    console.log(await contenedor.save({nombre:'mesa', precio:8000}))
    console.log(await contenedor.save({nombre:'mantel', precio: 500}))
    //console.log(await contenedor.getById(3));
    //console.log(await contenedor.getAll());
    //console.log(await contenedor.deleteById(2));
    //console.log(await contenedor.deleteAll());
}

p();
