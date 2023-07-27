
let combos =[
 {  
    nombre:"Simple cheese",
    ingredientes:"Pan de papa, medallon de carne simple y cheddar",
    precio: 2100,
    imagen:"./images/simplecheese.jpg"
},

{
    nombre:"Homenaje doble cuarto de libra",
    ingredientes:"Pan de papa, cheddar, ketchup y doble carne",
    precio: 2900,
    imagen:"./images/doblecuarto.jpg"
},

{
    nombre:"Oklahoma",
    ingredientes:"Pan de papa, cheddar, pepinillo picado, salsa especial",
    precio: 3000,
    imagen:"./images/oklahoma.jpg"
},

{
    nombre:"Doble cheese",
    ingredientes:"Pan de papa, cheddar y doble carne",
    precio: 2700,
    imagen:"./images/doblecheese.jpg"
},

{
    nombre:"Americana",
    ingredientes:"Pan de papa, cheddar, panceta crocante y doble carne",
    precio: 2900,
    imagen:"./images/americana.jpg"
},

{
    nombre:"Argentina",
    ingredientes:"Pan de papa, salsa criolla, vacio desmenuzado y provoleta",
    precio: 2900,
    imagen:"./images/argentina.jpg"
}
]






/* Buscador del menu */

const formulario = document.querySelector('#buscador')
const boton = document.querySelector('#boton')
const resultado = document.querySelector('#resultado')

// addEventListener al presionar el boton buscar - Filtrar
const filtrar = () => { 
    resultado.innerHTML = ''

    const texto = formulario.value.toLowerCase()
    for(producto of combos){
        let nombre = producto.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            
            resultado.innerHTML += `
            <div>
                <div class="card" style="width: 15rem;">
                <img src="${producto.imagen}"  alt="${producto.nombre}">  
                <div class="card-body">
                <h5 class="card-title text-center">${producto.nombre}</h5>
                <p class="card-text text-center">${producto.ingredientes}</p>
                <p class="card-text text-center">$${producto.precio}</p>
                <a href="#" class="btn btn-primary d-flex justify-content-center">Pedí aquí</a>
                </div>
            </div>
      
            `
        }
    }

    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
        <li> Producto no encontrado... </li>
        `
    
    }

}

//boton.addEventListener('click', filtrar)
formulario.addEventListener('keyup', filtrar)

filtrar()

