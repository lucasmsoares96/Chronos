<template>
    <b-form class="formulario">
        <b-form-group label="1) Selecione data desejada">
            <input
                id="calendar"
                type="date"
                name="calendario"
                autofocus
                v-model="formData"
            />
        </b-form-group>
        <br />
        Selected:
        <strong>{{ formData }}</strong>
        <br />
        <br />
        <b-form-group label="2) Selecione o recurso desejado">
            <b-form-radio-group
                v-model="selected"
                :options="options"
                class="mb-3"
                value-field="idTipoDeRecursos"
                text-field="nome"
                disabled-field="notEnabled"
                stacked
            ></b-form-radio-group>
        </b-form-group>
        <div>
            Selected:
            <strong>{{ selected }}</strong>
        </div>
        <b-button variant="primary" v-on:click="sendDateRec">enviar</b-button>
    </b-form>
</template>

<script>
import axios from "axios";

let date = new Date();

export default {
    name: 'DateRec',
    data() {
        return {
            formData: date.toISOString().slice(0, 10),
            selected: "",
            options: []
        };
    },
    methods: {
        reqTable() {
            axios.get("http://localhost:3000/tipoderecursos").then(res => {
                this.options = res.data;
                console.log(this.options);
            });
        },
        sendDateRec() {
            let data = this.formData;
            let tipoRecurso = this.selected;
            let obj = [data, tipoRecurso];
            axios
                .post("http://localhost:3000/data", {
                    data
                })
                .then(() => {
                    console.log(obj);
                    this.$store.commit("setObj", obj);
                    this.$router.push("/schedule");
                });
        },
    },
    mounted() {
        this.reqTable();
    }
};
</script>

<style>
</style>