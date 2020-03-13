<template>
    <div id="general-admin-type-resources">
        <h2>Tipos de Recursos</h2>
        <b-form>
            <b-form-group label="Tipo de Recurso: " label-for="rec-type">
                <b-form-input
                    id="rec-type"
                    type="text"
                    v-model="recType.nome"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o tipo de recurso..."
                ></b-form-input>
            </b-form-group>
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
                    <b-button variant="warning" @click="loadRecType(data.item)" class="btn2 mr-2">
                        <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    </b-button>
                    <b-button
                        variant="danger"
                        class="btn2"
                        @click="loadRecType(data.item, 'remove')"
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
    name: "GeneralAdminTypeResources",
    data() {
        return {
            fields: [
                {
                    key: "nome",
                    label: "Tipo de Recurso",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "idTipoDeRecursos",
                    label: "Id",
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
            recType: {},
            mode: "save",
            items: [],
        };
    },
    methods: {
        getTypeResources() {
            axios
                .get("http://localhost:3000/tipoderecursos")
                .then(res => this.items=res.data);
        },
        reset() {
            this.mode = "save";
            this.recType = {};
        },
        save() {
            console.log("teste")
            const method = this.recType.id ? "put" : "post";
            const id = this.recType.id ? `/${this.recType.id}` : "";
            axios[method](`${baseApiUrl}/insertTipoDeRecursos${id}`,{
                recType: this.recType,
                payload : this.$store.state.user
            })
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        remove() {
            const id = this.recType.id;
            axios
                .delete(`${baseApiUrl}/recType${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset;
                })
                .catch(showError);
        },
        loadRecType(recType, mode = "save") {
            this.mode = mode;
            this.recType = { ...recType };
            console.log(this.recType);
        }
    }
};
</script>

<style>
@media screen and (max-width: 600px) {
    #general-admin-type-resources {
        padding: 5px;
    }
}
@media screen and (min-width: 600px) {
    #general-admin-type-resources {
        padding: 20px;
    }
}
</style>