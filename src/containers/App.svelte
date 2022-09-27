
<script>
    
    // import chartjs from 'chart.js';



	// import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    let datos;

    function array() {
        datos = datos.split(',').map(Number);
    }
    
    let largo, rango, dato_mayor, dato_menor, datos_ordenados, intervalos, ampltud;

function tabla() {
    largo = datos.length - 1;
    
    datos_ordenados = datos.slice();
    datos_ordenados = datos_ordenados.sort((a, b) => a - b);
    dato_menor = datos_ordenados[0];
    dato_mayor = datos_ordenados[largo];
    
    rango = dato_mayor - dato_menor;
    
    let operación = Math.log10(datos.length) * 3.322 + 1;
    intervalos = Math.round(operación);
    /* ampltud = rango/intervalos; */
    }

    class datoID {
        constructor(I, n) {
            this.nombre = I;
            this.id = n;
            this.repite = 0;
        }
    }
    
    let datos_Nr = [];
    let i = 0;
    let e = 0;
    
    function construir() {
        i = 0;
        while (i <= largo) {
            var dato = new datoID(datos_ordenados[0 + i], i);
            datos_Nr.push(dato);
            i++;
        }
    }
    
    function contar() {
        var i = 0;
        let e = 0;
        while (i <= largo) {
            while (e <= largo) {
                if (datos_ordenados[0 + i] === datos_ordenados[0 + e]) {
                    datos_Nr[0 + i].repite += 1;
                }
                else {
                }
                e++;
            }
            i++;
            e = 0;
        }
    }
    
    var largo_Nr;
    function duplicados() {
        i = 0;
        e = 0;
        largo_Nr = largo;
        while (i <= largo_Nr) {
            while (e <= largo_Nr) {
                if (datos_Nr[i].nombre === datos_Nr[e].nombre && datos_Nr[i].id !== datos_Nr[e].id) {
                    datos_Nr.splice(i, 1);
                } else {
                }
                largo_Nr = datos_Nr.length-1;
                e++;
            }
            e = 0;
            i++;
        }
    }

    let datos_acumulados = [];
    let suma_datos = 0;
    let datos_divididos = [];
    let datos_procentaje = [];
    let datos_multiplicados = [];
    const datos_elevados_multiplicados = [];
    let datos_elevados = []; //(x - X̅)^2
    let datos_nombre = [];
    let datos_repetidos = [];

    let media;
    function parse (n) {
        return parseFloat (n.toFixed(2)); 
    }


    function datos_tabla() {  
        
        datos_repetidos = datos_Nr.map(dato => dato.repite);
        console.log(datos_Nr);
        /* calcula FI */ 
    
        datos_Nr.forEach(function(numero) {
            suma_datos = numero.repite + suma_datos;
            datos_acumulados.push(suma_datos);
        });
    
        /* x*f  */
        datos_Nr.forEach(function(numero) {
            datos_multiplicados.push(numero.nombre * numero.repite);
        });

        /* medidas de tendecia central */

        suma_datos_multiplicados = datos_multiplicados.reduce((sum, date) => sum + date, 0); 
        media = suma_datos_multiplicados / suma_datos;


        /* (x - X̅)^2 */
        datos_Nr.forEach(function(dato) {
            let number = Math.pow(dato.nombre - media, 2);
            datos_elevados.push(parse(number));
        });

        /*(x - X̅)^2 * f */
        let i = 0;
        while (i <= largo_Nr) {
            let number = datos_elevados[i] * datos_Nr[i].repite;
            datos_elevados_multiplicados.push(parse(number));
            i++;
        }

        /* calcula fr o fi/n */ 
        datos_Nr.forEach(function(numero) {
            let división = numero.repite / suma_datos;
            división = parse(división);
            datos_divididos.push(división);
        });
    
            /* calcula fi% */ 
        datos_divididos.forEach(function(numero) {
            let multiplicación = numero * 100;
            multiplicación = parse(multiplicación);
            datos_procentaje.push(multiplicación);
        });


        /* labels */
        datos_Nr.forEach(function(dato) {
            var nombreG = dato.nombre;
            datos_nombre.push(nombreG);
        });
    }

    let suma_datos_fi, suma_datos_Fi, suma_datos_fr, suma_datos_porcentaje, suma_datos_multiplicados, suma_datos_elevados, suma_datos_elevados_multiplicados;

        let varianza, desviación, coeficiente; //coeficiente de variación

    function resta_media() {
        suma_datos_fi = suma_datos
    
        suma_datos_Fi = datos_acumulados.reduce((sum, date) => sum + date, 0);

        suma_datos_fr = datos_divididos.reduce((sum, date) => sum + date, 0);
        suma_datos_fr = Math.round(suma_datos_fr);

        suma_datos_porcentaje = datos_procentaje.reduce((sum, date) => sum + date, 0);
        suma_datos_porcentaje = Math.round(suma_datos_fr) * 100;

       suma_datos_elevados = datos_elevados.reduce((sum, date) => sum + date, 0); 
       suma_datos_elevados_multiplicados = datos_elevados_multiplicados.reduce((sum, date) => sum + date, 0);
    }

    let Q1, Q2, Q3;
    function cuartiles(array) {
        Q2 = mediana; //mediana de datos_ordenados

        let mitad = Math.floor(array.length / 2);
        let cuarto = Math.floor(array.length / 4);

        console.log(mitad);
        console.log(cuarto);

        if (array.length % 2 == 1) {
            Q1 = array[(array.length - 1) / 4];

            Q3 = array[(3*(array.length - 1)) / 4];

        } else {

            console.log("si cuarto es" + cuarto + "y cuarto - 1 = " + (cuarto - 1) + ", cuya posición es " + array[cuarto - 1] + " y array[cuarto] = " + array[cuarto]);
            Q1 = (array[cuarto - 1] + array[cuarto]) / 2;
            Q3 = (array[mitad + cuarto - 1] + array[mitad + cuarto]) / 2;
        }
    }



    let moda, mediana;
    function medidas (){

        //Medidas de tendecia centarl 

        let index = Math.max(...datos_Nr.map(numero => numero.repite));
        let maxNumber = datos_Nr.map(numero => numero.repite).indexOf(index);

        moda = datos_Nr[maxNumber].nombre;

        let mitad = Math.floor(datos_ordenados.length / 2);
        mediana = datos_ordenados.length % 2 == 1 ? datos_ordenados[mitad] : (datos_ordenados[mitad - 1] + datos_ordenados[mitad]) / 2;
        
        //Medidas de disperción 

        varianza = parse(suma_datos_elevados_multiplicados / suma_datos_fi);
        desviación = parse(Math.sqrt(varianza)); //desviación estándar
        coeficiente = parse((desviación / media) * 100);

        cuartiles(datos_ordenados)
    }


    function clean() {
        datos = [];
        datos_nombre = [];
        datos_repetidos = [];
        datos_porcentuales = [];
        datos_ordenados = [];
        datos_Nr = [];
        datos_acumulados = [];
        datos_divididos = [];
        datos_procentaje = [];
        datos_multiplicados = [];
        datos_elevados = [];
        datos_elevados_multiplicados = [];


        suma_datos = 0;
        suma_datos_fi = 0;
        suma_datos_Fi = 0;
        suma_datos_fr = 0;
        suma_datos_porcentaje = 0;

        suma_datos_multiplicados = 0;
        suma_datos_elevados = 0;
        suma_datos_elevados_multiplicados = 0;

        media = 0;
        moda = 0;
        mediana = 0;
        varianza = 0;
        desviación = 0;
        coeficiente = 0;
        Q1 = 0;
        Q2 = 0;
        Q3 = 0;

        borrar();
    }

    let array_media = [];
    let array_moda = [];
    let array_mediana = [];
    let array_varianza = [];
    let array_desviación = [];

    function clones (array,value) {
        i = 0;
        while (i <= datos_ordenados.length-1) {
            array.push(value);
            i++;
        }
    }


    function clone_media () {
        clones(array_media,media);
        clones(array_moda,moda);
        clones(array_mediana,mediana);

        clones(array_varianza,varianza);
        clones(array_desviación,desviación);
    }


    function procesing_dates() {
        
        array()
        console.log("datos1 = " + datos)
        tabla();
        console.log("datos2 = " + datos)
        construir();
        console.log("datos3 = " + datos)
        contar();
        console.log("datos4 = " + datos)
        duplicados();
        console.log("datos5 = " + datos)
        duplicados();
        console.log("datos6 = " + datos)
        duplicados();
        console.log("datos7 = " + datos)

        // datos_Nr =
        // [
        //     {nombre: 1, id: 1, repite: 1942},
        //     {nombre: 2, id: 2, repite: 18995},
        //     {nombre: 3, id: 3, repite: 25325},
        //     {nombre: 4, id: 4, repite: 13521},
        //     {nombre: 5, id: 5, repite: 9071},
        //     {nombre: 6, id: 6, repite: 1341},
        //     {nombre: 7, id: 7, repite: 57}
        // ]



        
        datos_tabla ();
        console.log("datos8 = " + datos)
        resta_media();
        console.log("datos9 = " + datos)
        medidas ();
        console.log("datos10 = " + datos)
        imprimir();
        console.log("datos11 = " + datos)
        graficar();
        console.log("datos12 = " + datos)
        clean();
        console.log("datosFinal = " + datos)
    }

    let nombre = "xi";
    let table;
    let value = false;

    let lables_number = [];
    function etiquetas () {
        for (let i = 0; i < datos_ordenados.length; i++) {
            lables_number.push(datos_nombre[i]);
        }
    }

    

	function imprimir() {
        
        etiquetas ();
        value = true;

        //table.innerHTML = "<p>";
        table.innerHTML = "<thead>";
        table.innerHTML += `<thead> <th> ${nombre} </th> <th>fi</th> <th>Fi</th> <th>x * f</th>  <th>(x - X̅)^2</th> <th>(x - X̅)^2 * f</th>  <th>fr/n</th> <th>fi%</th> </thead>`;
        i = 0;
        while (i <= datos_Nr.length-1) { 
            table.innerHTML += `<tbody> <td>${datos_Nr[i].nombre}</td> <td>${datos_Nr[i].repite}</td> <td>${datos_acumulados[i]}</td> <td>${datos_multiplicados[i]}</td> <td>${datos_elevados[i]}</td> <td>${datos_elevados_multiplicados[i]}</td>  <td>${datos_divididos[i]}</td><td>${datos_procentaje[i]}</td></tbody>`;
            i++ 
        }

        table.innerHTML +=`<tfot> <td> total </td> <td> ${suma_datos_fi} </td> <td> ${suma_datos_Fi} </td> <td> ${suma_datos_multiplicados} </td> <td> ${suma_datos_elevados} </td> <td>  ${suma_datos_elevados_multiplicados} </td> <td>  ${suma_datos_fr} </td> <td> ${suma_datos_porcentaje} </td> </tfot>`;
    }


    let blue = "#00bfff";



