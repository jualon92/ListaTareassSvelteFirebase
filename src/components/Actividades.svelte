<script>
    import ItemActividad from "./ItemActividad.svelte";
    import { db } from "../firebase.js";
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
        updateDoc,
        deleteDoc,
    } from "firebase/firestore";
    import { startWith } from "rxjs/operators";
    import { subscribe } from "svelte/internal";

    export let uid;

    let text = "";
    const actividadesRef = collection(db, "actividades");
    //const query = db.collection("actividades").where("uid", "==", uid).orderBy("created")

    const q = query(
        actividadesRef,
        where("uid", "==", uid),
        orderBy("created")
    );

    const actividades = collectionData(q, { idField: "id" }).pipe(
        startWith([])
    ); // converts into observable

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
        //    console.log(event);
        const { id, newStatus } = event.detail;
        //    console.log(id)
        console.log(id);
        console.log(newStatus);

        const dbRef = doc(db, "actividades", id);
        updateDoc(dbRef, { complete: newStatus });

        /*  
        db.collection("todos").doc(id).update({ complete: newStatus });

        collection(firestore, "todos", id, "links") */
    }

    const removeItem = async (event) => {
        // console.log(event);
        //  const { id } = event.target.id;
        //   console.log(id)
        const { id } = event.detail;
        //db.collection("todos").doc(id).delete(id);
        const docRef = doc(db, "actividades", id);
        await deleteDoc(docRef);
    };
</script>

<div class="contenedor-actividades">
    <ul>
        {#each $actividades as acti}
            <!-- $actividades wrapped, actividad obj-->
            <ItemActividad
                {...acti}
                on:remove={removeItem}
                on:toggle={updateStatus}
            />
            <!--template ImteActividad,  spread actividad-->
        {/each}
    </ul>

    <input class="is-button" bind:value={text} />
    <hr />
    <p class="tarea">Tu tarea es <strong>{text}</strong></p>
    <button class="button is-fullwidth is-large is-link " on:click={add}>Agregar actividad</button>
</div>

<style>
    .tarea {
        word-wrap: break-word;
    }
    .contenedor-actividades {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap:5px;
    }
</style>
