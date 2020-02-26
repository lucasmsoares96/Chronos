<template>
    <div class="teacher-page-tabs">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Suas Reservas">
                    <div id="table">
                        <b-table
                            hover
                            striped
                            :fields="fields"
                            :items="items"
                            :sort-by.sync="sortBy"
                        ></b-table>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "TeacherPage",
    data() {
        return {
            sortBy: "status",
            fields: [
                { key: "status", label: "Situação", sortable: true },
                { key: "nome", label: "Tipo", sortable: true },
                { key: "numero", label: "Recurso", sortable: true },
                { key: "data", label: "Data", sortable: true },
                { key: "horario", label: "Horário", sortable: true },
                { key: "actions", label: "Ações" }
            ],
            items: []
        };
    },
    methods: {
        getItems() {
            axios
                .get("http://localhost:3000/selectProfessorHorario")
                .then(res => {
                    this.items = res.data;
                    this.items.forEach(e => {
                        if (e.status == 0) {
                            e._cellVariants = { status: "warning" };
                            e.status = "Em espera";
                        } else if (e.status == 1) {
                            e._cellVariants = { status: "info" };
                            e.status = "Aprovado";
                        } else if (e.status == 2) {
                            e._cellVariants = { status: "danger" };
                            e.status = "Recusado";
                        }
                    });
                });
        }
    },
    mounted() {
        this.getItems();
    }
};
</script>

<style>
</style>