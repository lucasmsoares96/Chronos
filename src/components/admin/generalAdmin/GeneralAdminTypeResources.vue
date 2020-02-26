<template>
    <div class="general-admin-type-resources">
        <h1>
            Tipos de Recursos
        </h1>
        <div id="table">
            <b-table
                striped
                :items="getTypeResources"
                :fields="fields"
            ></b-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "GeneralAdminTypeResources",
    data() {
        return {
            fields: [
                { key: "nome", label: "Tipo de Recurso", sortable: true },
                { key: "idTipoDeRecursos", label: "Id", sortable: true },
                { key: "actions", label: "Ações" }
            ]
        };
    },
    methods: {
        getTypeResources() {
            return axios
                .get("http://localhost:3000/tipoderecursos")
                .then(res => res.data);
        }
    }
};
</script>

<style>
</style>