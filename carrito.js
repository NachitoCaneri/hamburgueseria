let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")
const sweet = document.querySelector("#carrito-acciones-comprar")


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0){

        

        contenedorCarritoVacio.classList.add("d-none")
        contenedorCarritoProductos.classList.remove("d-none")
        contenedorCarritoAcciones.classList.remove("d-none")
        contenedorCarritoComprado.classList.add("d-none")
    
        contenedorCarritoProductos.innerHTML= ""
    
        productosEnCarrito.forEach(producto => { 
    
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-producto-titulo">
                    <h6>Titulo</h6>
                    <p>${producto.nombre}</p>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>    
    
            `;
    
            contenedorCarritoProductos.append(div)
        });
    }else {
        contenedorCarritoVacio.classList.remove("d-none")
        contenedorCarritoProductos.classList.add("d-none")
        contenedorCarritoAcciones.classList.add("d-none")
        contenedorCarritoComprado.classList.add("d-none")
    }

    actualizarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito()



function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}


function eliminarDelCarrito(e){
    let idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    productosEnCarrito.splice(index, 1)
    cargarProductosCarrito()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){
    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()
}


function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito(){
    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    contenedorCarritoVacio.classList.add("d-none")
    contenedorCarritoProductos.classList.add("d-none")        
    contenedorCarritoAcciones.classList.add("d-none")
    contenedorCarritoComprado.classList.remove("d-none")
    alertaSweet()
}


sweet.addEventListener('click', alertaSweet)

function alertaSweet(){
    Swal.fire({
        icon: 'success',
        title: 'Tu compra fue realizada con éxito',
        text: '¡Vuelva pronto!',
      })

      fetch('datos.txt')
      .then((respuesta)=>{
        return respuesta.text()
      })
      .then((respuesta)=>{
        document.querySelector('#carrito-comprado').innerHTML= respuesta
      })
      .catch((err)=>{
        alert(err)
      })
      
}


