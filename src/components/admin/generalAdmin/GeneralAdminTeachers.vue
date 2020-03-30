<template>
    <div id="general-admin-teachers">
        <h2>Professores</h2>
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col sm="12">
                    <b-form-group label="Nome: " label-for="user-nomeP">
                        <b-form-input
                            id="user-nome"
                            type="text"
                            v-model="user.nomeP"
                            required
                            placeholder="Informe o nome do professor..."
                            :readonly="mode != 'edit'"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12">
                    <b-form-group label="CPF: " label-for="user-cpf">
                        <b-form-input
                            id="user-cpf"
                            type="text"
                            v-model="user.cpf"
                            required
                            placeholder="Informe o cpf do professor..."
                            :readonly="mode != 'edit'"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12">
                    <b-form-group
                        label="Área do conhecimento: "
                        label-for="user-areaDoConhecimento"
                    >
                        <b-form-input
                            id="user-areaDoConhecimento"
                            type="text"
                            v-model="user.areaDoConhecimento"
                            required
                            placeholder="Informe a Área do conhecimento do professor..."
                            :readonly="mode != 'edit'"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12">
                    <b-form-group label="E-mail: " label-for="user-email">
                        <b-form-input
                            id="user-email"
                            type="text"
                            v-model="user.email"
                            required
                            placeholder="Informe o E-mail do professor..."
                            :readonly="mode != 'edit'"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox
                v-show="mode === 'edit'"
                id="user-general-admin"
                v-model="user.admGeral"
                class="mt-3 mb-3"
            >Administrador Geral?</b-form-checkbox>
            <b-form-checkbox
                v-show="mode === 'edit'"
                id="user-resources-admin"
                v-model="user.admRecursos"
                class="mt-3 mb-3"
            >Administrador de Recursos?</b-form-checkbox>
            <b-row>
                <b-col xs="12">
                    <b-button disabled variant="primary" v-if="mode === 'save'" @click="save">Adicionar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                    <b-button variant="warning" v-if="mode === 'edit'" @click="save">Editar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr />
        <div id="table">
            <b-table striped :items="items" :fields="fields">
                <template v-slot:cell(actions)="data">
                    <b-button variant="warning" @click="loadUser(data.item, 'edit')" class="btn2 mr-2">
                        <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    </b-button>
                    <b-button
                        variant="danger"
                        class="btn2 mr-2"
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
import { baseApiUrl, showError } from "@/global";
export default {
    name: "GeneralAdminTeachers",
    data() {
        return {
            mode: "save",
            user: {},
            fields: [
                {
                    key: "nomeP",
                    label: "Nome",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "email",
                    label: "E-mail",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "cpf",
                    label: "CPF",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "admGeral",
                    label: "Administrador Geral",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center",
                    formatter: value => (value ? "Sim" : "Não")
                },
                {
                    key: "admRecursos",
                    label: "Administrador de Reservas",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center",
                    formatter: value => (value ? "Sim" : "Não")
                },
                {
                    key: "areaDoConhecimento",
                    label: "Area do Conhecimento",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "actions",
                    label: "Ações",
                    tdClass: "text-right",
                    thClass: "text-center"
                }
            ],
            items: []
        };
    },
    methods: {
        getTeachers() {
            axios
                .get("http://localhost:3000/selectTabelaProfessor")
                .then(res => (this.items = res.data));
        },
        reset() {
            this.mode = "save";
            this.user = {};
        },
        save() {
            const method = this.user.idProfessor ? "put" : "post";
            axios[method](`${baseApiUrl}/cadastroDeProfessor`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                    this.getTeachers();
                })
                .catch(showError);
        },
        remove() {
            const id = this.user.idProfessor;
            axios
                .delete(`${baseApiUrl}/deleteProfessor/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                    this.getTeachers();
                })
                .catch(showError);
        },
        loadUser(user, mode = "save") {
            this.mode = mode;
            this.user = { ...user };
            if (this.user.admGeral == 1) {
                this.user.admGeral = true;
            } else {
                this.user.admGeral = false;
            }
            if (this.user.admRecursos == 1) {
                this.user.admRecursos = true;
            } else {
                this.user.admRecursos = false;
            }
            if (this.mode == "remove") {
                this.$bvModal
                    .msgBoxConfirm("Deseja excluir o professor?", {
                        okVariant: "danger"
                    })
                    .then(value => {
                        if (value == true) {
                            this.remove();
                        }
                    });
            }
        }
    },
    mounted() {
        this.getTeachers();
    }
};
</script>

<style>
@media screen and (max-width: 600px) {
    #general-admin-teachers {
        padding: 5px;
    }
}
@media screen and (min-width: 600px) {
    #general-admin-teachers {
        padding: 20px;
    }
}
</style>