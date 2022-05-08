<script>
  
    import { createEventDispatcher } from "svelte";
    import { scale } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
    export let id
    export let complete
    export let text
    

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch("remove", { id });
    }

    function toggleStatus() {
        let newStatus = !complete;
        dispatch("toggle", {
            id,
            newStatus,
        });
    }

  
    
</script>

<li in:fly={{ x: 900, duration: 500 }} out:fade />
<li>
    {#if complete}
        <span  
      
        class="is-complete is-button acti">{text}</span>
        <button on:click={toggleStatus}> ✔️ </button>
    {:else}
        <span>{text}</span>
        <button  class="is-button acti" on:click={toggleStatus}> ❌ </button>
    {/if}

    <button class="is-button" on:click={remove}> 🗑️</button>
</li>

<style>
       .is-complete {
        text-decoration: line-through;
        color: green;
    }

   

    span {
        margin-right: auto;
        align-self: center;
    }
    li {
        display: flex;
        font-size: 1.2em;
        font-weight: bold;
    }
    
</style>
