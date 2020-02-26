<template>
    <div class="general-admin-resources">
        <h1>
            Recursos
        </h1>
        <div id="table">
            <b-table striped :fields="fields" :items="getResources">
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
    name: "GeneralAdminResources",
    data() {
        return {
            fields: [
                {key: "tipo", label: "Tipo", sortable:true},
                {key: "Salas", label: "Salas", sortable:true},
                {key: "actions", label: "Ações"},
            ]
        };
    },
    methods: {
        getResources() {
            return axios
                .get("http://localhost:3000/getResources")
                .then(res => res.data);
        }
    }
};
</script>

<style>
</style>