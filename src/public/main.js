const productsList =  document.getElementById("products-list"); //Seleccionamos el elemento del Dom donde va a estra la lista de productos 
productsList.innerHTML = "Cargando productos..." //Mostramos un mensaje mientras carga el producto 


// Función para obtener los productos desde el servidor
const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products'); // aqui hacemos la peticion a la ruta /api/products
        const products = await response.json();

        // Limpiamos el mensaje de carga
        productsList.innerHTML = '';

        // Renderizamos los productos en el DOM
        products.forEach(product => {
            productsList.innerHTML += `<li>${product.title}, ${product.description}, $${product.price}</li>`;
        });
    } catch (error) {
        productsList.innerHTML = 'Error al cargar los productos';
        console.error('Error al obtener los productos:', error);
    }
};

// Llamamos a la función para obtener y mostrar los productos
fetchProducts();

// Conexión a socket.io
const socket = io();

socket.on("connect", () => {
    console.log("Conectado al servidor de socket.io");
});



socket.on("disconnect", () => {
    console.log("Desconectado del servidor de socket.io");
});

// Formulario para agregar productos 
const form = document.getElementById("product-form");
form.addEventListener("submit", async (event) =>{
    event.preventDefault();


    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value; 
    const price = document.getElementById("price").value; 
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").checked;
    const thumbnails = document.getElementById("thumbnails").files;

    const newProduct = { title, description, price, code, stock, category, status, thumbnails };

    try {
        const response = await fetch("/api/view/realTimeProducts/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            console.log("Producto agregado correctamente");
            socket.emit("nuevoProducto", newProduct);
            event.target.reset();
        } else {
            console.error("Error al agregar el producto");
        }
    } catch (error) {
        console.error("Error al enviar producto:", error);
    }

    // socket.emit("nuevoProducto", newProduct);
    // event.target.reset();



    // try{
    //     const response = await fetch("/realTimeProducts",{
    //         method: 'POST',
    //         headers:{
    //             "content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newProduct)
    //     });
    //      if (response.ok){
    //         console.log("Producto agregado correctamente");
    //     }else {
    //         console.error("Error al agregar el producto");
    //     }
    // } catch(error){
    //     console.error("Error al enviar producto:", error);
    // }


});

socket.on("productos", (newProduct) => {
    const item = document.createElement("li");
    item.textContent = `${newProduct.title}, ${newProduct.description}, $${newProduct.price}`;
    productsList.appendChild(item);
});


