<template>
    <div id="general-admin-resources">
        <h2>Recursos</h2>
        <b-form>
            <b-form-group label="Recurso: " label-for="resource">
                <b-form-input
                    id="resource"
                    type="text"
                    v-model="resource.Salas"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o recurso..."
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Tipo de Recurso:" label-for="type">
                <b-form-select
                    v-if="mode === 'save'"
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
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr />
        <div id="table">
            <b-table striped :fields="fields" :items="items">
                <template v-slot:cell(actions)="data">
                    <b-button variant="warning" @click="loadResource(data.item)" class="btn2 mr-2">
                        <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    </b-button>
                    <b-button
                        variant="danger"
                        class="btn2"
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
                    key: "tipo",
                    label: "Tipo",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "Salas",
                    label: "Salas",
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
            resource: {},
            mode: "save",
            types: [],
            items: [],
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
                console.log(this.types);
            });
        },
        getResources() {
            axios
                .get("http://localhost:3000/getResources")
                .then(res => this.items=res.data);
        },
        reset() {
            this.mode = "save";
            this.resource = {};
        },
        save() {
            console.log(this.resource)
            const method = this.resource.id ? "put" : "post";
            const id = this.resource.id ? `/${this.resource.id}` : "";
            axios[method](`${baseApiUrl}/resource${id}`, this.resource)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        remove() {
            const id = this.resource.id;
            axios
                .delete(`${baseApiUrl}/resource${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset;
                })
                .catch(showError);
        },
        loadResource(resource, mode = "save") {

            this.mode = mode;
            this.resource = {...resource};
            console.log(this.resource);
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