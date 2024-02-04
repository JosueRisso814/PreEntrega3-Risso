
//CREACION DE CARDS / LLAMADO DE JSON LOCAL CON FETCH

function cargarProductos (){

fetch('./productos.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
            <img class='card-img' src='${producto.img}'>
            <div>
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <button class='producto-agregar' id='${producto.id}'>AGREGAR</button>
            </div>
            `;
    
            contenedorProductos.appendChild(div);
    
            detectarDarkModeEnLS();
        });

        actBotonesAgree();
        SumaTotal()
    })};

const contenedorProductos = document.querySelector('#contenedor-Productos');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numeroCarrito = document.querySelector('#cantidadCarrito');

// DETECTAR DARK MODE EN LOCAL STORAGE

function detectarDarkModeEnLS (){
    if (darkMode === 'activado') {
        activarDarkMode();
    } else {
        desactivarDarkMode();
    }
}

// PARA AGREGAR PRODUCTOS AL CARRITO 1

function actBotonesAgree(){
    botonesAgregar = document.querySelectorAll('.producto-agregar');

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

    Toastify({
        text: 'Agregado al carrito',
        duration: 4000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to left, rgb(187, 48, 97), #000000)',
        },
        onClick: function(){} // Callback after click
      }).showToast();

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
        ;
}
}

//PARA ACTUALIZAR TOTAL

function SumaTotal() {
    const totalDom = document.querySelector('#total');
    const total = carrito.reduce((acc, producto) => acc+ (producto.precio * producto.cantidad),0);
    totalDom.innerHTML= `<h3 class='separador'>TOTAL: $${total} </h3>`;
};

//PARA BOTON PARA DARK MODE

const botonColorMode = document.querySelector('#colorMode');

const body = document.body;

let darkMode = localStorage.getItem('darkMode');
    
function activarDarkMode() {
    body.classList.add('colorModes');
    botonColorMode.innerText = 'CAMBIAR A LIGHT MODE';
    localStorage.setItem('darkMode', 'activado');
}

function desactivarDarkMode() {
    body.classList.remove('colorModes');
    botonColorMode.innerText ='CAMBIAR A DARK MODE';
    localStorage.setItem('darkMode', 'desactivado');
}



botonColorMode.addEventListener('click', () => {
    localStorage.getItem('darkMode') === 'activado' ? desactivarDarkMode() : activarDarkMode();
})

cargarProductos();

VerProductosDelCarrito();

//MANEJO DE PROMESAS CON FETCH 

const listaDeProductosProximos = document.querySelector('#listaDeProductosProximos');

const ldppID = document.querySelector('#listaDeProductosProximosID')

fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                data.forEach(producto => {
                    const div = document.createElement('div');
                    div.classList.add('card');
                    div.innerHTML = `
            <div>
                <img class='card-img2' src='${producto.image}'>
                <div>
                <p class='parrafoNP'>${producto.title}</p>
                <p>$${producto.price}</p>
                </div>
            </div>
            `;
            ldppID.append(div);
                })
            });