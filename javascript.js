
let combos =[
 {  id:"Simple cheese",
    nombre:"Simple cheese",
    ingredientes:"Pan de papa, medallon de carne simple y cheddar",
    precio: 2100,
    imagen:"./images/simplecheese.jpg"
},

{
    id:"Homenaje doble cuarto de libra",
    nombre:"Homenaje doble cuarto de libra",
    ingredientes:"Pan de papa, cheddar, ketchup y doble carne",
    precio: 2900,
    imagen:"./images/doblecuarto.jpg"
},

{
    id:"Oklahoma",
    nombre:"Oklahoma",
    ingredientes:"Pan de papa, cheddar, pepinillo picado, salsa especial",
    precio: 3000,
    imagen:"./images/oklahoma.jpg"
},

{
    id:"Doble cheese",
    nombre:"Doble cheese",
    ingredientes:"Pan de papa, cheddar y doble carne",
    precio: 2700,
    imagen:"./images/doblecheese.jpg"
},

{
    id:"Americana",
    nombre:"Americana",
    ingredientes:"Pan de papa, cheddar, panceta crocante y doble carne",
    precio: 2900,
    imagen:"./images/americana.jpg"
},

{
    id:"Argentina",
    nombre:"Argentina",
    ingredientes:"Pan de papa, salsa criolla, vacio desmenuzado y provoleta",
    precio: 2900,
    imagen:"./images/argentina.jpg"
}
]








const formulario = document.querySelector('#buscador')
const boton = document.querySelector('#boton')
const resultado = document.querySelector('#resultado')
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector('#numerito')


//Buscador del menu
// addEventListener al presionar el boton buscar - Filtrar
const filtrar = () => { 
    resultado.innerHTML = ''

    const texto = formulario.value.toLowerCase()
    for(producto of combos){
        let nombre = producto.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            
            resultado.innerHTML += `
            <div>
                <div class="card text-center" style="width: 15rem; height: auto;">
                <img class="rounded" src="${producto.imagen}"  alt="${producto.nombre}">  
                <div class="card-body">
                <h5 class="card-title text-center">${producto.nombre}</h5>
                <p class="card-text text-center">${producto.ingredientes}</p>
                <p class="card-text text-center">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
      
            `
            
        }
        
    }

    if(resultado.innerHTML === '')
    {
        resultado.innerHTML += `
        <li> Producto no encontrado... </li>
        `
    
    }

    actualizarBotonesAgregar();
}

//boton.addEventListener('click', filtrar)
formulario.addEventListener('keyup', filtrar)

filtrar()

//botonescategoriasclick
const botonesCategorias = document.querySelectorAll(".boton-categoria")
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

    })    
})


//funcion actualizarbotonesagregar
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito)
    })
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")


if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito()
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id
    const productoAgregado = combos.find(producto => producto.id === idBoton)
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad +=1  
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    
    }

    actualizarNumerito()
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito
}