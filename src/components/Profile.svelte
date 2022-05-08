<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<div class="profile ">
    <h3>Hola 👋,  {displayName}  </h3>
    <!--template-->
    <img src={photoURL} alt="user avatar" width="100" />
       <p>your user id is {uid}</p>
   
</div>

<style>
    .profile {
        display: flex;
        flex-direction: column;
        gap:10px;
    }
</style>
