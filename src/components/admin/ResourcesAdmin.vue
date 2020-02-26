<template>
    <div class="admin-page-tabs">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Reservas aguardando análise">
                    <div id="table">
                        <b-table
                            striped
                            :fields="fields"
                            :items="getItems"
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
    name: "ResourcesAdmin",
    data() {
        return {
            fields: [
                { key: "nomeP", label: "Nome", sortable: true },
                { key: "email", label: "E-mail", sortable: true },
                { key: "data", label: "Data", sortable: true },
                { key: "horario", label: "Horário", sortable: true },
                { key: "nome", label: "Tipo", sortable: true },
                { key: "numero", label: "Recurso", sortable: true },
                { key: "action", label: "Ação" }
            ]
        };
    },
    methods: {
        getItems() {
            return axios
                .get("http://localhost:3000/analysis")
                .then(res => res.data);
        }
    }
};
</script>

<style>
</style>