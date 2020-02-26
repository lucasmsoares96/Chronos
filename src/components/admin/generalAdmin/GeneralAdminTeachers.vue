<template>
    <div id="general-admin-teachers">
        <h2>
            Professores
        </h2>
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome: " label-for="user-name">
                        <b-form-input
                            id="user-nome"
                            type="text"
                            v-model="user.name"
                            required
                            placeholder="Informe o nome do professor..."
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail: " label-for="user-email">
                        <b-form-input
                            id="user-email"
                            type="text"
                            v-model="user.email"
                            required
                            placeholder="Informe o E-mail do professor..."
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Senha: " label-for="user-password">
                        <b-form-input
                            id="user-password"
                            type="password"
                            v-model="user.password"
                            required
                            placeholder="Informe a senha do professor..."
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group
                        label="Confirme a Senha: "
                        label-for="user-confirm-password"
                    >
                        <b-form-input
                            id="user-confirm-password"
                            type="password"
                            v-model="user.confirmPassword"
                            required
                            placeholder="Confirme a senha do professor..."
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-checkbox
                        id="user-general-admin"
                        v-model="user.genAdmin"
                        class="mt-3 mb-3"
                    >
                        Administrador Geral?
                    </b-form-checkbox>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-checkbox
                        id="user-resources-admin"
                        v-model="user.recAdmin"
                        class="mt-3 mb-3"
                    >
                        Administrador de Recursos?
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save"
                >Salvar</b-button
            >
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
                >Excluir</b-button
            >
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr />
        <div id="table">
            <b-table striped :items="getTeachers" :fields="fields"></b-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
    name: "GeneralAdminTeachers",
    data() {
        return {
            mode: "save",
            user: {},
            fields: [
                { key: "nome", label: "Nome", sortable: true },
                { key: "email", label: "E-mail", sortable: true },
                {
                    key: "administrador geral",
                    label: "Administrador Geral",
                    sortable: true
                },
                {
                    key: "administrador de reservas",
                    label: "Administrador de Reservas",
                    sortable: true
                },
                {
                    key: "numero de reservas",
                    label: "Número de Reservas",
                    sortable: true
                },
                { key: "action", label: "Ações" }
            ]
        };
    },
    methods: {
        getTeachers() {
            return axios
                .get("http://localhost:3000/getTeacher")
                .then(res => res.data);
        },
        reset() {
            this.mode = "save";
            this.user = {};
        },
        save() {
            const method = this.user.id ? "put" : "post";
            const id = this.user.id ? `/${this.user.id}` : "";
            axios[method](`${baseApiUrl}/users${id}`,this.user).then(() => {
                this.$toasted.global.defaultSucess()
                this.reset()
            }).catch(showError)
        },
        remove(){
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`).then(() => {
                this.$toasted.global.defaultSucess()
                this.reset()
            }).catch(showError)
        }
    }
};
</script>

<style>
</style>