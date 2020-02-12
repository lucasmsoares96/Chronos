<template>
    <section>
        <h1 id="titulo">
            <a href>Assistente de Reserva de Recursos</a>
        </h1>
        <div id="grade" class="border-bottom-1">
            <b-form class="formulario">
                <p>Selecione a data desejada</p>
                <input id="calendar" type="date" name="calendario" autofocus v-model="formData"/>
                    <br>
                    Selected:
                    <strong>{{ formData }}</strong>
                <br />
                <br />
                <b-form-group label="Selecione o recurso desejado">
                    <b-form-radio-group
                        v-model="selected"
                        :options="options"
                        class="mb-3"
                        value-field="item"
                        text-field="name"
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
            </b-form>
        </div>
    </section>
    <!-- Conteúdo principal -->
</template>

<script>
import axios from "axios";

let date = new Date();

export default {
    name: "Section",
    data() {
        return {
            formData: date.toISOString().slice(0, 10),
            selected: "",
            options: [],
        };
    },
    methods: {
        reqTable() {
            axios
                .get("http://localhost:3003/data")
                .then(res => {
                    this.options = res.data;
                });
        },
        sendDateRec() {
            axios
                .get("http://localhost:3003/data", {
                    params: {
                        data: this.formData,
                        recurso: this.selected,
                    }
                })
                .then(res => {
                    this.options = res.data;
                });
        },

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
#grade {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}
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
button {
    width: 25%;
    float: right;
}
</style>