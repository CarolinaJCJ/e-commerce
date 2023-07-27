const precioTotal = document.querySelector(".precioTotal");
const divCarrito = document.querySelector(".cart-items");
const btnVaciar = document.querySelector("#btnVaciarCarrito");
const divProductos = document.querySelector('.shop-body');
const carritoContenedor = document.querySelector('#carrito-contenedor')
const inputBusqueda = document.querySelector('#busqueda');
const formBuscador = document.querySelector('#buscador');


const cartItemCount = document.querySelector(".cart-item-count");


let productos = []

let carrito = []


document.addEventListener('DOMContentLoaded', () => {
  cargarProductosDesdeJSON();
    if(!carrito.length){
        const sinProductos = document.createElement('p')
        sinProductos.textContent = 'No tienes productos agregados.'
        carritoContenedor.appendChild(sinProductos)
    }
})

function cargarProductosDesdeJSON() {
  fetch('data.json') 
    .then((response) => response.json()) 
    .then((data) => {
      productos = data; 
      cargarProductosEnLaPagina(productos); 
    })
    .catch((error) => {
      console.error('Error al cargar los productos:', error);
    });
}

btnVaciar.addEventListener("click", limpiarCarrito);

function limpiarCarrito() {
    carritoContenedor.innerHTML = "";
    cartItemCount.textContent = "0";
    carrito = []
    precioTotal.textContent = `Precio Total: $0`
}

divProductos.addEventListener('click', BtnAgregarClick);

function cargarProductosEnLaPagina(productos) {
    let contenidoHtml = "";

    productos.forEach((p) => {
        contenidoHtml += `
            <div id="caja_${p.id}" class="caja-producto">
                <div class="product-image"><img src="${p.img}" alt="image" /></div>
                <div class="product-title">${p.nombre}</div>
                <div class="product-description">${p.desc}</div>
                <div class="product-price">${p.precio}</div>
                <div class="product-button"><button id="${p.id}" class="btn-agregar">Agregar al carrito</button></div>
            </div>
        `;
    });

    divProductos.innerHTML = contenidoHtml;


}

function BtnAgregarClick(event) {
    const target = event.target;    
    console.log(carrito)
  
    if (target.classList.contains('btn-agregar')) {

        const productoId = parseInt(target.id); 
        const productoAAgregar = productos.find((p) => p.id === productoId); 
    
        if (productoAAgregar) {
          
            carrito.push(productoAAgregar); 
    
          
            console.log('Producto agregado al carrito:', productoAAgregar);
            
            cargarProductosEnElCarrito()
            const total = calcularTotalCarrito(carrito)
            precioTotal.textContent = `Precio Total: $${total}`
    
        
            cartItemCount.textContent = carrito.length;
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se agrego a tu carrito',
          showConfirmButton: false,
          timer: 1500
        })
    }
    
}

function cargarProductosEnElCarrito() {
    let contenidoHtml = "";

    carrito.forEach((p) => {
        contenidoHtml += `
            <div id="caja_${p.id}" class="caja-producto">
                <div class="product-image"><img src="${p.img}" alt="image" /></div>
                <div class="product-title">${p.nombre}</div>
                <div class="product-description">${p.desc}</div>
                <div class="product-price">${p.precio}</div>           
            </div>
        `;

    });

    carritoContenedor.innerHTML = contenidoHtml;

    guardarCarritoEnLocalStorage();
}

function calcularTotalCarrito(carrito) {
    let total = 0;
  
    for (const item of carrito) {
      total += item.precio;
      console.log(total)
    }
  
    return total;
  }

function filtrarProductosPorNombre(productos, nombre) {
    return productos.filter((p) => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

function limpiarCarrito() {
  carritoContenedor.innerHTML = '';
  cartItemCount.textContent = '0';
  carrito = [];
  precioTotal.textContent = 'Precio Total: $0';
  guardarCarritoEnLocalStorage();
  
}

formBuscador.addEventListener('submit',  async (event) => {
    event.preventDefault(); 
    const textoBuscado = inputBusqueda.value.trim();  

    const productosFiltrados = filtrarProductosPorNombre(productos, textoBuscado);

    cargarProductosEnLaPagina(productosFiltrados);
});

document.addEventListener('DOMContentLoaded', async () => {
  await cargarProductosDesdeJSON(productos);
  if (!carrito.length) {
      const sinProductos = document.createElement('p')
      sinProductos.textContent = 'No tienes productos agregados.'
      carritoContenedor.appendChild(sinProductos)
  }
  cargarCarritoDesdeLocalStorage();
  cargarProductosEnElCarrito();
});

Swal.fire({
  title: 'Bienvenido!',
  text: '',
  imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnh3Ynl1MjYzczJhNmowcWxkcDJwZnZieWo0bzd0NXA0d3Yyd3lycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4AlRnuga8EJOM/giphy.gif',
  imageWidth: 200,
  imageHeight: 300,
  imageAlt: 'Custom image',
})