const recetasLayout = document.querySelector("#recetas");
const searchBar = document.querySelector("#search");
let recetas;

recetasLayout.addEventListener("click", (e) => {




    if (e.target.closest(".receta__layout")) {
        receta = e.target.closest(".receta__nombre").innerText;
        window.location.href = "receta.html?receta=" + receta;
    }



})

fetch('assets/js/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Accediendo a los datos del primer plato
        const primerPlato = data[0];
        console.log('Nombre del plato:', primerPlato.nombre);
        console.log('Ingredientes:');
        primerPlato.ingrediente.forEach(ingrediente => {
            console.log(ingrediente.nombre, '-', ingrediente.cantidad);
        });
        console.log('Pasos de preparación:');
        primerPlato.paso.forEach((paso, index) => {
            console.log(`Paso ${index + 1}:`, paso.descripcion);
        });
        // Aquí puedes manipular o utilizar los datos como desees

        recetas = data;

        data.forEach(receta => {
            console.log(receta)

            recetasLayout.innerHTML += `<article class="receta__layout">
            <a href="#">
            <div class="receta__nombre">${receta.nombre}</div>
                <div class="receta__img-container">
                
                    <img class="receta__img" src="./assets/img/${receta.nombre}.png" alt="receta">
                </div>
            </a>
        </article>`

        })


    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


searchBar.addEventListener("input", (e) => {

    recetasLayout.innerHTML = "";

    recetas.forEach(receta => {

        if (receta.nombre.toLowerCase().includes(e.target.value.toLowerCase())) {
            recetasLayout.innerHTML += `<article class="receta__layout">
            <a href="#">
            <div class="receta__nombre">${receta.nombre}</div>
                <div class="receta__img-container">
                
                    <img class="receta__img" src="./assets/img/${receta.nombre}.png" alt="receta">
                </div>
            </a>
        </article>`
        }

    })


})