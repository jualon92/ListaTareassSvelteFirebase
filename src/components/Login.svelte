<script>
    import Profile from "./Profile.svelte";
    import Actividades from "./Actividades.svelte";


    // import ListaHacer from "./Todos.svelte"
    import { app, auth, googleProvider } from "../firebase";
    import { signInWithRedirect } from "firebase/auth";
    import { authState } from "rxfire/auth";
    

    let user = authState(auth);
    console.log(user);
    // const unsubscribe = authState(auth).subscribe(u => user = u)

    const logear = () => {
        signInWithRedirect(auth, googleProvider);
    };
</script>

<section class="contenedor-app">
    {#if $user}
        <Profile {...$user} />
        <!-- unwrap obj observable directo en template-->
        <button class="log-button button is-link" on:click={() => auth.signOut()}
            >Deslogear</button
        >
        <hr />
        <Actividades uid={$user.uid} />
    {:else}
        <!--user empty-->
        <button class="log-button logear" on:click={logear}
            >Logear con Google</button
        >
    {/if}
</section>

<style>
    
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
    @media screen and (min-width:1000px){
        .contenedor-app{
            padding: 10% 18%;
        }       
    }
</style>
