<template>
    <div id="general-admin-resources">
        <h2>Recursos</h2>
        <b-form>
            <b-form-group label="Recurso: " label-for="resource">
                <b-form-input
                    id="resource"
                    type="text"
                    v-model="resource.numero"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o recurso..."
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Capacidade: " label-for="capacidade">
                <b-form-input
                    id="capacidade"
                    type="text"
                    v-model="resource.capacidade"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a Capacidade..."
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Informacao: " label-for="informacao">
                <b-form-input
                    id="informacao"
                    type="text"
                    v-model="resource.informacao"
                    :readonly="mode === 'remove'"
                    placeholder="Se houver alguma informação adicional..."
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Tipo de Recurso:" label-for="type">
                <b-form-select
                    v-if="mode === 'save' || 'edit'"
                    id="type"
                    :options="types"
                    v-model="resource.idTipoDeRecursos"
                />
                <b-form-input
                    v-else
                    id="type"
                    type="text"
                    v-model="resource.idTipoDeRecursos"
                    readonly
                />
            </b-form-group>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Adicionar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                    <b-button variant="warning" v-if="mode === 'edit'" @click="save">Editar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr />
        <div id="table">
            <b-table striped :fields="fields" :items="items">
                <template v-slot:cell(actions)="data">
                    <b-button variant="warning" @click="loadResource(data.item, 'edit')" class="btn2 mr-2">
                        <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    </b-button>
                    <b-button
                        variant="danger"
                        class="btn2 mr-2"
                        @click="loadResource(data.item, 'remove')"
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
    name: "GeneralAdminResources",
    data() {
        return {
            fields: [
                {
                    key: "nome",
                    label: "Tipo",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "numero",
                    label: "Salas",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "capacidade",
                    label: "Capacidade",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "informacao",
                    label: "Informações",
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
            resource: {},
            mode: "save",
            types: [],
            items: []
        };
    },
    methods: {
        loadTypes() {
            const url = `${baseApiUrl}/tipoderecursos`;
            axios.get(url).then(res => {
                // this.categories = res.data
                this.types = res.data.map(types => {
                    return {
                        // ...types,
                        value: types.idTipoDeRecursos,
                        text: types.nome
                    };
                });
                // console.log(this.types);
            });
        },
        getResources() {
            axios
                .get("http://localhost:3000/selectTabelaRecursos")
                .then(res => (this.items = res.data));
        },
        reset() {
            this.mode = "save";
            this.resource = {};
        },
        save() {
            // console.log(this.resource)
            const method = this.resource.idRecursos ? "put" : "post";
            axios[method](`${baseApiUrl}/insertRecursos`, {
                recursos: this.resource,
                payload: this.$store.state.user
            })
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                    this.getResources();
                })
                .catch(showError);
        },
        remove() {
            const id = this.resource.idRecursos;
            axios
                .delete(`${baseApiUrl}/deleteRecursos/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset;
                    this.getResources();
                })
                .catch(showError);
        },
        loadResource(resource, mode = "save") {
            this.mode = mode;
            this.resource = { ...resource };
            if (this.mode == "remove") {
                this.$bvModal
                    .msgBoxConfirm("Deseja excluir o recurso?", {
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
        this.loadTypes();
        this.getResources();
    }
};
</script>

<style>
@media screen and (max-width: 600px) {
    #general-admin-resources {
        padding: 5px;
    }
}
@media screen and (min-width: 600px) {
    #general-admin-resources {
        padding: 20px;
    }
}
</style>