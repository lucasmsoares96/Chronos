<template>
    <section>
        <h1 id="titulo">
            <a href>Assistente de Reserva de Recursos</a>
        </h1>
        <div id="grade" class="border-bottom-1">
            <b-form class="formulario">
                <p>Selecione a data desejada</p>
                <input
                    id="calendar"
                    type="date"
                    name="calendario"
                    autofocus
                    v-model="formData"
                />
                <br />
                Selected:
                <strong>{{ formData }}</strong>
                <br />
                <br />
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
                <div>
                    Selected:
                    <strong>{{ selected }}</strong>
                </div>
                <b-button variant="primary" v-on:click="sendDateRec"
                    >enviar</b-button
                >
            </b-form>
            <b-form class="formulario">
                <p>Ou conecte-se</p>
                <b-form-group label="E-mail:" label-for="user-email">
                    <b-form-input
                        id="user-email"
                        type="text"
                        placeholder="Informe seu email"
                    />
                </b-form-group>
                <b-form-group label="Senha:" label-for="user-password">
                    <b-form-input
                        id="user-password"
                        type="password"
                        placeholder="Informe sua senha"
                    />
                </b-form-group>
                <b-button variant="primary" v-on:click="sendUserData"
                    >enviar</b-button
                >
            </b-form>
        </div>
    </section>
    <!-- Conteúdo principal -->
</template>

<script>
import axios from "axios";

let date = new Date();

export default {
    name: "Home",
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
        sendUserData() {
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
                    this.$router.push("/teacher");
                });
        }
    },
    mounted() {
        this.reqTable();
    }
};
</script>

<style>
/* *{
    padding: 2px;
    margin: 2px;
    border: 2px solid;
} */

section {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}

@media screen and (max-width: 600px) {
    .formulario {
        flex-grow: 1;
        padding: 0;
    }
    #grade {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
    }
}
@media screen and (min-width: 600px) {
    .formulario {
        flex-grow: 1;
        padding: 20px 60px;
    }
    #grade {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
}

button {
    width: 25%;
    float: right;
}
</style>