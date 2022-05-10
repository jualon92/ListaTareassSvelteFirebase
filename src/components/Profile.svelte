<script>
    export let displayName;
    export let photoURL;
    export let uid;

    const fotoInvitadoURL = "https://google.exceedlms.com/assets/student/google/default_avatar-5298a7fcd9a9a0ce0d2b32e9aa826a32cc521cb5249540190792626b75504b39.png"  
</script>

     
 

<div class="profile ">
    <h1  > Hola 👋,  {displayName || "Invitado"}  </h1>
    <!--template-->
    <img src={photoURL ||  fotoInvitadoURL } alt="user avatar" width="100" />
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
