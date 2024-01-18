const PRODUCTOS = [
    {
        id:1, 
        nombre:'remera', 
        precio:5,
        img: '/img/RemeraBlackpink01.webp'
    },
    {
        id:2, 
        nombre:'buzo', 
        precio:8,
        img: '/img/buzo.webp'
    },
    {
        id:3, 
        nombre:'light stick', 
        precio:12,
        img: '/img/Lightstick.webp'
    }
]

const contenedorProductos = document.querySelector('#contenedor-Productos');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numeroCarrito = document.querySelector('#cantidadCarrito');


//CREACION DE CARDS 

function cargarProductos (){

    PRODUCTOS.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <img class="card-img" src="${producto.img}">
        <div>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="producto-agregar" id="${producto.id}">AGREGAR</button>
        </div>
        `;

        contenedorProductos.appendChild(div);
    })

    actBotonesAgree();
    SumaTotal()
}


// PARA AGREGAR PRODUCTOS AL CARRITO 1

function actBotonesAgree(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    })
};
// PARA AGREGAR PRODUCTOS DEL JS AL CARRITO

let carrito;
const productosEnCarritoLS = JSON.parse(localStorage.getItem('carrito-compras'));

if (productosEnCarritoLS) {
    
    carrito = productosEnCarritoLS;
    actualziarNumeroCarrito()

} else {

    carrito = [];
}

// PARA AGREGAR PRODUCTOS AL CARRITO 2

function agregarAlCarrito(e) {

    const idboton = e.currentTarget.id;

    const productoAgregado = PRODUCTOS.find(producto => producto.id == idboton);
    
    if(carrito.some(producto => producto.id == idboton)){
        const index = carrito.findIndex(producto => producto.id == idboton)
        carrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
        
    };

    actualziarNumeroCarrito();
    guardarCarritoEnLS();
    SumaTotal()
}

//PARA ACTUALIZAR EL NUMERO DEL CARRITO

function actualziarNumeroCarrito(){
    let numeroCarritoOk = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = numeroCarritoOk;
}

//PARA GUARDAR EL CARRITO EN LOCAL STORAGE

function guardarCarritoEnLS (){
    localStorage.setItem('carrito-compras', JSON.stringify(carrito));


}

//PARA VER EL CARRITO DEL LOCAL STORAGE

const productosEnCarrito = JSON.parse(localStorage.getItem('carrito-compras'));

const contenedorProductosCarrito = document.querySelector('#carrito');

function VerProductosDelCarrito(){
    if(productosEnCarrito){
        productosEnCarrito.innerHTML='';
        productosEnCarrito.forEach(producto => {

            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
            <div>
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: ${producto.precio * producto.cantidad}</p>
            </div>
            `;
            
            contenedorProductosCarrito.appendChild(div);
        });
    } else {
        console.log("tu carrito esta vacio");
}
}

//PARA ACTUALIZAR TOTAL

function SumaTotal() {
    const totalDom = document.querySelector('#total');
    const total = carrito.reduce((acc, producto) => acc+ (producto.precio * producto.cantidad),0);
    totalDom.innerHTML= `<h3 class='separador'>total: $${total} </h3>`;
};

//PARA BOTON PARA DARK MODE

const botonColorMode = document.querySelector("#colorMode");

const body = document.body;

let darkMode = localStorage.getItem("darkMode");

function activarDarkMode() {
    body.classList.add("colorModes");
    botonColorMode.innerText = "CAMBIAR A LIGHT MODE";
    localStorage.setItem("darkMode", "activado");
}

function desactivarDarkMode() {
    body.classList.remove("colorModes");
    botonColorMode.innerText = "CAMBIAR A DARK MODE";
    localStorage.setItem("darkMode", "desactivado");
}

if (darkMode === "activado") {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

botonColorMode.addEventListener("click", () => {

    if (localStorage.getItem("darkMode") === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
})

cargarProductos();


VerProductosDelCarrito();