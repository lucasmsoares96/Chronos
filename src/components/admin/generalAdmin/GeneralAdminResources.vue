<template>
    <div class="general-admin-resources">
        <h1>
            Recursos
        </h1>
        <div id="table">
            <b-table striped :items="getResources"></b-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "GeneralAdminResources",
    data() {
        return {};
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