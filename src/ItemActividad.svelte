<script>
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let id;
    export let text;
    export let complete;

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch("remove", { id });
    }

    function toggleStatus() {
        let nuevoEstado = !complete;
        dispatch("toggle", {
            id,
            nuevoEstado,
        });
    }
</script>

 
    <li in:fly={{ x: 900, duration: 500 }}>
        {#if complete}
            <span class:complete>
                {text}
            </span>
            <button on:click={toggleStatus}> ✔️ </button>
        {:else}
            <span>
                {text}
            </span>
            <button on:click={toggleStatus}> ❌ </button>
        {/if}

        <button class="is-button" on:click={remove}> 🗑️ </button>
    </li>
 

<style>
    .complete {
        text-decoration: line-through;
        color: green;
    }

    span {
        margin-right: auto;
    }
    li {
        display: flex;
        font-size: 1.2em;
        font-weight: bold;
    }
    .items{
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }
</style>
