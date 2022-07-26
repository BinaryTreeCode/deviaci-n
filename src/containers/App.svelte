
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
    
    datos_ordenados = datos.sort((a, b) => a - b);
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

    let datos_acumulados =[];
    let suma_datos = 0;
    let datos_divididos = [];
    let datos_procentaje = [];
    let datos_multiplicados = [];
    const datos_elevados_multiplicados = [];
    let datos_elevados = []; //(x - X̅)^2
    let media;
    function parse (n) {
        return parseFloat (n.toFixed(2)); 
    }


    function datos_tabla() {    
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
    }

    let suma_datos_fi, suma_datos_Fi, suma_datos_fr, suma_datos_porcentaje, suma_datos_multiplicados, suma_datos_elevados, suma_datos_elevados_multiplicados;
    let datos_nombre = [], 
        datos_repetidos = [],
        datos_porcentuales = [];

        let varianza, desviación, coeficiente; //coeficiente de variación

    function suma() {
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

        if (array.length % 2 == 1) {
            Q1 = array[(array.length + 1) / 4];

            Q3 = array[(3*(array.length + 1)) / 4];
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
    }

    function procesing_dates() {
        array()
        tabla();
        construir();
        contar();
        duplicados();
        duplicados();
        datos_tabla ();
        suma();
        medidas ();
        imprimir();
        datos = [];
        clean();
    }

    let nombre = "xi";
    let table;
    let tablee;
    let value = false;

	function imprimir() {

        value = true;

        table.innerHTML = "<p>";
        table.innerHTML = "<thead>";
        table.innerHTML += `<thead> <th> ${nombre} </th> <th>fi</th> <th>Fi</th> <th>x * f</th>  <th>(x - X̅)^2</th> <th>(x - X̅)^2 * f</th>  <th>fr/n</th> <th>fi%</th> </thead>`;
        i = 0;
        while (i <= intervalos) { 
            table.innerHTML += `<tbody> <td>${datos_Nr[i].nombre}</td> <td>${datos_Nr[i].repite}</td> <td>${datos_acumulados[i]}</td> <td>${datos_multiplicados[i]}</td> <td>${datos_elevados[i]}</td> <td>${datos_elevados_multiplicados[i]}</td>  <td>${datos_divididos[i]}</td><td>${datos_procentaje[i]}</td></tbody>`;
            i++ 
        }

        table.innerHTML +=`<tfot> <td> total </td> <td> ${suma_datos_fi} </td> <td> ${suma_datos_Fi} </td> <td> ${suma_datos_multiplicados} </td> <td> ${suma_datos_elevados} </td> <td>  ${suma_datos_elevados_multiplicados} </td> <td>  ${suma_datos_fr} </td> <td> ${suma_datos_porcentaje} </td> </tfot>`;
    }

import Chart from "chart.js";
  
 let Canvas;

 let ctx;
function graficar() {

    ctx =  Canvas.getContext('2d');
    var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: datos_nombre,
        datasets: [{
            label: 'frecuencia absoluta',
            data: datos_repetidos,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(10, 200, 100, 0.5)',
                'rgba(255, 243, 1 , 0.5)',
                'rgba(1, 32, 255, 0.5)',
                'rgba(75, 0, 192, 0.5)',
                'rgba(10, 200, 1, 0.5)',
                'rgba(199, 24, 24, 0.5)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

  let fater;

  function borrar() {
        Canvas.remove();
        fater.innerHTML = '<canvas class="canvas" width="50" height="50" bind:this={Canvas} style="background-color: white;"></canvas>';
    }
//   const ctxs = [
//     id = "myChart",
//   ]
</script>




<style>
    :global(body) {
        background-color: #676778;
        color: white;
    }
    .fater {
    font-size: 62.5%;
}
    .canvas {
        max-width: 60rem;
        max-width: 50rem;
        background-color: white;
    }
</style>



<div>
    <form action="">
        <label for="datos">
            <samp>ingresa los datos separados por una coma</samp>
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
    
    <div bind:this={fater} class="fater">
        <canvas class="canvas" width="5" height="5" bind:this={Canvas} id="Canvas"></canvas>
    </div>
</div>