import Chart from "chart.js";
  
 let Canvas;
 let Canvas2;


 let ctx;
 let ctx2;

 let new_chart;
 let new_chart2;

 import { decimation } from "chart.js"; 



function graficar() {
    clone_media ()
    const data1 = {
        labels:  datos_ordenados,
        datasets: [
            {
                label: 'datos',
                data: datos_ordenados,
                borderColor: blue,
                backgroundColor: blue,
                fill: false
            },
            {
                label: 'promedio',
                data: array_media,
                borderColor: blue,
                backgroundColor: blue,
                fill: false,
                borderDash: [5, 5],
            },
            {
                label: 'moda',
                data: array_moda,
                borderColor: blue,
                backgroundColor: blue,
                fill: false,
                borderDash: [5, 5],
            },
            {
                label: 'mediana',
                data: array_mediana,
                borderColor: blue,
                backgroundColor: blue,
                fill: false,
                borderDash: [5, 5],
            }
        ]
    };

    const config1 = {
        type: 'line',
  data: data1,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
}
    };

    const data2 = {
        labels:  datos_nombre,
        datasets: [
            {
                label: 'fi',
                data: datos_repetidos,
                borderColor: blue,
                backgroundColor: blue,
                fill: false
            },
            {
                label: 'fi%',
                data: datos_procentaje,
                borderColor: blue,
                backgroundColor: blue,
                fill: false,
                borderDash: [5, 5],
            },
        ]
    };

    const config2 = {
        type: 'line',
  data: data2,
  options: {
    // Turn off animations and data parsing for performance
    animation: false,
    parsing: false,

    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    // plugins: {
    //   decimation: decimation,
    // },
    scales: {
      x: {
        type: 'value',
        ticks: {
          source: 'auto',
          // Disabled rotation for performance
          maxRotation: 0,
          autoSkip: true,
        }
      }
    }
  }
    };

    var i = 1;
