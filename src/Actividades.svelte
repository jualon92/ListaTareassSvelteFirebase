<script>
    import ItemActividad from "./ItemActividad.svelte";
    import { db } from "./firebase.js";
    import { collectionData } from "rxfire/firestore";
    import {
        getFirestore,
        collection,
        query,
        where,
        getDocs,
        orderBy,
        setDoc,
        addDoc,
        doc,
        updateDoc
    } from "firebase/firestore";
    import { startWith } from "rxjs/operators";

    export let uid;

    let text = "";
    const actividadesRef = collection(db, "actividades")
    //const query = db.collection("actividades").where("uid", "==", uid).orderBy("created")
    const q = query(
        actividadesRef,
        where("uid", "==", uid),
        orderBy("created")
    );

    const actividades = collectionData(q, "id").pipe(startWith([])); // converts into observable

    async function add() {
        await addDoc(actividadesRef, {
            uid,
            text,
            complete: false,
            created: Date.now(),
        });

        text = "";
    }

    function updateStatus(event) {
        console.log(event);
        const { id, newStatus } = event.detail;
        console.log(id);
        console.log(newStatus);

      
        updateDoc(actividadesRef,{ complete: newStatus } ).then( () => {
            console.log("data updated")
        }).catch(console.log)

        /*  
        db.collection("todos").doc(id).update({ complete: newStatus });

        collection(firestore, "todos", id, "links") */
    }

    const removeItem = (event) => {
        const { id } = event.detail;
        db.collection("todos").doc(id).delete(id);
    };
</script>

<ul>
    {#each $actividades as actividad}
        <!-- $actividades wrapped, actividad obj-->
        <ItemActividad
            {...actividad}
            on:remove={removeItem}
            on:toggle={updateStatus}
        />
        <!--template ImteActividad,  spread actividad-->
    {/each}
</ul>

<input bind:value={text} />
<hr />
<p>Tu tarea es <strong>{text}</strong></p>
<button on:click={add}>Agregar actividad</button>


<style>
    ul{
        display:flex;
        flex-direction: column;
        padding:2rem 1rem;
    }
</style>