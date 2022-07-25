<script>
    import Grid from "./Grid.svelte";
    
    export let info = [{},{},{},];
    export let title = "";
    export let about = "es el ingreso de sustancias que no pertenecen al ecosistema, lo que afecta su equilibrio; esta contaminación puede ser natural o artificial. Existen diferentes tipos de contaminaciones";
</script>

<style>
    section {
        justify-content: center;
        align-items: center;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    section h1 {
        font-size: 2em;
        text-align: center;
        grid-column: 1;
        grid-row: 1;
    }

    section p {
        font-size: 1.2rem;
        text-align: center;
        grid-column: 2;
        grid-row: 1;
    }
</style>


<div class="page">
    <section>
        <h1>Tipos contaminación {title}:</h1>
        <p> 
            La contaminación {title} {about}
        </p>
    </section>
    <!-- <a href="https://svelte-deploy--contaminacion.netlify.app/">
            <figure>
                <img src="../assets/House.png" alt="home" width="60px">          
            </figure>
    </a>  -->
    <Grid info={info}/>
</div> 
