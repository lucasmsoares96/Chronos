<template>
    <div id="schedule">
        <h1>Quadro de horarios</h1>
        <b-table class="schedule" bordered :items="items" :fields="fields">
        </b-table>
    </div>
</template>

<script>
export default {
    name: "Schedule",
    computed: {
        fields(){
            return this.$store.state.fields
        },
        items (){
            return this.$store.state.items
        }
    },
};
</script>

<style>
#schedule {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}

td:hover {
    background-color: #c1c1c1;
}
</style>