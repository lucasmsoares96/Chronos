<template>
    <div id="general-admin-teachers">
        <h2>Professores</h2>
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col sm="12">
                    <b-form-group label="Nome: " label-for="user-name">
                        <b-form-input
                            id="user-nome"
                            type="text"
                            v-model="user.name"
                            required
                            placeholder="Informe o nome do professor..."
                            :readonly="mode === 'remove'"
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
                            :readonly="mode === 'remove'"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <!-- <b-row v-show="mode === 'save'">
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
          <b-form-group label="Confirme a Senha: " label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirme a senha do professor..."
            ></b-form-input>
          </b-form-group>
        </b-col>
            </b-row>-->
            <!-- <b-row v-show="mode === 'save'"> -->
            <!-- <b-col md="6" sm="12"> -->
            <b-form-checkbox
                v-show="mode === 'save'"
                id="user-general-admin"
                v-model="user.genAdmin"
                class="mt-3 mb-3"
            >Administrador Geral?</b-form-checkbox>
            <!-- </b-col> -->
            <!-- <b-col md="6" sm="12"> -->
            <b-form-checkbox
                v-show="mode === 'save'"
                id="user-resources-admin"
                v-model="user.recAdmin"
                class="mt-3 mb-3"
            >Administrador de Recursos?</b-form-checkbox>
            <!-- </b-col> -->
            <!-- </b-row> -->
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr />
        <div id="table">
            <b-table striped :items="items" :fields="fields">
                <template v-slot:cell(actions)="data">
                    <b-button variant="warning" @click="loadUser(data.item)" class="btn2 mr-2">
                        <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    </b-button>
                    <b-button variant="danger" class="btn2" @click="loadUser(data.item, 'remove')">
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
                    key: "name",
                    label: "Nome",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "email",
                    label: "E-mail",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "genAdmin",
                    label: "Administrador Geral",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "recAdmin",
                    label: "Administrador de Reservas",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "numero de reservas",
                    label: "Número de Reservas",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "actions",
                    label: "Ações",
                    tdClass: "text-right",
                    thClass: "text-center"
                }
            ],
            items: [],
        };
    },
    methods: {
        getTeachers() {
            axios
                .get("http://localhost:3000/getTeacher")
                .then(res => this.items = res.data);
        },
        reset() {
            this.mode = "save";
            this.user = {};
            // this.loadUsers();
        },
        save() {
            const method = this.user.id ? "put" : "post";
            const id = this.user.id ? `/${this.user.id}` : "";
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                    this.getTeachers()
                })
                .catch(showError);
        },
        remove() {
            const id = this.user.id;
            axios
                .delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                    this.getTeachers()
                })
                .catch(showError);
        },
        loadUser(user, mode = "save") {
            this.mode = mode;
            this.user = { ...user };
            // console.log(this.user);
        }
    },
    mounted(){
        this.getTeachers()
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