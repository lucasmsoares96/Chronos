<template>
    <div id="schedule">
        <h1>Quadro de horarios</h1>
        <b-table bordered :items="items" :fields="fields"></b-table>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Schedule",
    data() {
        return {
            items: [],
            fields: []
        };
    },
    methods: {
        loadSchedules() {
            axios.get("http://localhost:3000/dataRecursosZZ").then(res => {
                this.items = res.data;
                this.items.forEach((e, index1) => {
                    this.items[index1]["_cellVariants"] = {};
                    Object.values(e).forEach((el, index2) => {
                        if (
                            el == 2 &&
                            Object.keys(this.items[index1])[index2] != "idhorario"
                        ) {
                            let col = String(
                                Object.keys(this.items[index1])[index2]
                            );
                            this.items[index1]["_cellVariants"][col] = "danger";
                        } else if (
                            el == 1 &&
                            Object.keys(this.items[index1])[index2] != "idhorario"
                        ) {
                            let col = String(
                                Object.keys(this.items[index1])[index2]
                            );
                            this.items[index1]["_cellVariants"][col] = "warning";
                        } else if (
                            el == 0 &&
                            Object.keys(this.items[index1])[index2] != "idhorario"
                        ) {
                            let col = String(
                                Object.keys(this.items[index1])[index2]
                            );
                            this.items[index1]["_cellVariants"][col] = "info";
                        }
                    });
                });
                this.fields = Object.keys(this.items[0]).filter(obj => {
                    return obj == "idhorario" || obj == "_cellVariants"
                        ? false
                        : true;
                });
            });
        }
        // acao() {
        //     console.log("deu certo");
        // }
    },
    mounted() {
        this.loadSchedules();
    }
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