<template>
    <div id="schedule">
        <h1>Quadro de horarios</h1>
        <b-table @click="acao" bordered :fields="fields" :items="items"></b-table>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Schedule',
    data(){
        return{
            items: [],
            fields: [],
        }
    },
    methods: {
        loadSchedules() {
            axios.get("http://localhost:3003/schedule")
            .then(res => {
                this.items = res.data;
                this.fields = Object.keys(this.items[0]).filter((obj) => {return (obj == "idhorario") ? false : true})
            })
        },
        acao(){
            console.log("deu certo")
        }
    },
    mounted() {
        this.loadSchedules();
    }
    
}
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