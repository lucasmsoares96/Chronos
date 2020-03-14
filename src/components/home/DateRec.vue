<template>
    <b-form id="formulario">
        <b-calendar hide-header v-model="value" locale="pt-BR"></b-calendar>
        <br />
        <br />
        <br />
        <div id="form2">
            <b-form-group label="Selecione o recurso desejado">
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
                <b-button class="btn" variant="primary" v-on:click="sendDateRec"
                    >enviar</b-button
                >
        </div>
        <div>
        </div>
    </b-form>
</template>

<script>
import axios from "axios";

export default {
    name: "DateRec",
    data() {
        return {
            selected: "",
            value: "",
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
            let data = this.value;
            let tipoRecurso = this.selected;
            let obj = [data, tipoRecurso];
            axios
                .post("http://localhost:3000/data",{data,tipoRecurso})
                .then(() => {
                    console.log(obj);
                    this.$store.commit("setObj", obj);
                    this.$router.push("/schedule");
                });
        }
    },
    mounted() {
        this.reqTable();
    }
};
</script>

<style>
@media screen and (max-width: 600px) {
    #formulario {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 10px;
    }
}
@media screen and (min-width: 600px) {
    #formulario {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 20px;
    }
}

.btn {
    /* float: right; */
    width: 120px;
    margin-top: 0px 10px;
}

#form2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}
</style>