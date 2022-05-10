<script>
    import Profile from "./Profile.svelte";
    import Actividades from "./Actividades.svelte";


    // import ListaHacer from "./Todos.svelte"
    import { app, auth, googleProvider } from "../firebase";
    import { signInWithPopup, signInWithRedirect } from "firebase/auth";
    import { authState } from "rxfire/auth";
    import {fade} from "svelte/transition"
import { onMount } from "svelte";
    $: activo = false 

    let saliendo = false
    let user = authState(auth);
 
    console.log(user);
    // const unsubscribe = authState(auth).subscribe(u => user = u)

    const estaLogeando = () => {
        let estado = JSON.parse(window.sessionStorage.getItem("logeando"))  
        console.log(estado)
        activo = estado 

    }
    const logear = async () => {
        window.sessionStorage.setItem("logeando", "true") // redirect causa un refresh,  => solo en storage puede evitar borrado. 

        await signInWithPopup(auth, googleProvider)  
        
    }
 
    const delogear = async () => {
        window.sessionStorage.removeItem("logeando")
        activo = null
        await  auth.signOut()
       
    }

    onMount( () => { //redirect causa refresh, al refresh seteo bandera.  template render segun bandera
        estaLogeando()
    })
     
</script>

<section class="contenedor-app">
    <slot>
    {#if $user  }
        <Profile {...$user} />
        <!-- unwrap obj observable directo en template-->
        <button
            class="log-button button is-link btn btn-primary "
             on:click={delogear} >Deslogear</button
        >
        <hr />
        <Actividades uid={$user.uid} />
    {:else if activo}  <!-- refresh causado por enter o redirect -->
      <!--   <div class="">andando perring</div> --> 
        <div class="spinner-border spinner" role="status">
            <span class="sr-only"></span>
          </div>
    {:else }
        <!--user empty-->
        
        <button in:fade={{ delay:800}} class="log-button logear btn btn-outline-primary" on:click={logear} 
            >Logear con Google</button
        >
       
    {/if}
    </slot>
</section>

<style>
    .spinner{
        margin:0 auto;
    }
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
