<template>
    <div class="general-admin-type-resources">
        <h1>
            Tipos de Recursos
        </h1>
        <div id="table">
            <b-table striped :items="getTypeResources" :fields="fields">
                <template v-slot:cell(actions)="data">
                    <b-button
                        variant="warning"
                        @click="loadUser(data.item)"
                        class="btn2 mr-2"
                    >
                        <font-awesome-icon
                            icon="pencil-alt"
                        ></font-awesome-icon>
                    </b-button>
                    <b-button
                        variant="danger"
                        class="btn2"
                        @click="loadUser(data.item, 'remove')"
                    >
                        <font-awesome-icon icon="trash"></font-awesome-icon>
                    </b-button>
                </template>
            </b-table>
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