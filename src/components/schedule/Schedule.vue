<template>
    <div id="schedule">
        <h1>Quadro de horarios</h1>
        <b-table @click.native="clickOnCell" class="schedule" bordered :items="items" :fields="fields">
            <template v-slot:cell()=""> </template>
            <template v-slot:cell(numero)="data">
                {{ data.value }}
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Schedule",
    methods: {
        clickOnCell(e) {
            console.log([e.srcElement.parentNode.rowIndex]);
            console.log([e.srcElement.cellIndex]);
            console.log(e.target.className)
            e.target.className = "table-warning";
            const table = document.getElementsByTagName("table")[0];
            let row =
                table.rows[e.srcElement.parentNode.rowIndex].cells[0].innerHTML;
            let column = table.rows[0].cells[e.srcElement.cellIndex].innerHTML;
            console.log("linha  " + row);
            console.log("coluna " + column);
            axios.post("http://localhost:3000/professorhorario", {
                data: this.data,
                recurso: row,
                horario: column
            });
        },
    },
    computed: {
        fields() {
            return this.$store.state.fields;
        },
        items() {
            return this.$store.state.items;
        },
        data() {
            return this.$store.state.obj.data;
        }
    },
    mounted() {
        this.$store.commit("resSchedule");
    }
};
</script>

<style>
#schedule {
    overflow: scroll;
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