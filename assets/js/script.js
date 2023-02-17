// 3.- Captura y Validacion del Dato Ingresado
$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        //3.1 Captura
        let heroInput = $("#heroInput").val();

        // 3.2 Validacion
        // 3.3 Comprobacion
        let validanumero = /\d/gmi;
        if (validanumero.test(heroInput)) {

            //3.4 Colsulta API con AJAX
            $.ajax({
                type: 'GET',
                url: `https://www.superheroapi.com/api.php/3525635500807579/${heroInput}`,
                success: function (data) {

                    let nombre = data.name;
                    let imagen = data.image.url;
                    let poder = data.powerstats;
                    let conexiones = data.connections["group-affiliation"];
                    let publicado = data.biography.publisher;
                    let ocupacion = data.work.occupation;
                    let aparicion = data.biography["first-appearance"];
                    let altura = data.appearance.height;
                    let peso = data.appearance.weight;

                    // 3.5 Renderizacion de Info Recibida por la API con CARD de Bootstrap
                    // Datos Tarjeta Herore - Nombre, Conexiones, Publicado Por, Ocupacion, Primera Aparcion, Altura, Peso
                    document.getElementById("tarjetaHeroe").innerHTML = `<div><img class="col-12" src="${imagen}"></div>`;
                    document.getElementById("textoHeroe").innerHTML = `<div><ul class="list-unstyled">
                    <li>Nombre: ${nombre}</li>
                    <hr>
                    <li>Conexiones: ${conexiones}</li>
                    <hr>
                    <li>Publicado Por: ${publicado}</li>
                    <hr>
                    <li>Ocupacion: ${ocupacion}</li>
                    <hr>
                    <li>Primera Aparicion: ${aparicion}</li>
                    <hr>       
                    <li>Altura: ${altura}</li>
                    <hr>
                    <li>Peso: ${peso}</li>
                    <hr>
                    </ul></div>`

                    // 3.6 Ciclos y Metodos para Ordenar la Info
                    let estadisticas = [];

                    for (const key in poder) {
                        console.log('esta es la llave', key)
                        console.log('este es el valor', parseInt(poder[key]))
                        estadisticas.push({
                            label: key,
                            y: parseInt(poder[key])
                        })
                    }
                    console.log('arreglo estadistica', estadisticas)

                    // 3.7 Grafico de Canvas JS
                    let config = {
                        animationEnabled: true,
                        title: {
                            text: "Estadisticas de Poder para " + nombre
                        },
                        axisY: {
                            title: "Valor"
                        },
                        axisX: {
                            title: "Estadisticas"
                        },
                        data: [{
                            type: "pie",
                            dataPoints: estadisticas,
                        }]
                    };
                    let chart = new CanvasJS.Chart("graficoHeroe", config);
                    chart.render();
                }
            });
        }
        else {
            // 3.8 Alerta de Error de Busqueda
            alert('Debe Ingrersar un Valor Numérico');
        };
    });
});