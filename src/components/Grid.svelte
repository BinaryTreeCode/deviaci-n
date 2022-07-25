<script>
    export let info = [{},{},{},];
    import Card from "./Card.svelte";
    // import { component } from "./store/store";

    let src = '../assets/casa.png'
</script>

<style>
    .cards {    
        margin-top: 4rem;
        margin-bottom: 4rem;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(3, 1fr);

        grid-row-gap: 4rem;
        grid-column-gap: 4rem;

        grid-auto-rows: minmax(100px, auto);
    }

</style>
 
<div class="cards">
    {#each info as info}
    <Card {...info} />
    {/each}
</div>