var array = [];


    ctx = Canvas.getContext('2d');
    new_chart = new Chart(ctx, config1);

    ctx2 = Canvas2.getContext('2d');
    new_chart2 = new Chart(ctx2, config2);



}

function count () {
    array.map(number => number*8)
}

function borrar() {
    new_chart.destroy();
    new_chart2.destroy();
    }

</script>




<style>
    :global(body) {
        background-color: #676778;
        color: #fff;
    }
    /* .fater {
    font-size: 62.5%;
}
    .fater canvas {
        max-width: 60rem;
        max-width: 50rem;
        background-color: white;
    } */
</style>



<div>
    <form action="">
        <label for="datos">
            <samp>ingresa los datos separados por una coma y sin usar coma para los decimales(ej: 3,5 pero si 3.5)</samp>
            <textarea on:change={procesing_dates} bind:value={datos} name="comentarios" rows="1" cols="25" placeholder="1, 2, 3, 4, 5..." id="datos" 
            required ></textarea> 

            <p>{datos}</p>
            <button type="button" on:click={imprimir}>imprimir()</button>
        </label> 
    </form>
    

    <div >
        {#if value}
        <table border bind:this={table} transition:fly={{ y: -20 }}>h</table>
        <h2>Media = {media}</h2>
        <h2>Moda = {moda}</h2>
        <h2>Mediana = {mediana}</h2>

        <h2>Varianza = {varianza}^2</h2>
        <h2>Desviacion Estandar = {desviación}</h2>
        <h2>Rango = {rango}</h2>

        <h2>Coeficiente de variación = {coeficiente}%</h2>

        <h2  style="font-size: 2rem;">cuartiles:</h2>
        <h2>Q1 = {Q1}</h2>
        <h2>Q2 = {Q2}</h2>
        <h2>Q3 = {Q3}</h2>

        {/if}
    </div>

    <button on:click={graficar}>Load</button>   
    <button on:click={borrar}>Clear</button>
        <canvas class="canvas" width="5" height="5" bind:this={Canvas} id="Canvas"></canvas>
        <canvas class="canvas" width="5" height="5" bind:this={Canvas2} id="Canvas"></canvas>
    </div>