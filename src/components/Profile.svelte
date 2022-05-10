<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

     
 

<div class="profile ">
    <h1  > Hola 👋,  {displayName}  </h1>
    <!--template-->
    <img src={photoURL} alt="user avatar" width="100" />
       <p class="text-secondary">Tu user id es :  {uid}</p>
   
</div>

 

<style>
    .profile {
        display: flex;
        flex-direction: column;
        gap:10px;
    }
    .toast{
        width: 180px;
        align-self: flex-end;
    }
</style>
