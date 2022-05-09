<script>
    import Profile from "./Profile.svelte";
    import Actividades from "./Actividades.svelte";


    // import ListaHacer from "./Todos.svelte"
    import { app, auth, googleProvider } from "../firebase";
    import { signInWithPopup, signInWithRedirect } from "firebase/auth";
    import { authState } from "rxfire/auth";
    import {fade} from "svelte/transition"

    $: show = true
    let user = authState(auth);
    let cambioEstado = true
    console.log(user);
    // const unsubscribe = authState(auth).subscribe(u => user = u)

    const logear =  () => {
       
             signInWithPopup(auth, googleProvider)
    
         
    }

    const desactivar = (event) => {
        console.log(event)
    }
   
</script>

<section class="contenedor-app">
    <slot>
    {#if $user  }
        <Profile {...$user} />
        <!-- unwrap obj observable directo en template-->
        <button
            class="log-button button is-link"
            on:click={() => auth.signOut()}>Deslogear</button
        >
        <hr />
        <Actividades uid={$user.uid} />
    {:else }
        <!--user empty-->
    
        <button in:fade={{duration:1600}} class="log-button logear" on:click={logear} 
            >Logear con Google</button
        >
       
    {/if}
    </slot>
</section>

<style>
    section {
        background: rgb(235, 235, 235);
        padding: 20px;
    }

    .desaparecer {
        opacity: 0;
    }
    .logear {
        width: 200px;
        height: 40px;
        margin: 0 auto;
    }

    .log-button {
        margin-top: 10px;
        align-self: flex-start;
    }
    .contenedor-app {
        display: flex;
        flex-direction: column;
        padding: 15% 8%;
        gap: 10px;
    }
    @media screen and (min-width: 1000px) {
        .contenedor-app {
            padding: 10% 18%;
        }
    }
</style>
