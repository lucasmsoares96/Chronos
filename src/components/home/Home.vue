<template>
    <section>
        <div id="grade">
            <h2>Informe os dados da reserva</h2>
            <DataRec />
            <Auth />
        </div>
    </section>
</template>

<script>
import DataRec from "./DateRec";
import Auth from './Auth.vue'

export default {
    name: "Home",
    components: {
        DataRec, Auth,
    }
};
</script>

<style>
/* *{
    border: solid 1px;
    margin: 5px;
    padding: 2px;
} */

section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#grade {
    width: 70%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    margin: 20px;
}
</style>