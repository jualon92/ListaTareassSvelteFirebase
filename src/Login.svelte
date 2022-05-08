<script>
    import Profile from "./Profile.svelte"
   // import ListaHacer from "./Todos.svelte"
    import { app, auth, googleProvider } from "./firebase.js" 
    import { signInWithRedirect } from "firebase/auth"
    import { authState } from "rxfire/auth"
    import Actividades from "./Actividades.svelte"

    let user  = authState(auth) 
    console.log(user)
   // const unsubscribe = authState(auth).subscribe(u => user = u)
     

    const logear = () => {
        signInWithRedirect(auth, googleProvider)
    }
   

</script>

<section class="contenedor-app">
    {#if $user}  
        <Profile {...$user}/>  <!-- unwrap obj observable directo en template-->
        <button class="log-button" on:click={ () => auth.signOut()}>Deslogear</button>
        <hr>
       <Actividades uid={$user.uid}/>  
    {:else} <!--user empty-->
        <button  class="log-button"  on:click={logear}>Logear con Google</button>
    {/if}
</section>

<style>

 
 .log-button{
    margin-top: 10px;
}
    .contenedor-app{
        display: flex;
    flex-direction: column;
    padding: 10% 8%; 
    gap:10px;
    
    }
</style>