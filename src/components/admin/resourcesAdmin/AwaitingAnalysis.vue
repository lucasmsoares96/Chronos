<template>
    <div>
        <h2>Aguardando Análise</h2>
        <div id="table">
            <b-table striped :fields="fields" :items="items">
                <template v-slot:cell(actions)="data">
                    <b-button
                        variant="success"
                        v-b-tooltip.hover
                        title="Aprovar Pedido?"
                        @click="approveItem(data.item)"
                        class="btn2 mr-2"
                    >
                        <font-awesome-icon icon="check"></font-awesome-icon>
                    </b-button>
                    <b-button
                        variant="danger"
                        v-b-tooltip.hover
                        title="Negar Pedido?"
                        class="btn2 mr-2"
                        @click="denyItem(data.item, 'remove')"
                    >
                        <font-awesome-icon icon="times"></font-awesome-icon>
                    </b-button>
                </template>

                <template v-slot:cell(show_details)="row">
                    <b-button size="sm" @click="row.toggleDetails" class="btn2 mr-2">
                        <font-awesome-icon icon="angle-down"></font-awesome-icon>
                    </b-button>
                </template>
                <template v-slot:row-details="row">
                    <b-card style="width: 1000px">
                        <p>{{ row.item.motivo }}</p>
                    </b-card>
                </template>
                <template
                    v-slot:cell(data)="data"
                >{{ data.value.slice(0, 10).split("-").reverse().join(" / ") }}</template>
            </b-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
    name: "AwaitingAnalysis",
    data() {
        return {
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
                    key: "data",
                    label: "Data",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "horario",
                    label: "Horário",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "nome",
                    label: "Tipo",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "numero",
                    label: "Recurso",
                    sortable: true,
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "show_details",
                    label: "Motivo",
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    key: "actions",
                    label: "Ação",
                    thClass: "text-center",
                    tdClass: "text-right"
                }
            ],
            items: [],
            boxOne: ""
        };
    },
    methods: {
        getItems() {
            axios
                .post("http://localhost:3000/selectProfessorHorario", {
                    payload: this.$store.state.user
                })
                .then(res => (this.items = res.data));
        },
        approveItem(item) {
            this.boxOne = "";
            this.$bvModal
                .msgBoxConfirm("Deseja aprovar o reserva?")
                .then(value => {
                    this.boxOne = value;
                    if (this.boxOne == true) {
                        axios
                            .post(
                                `${baseApiUrl}/updateAprovadoProfessorHorario`,
                                {
                                    item: item,
                                    payload: this.$store.state.user
                                }
                            )
                            .then(() => {
                                this.$toasted.global.defaultSuccess();
                                this.getItems();
                                // console.log(item);
                            })
                            .catch(showError);
                    }
                });
        },
        denyItem(item) {
            this.boxOne = "";
            this.$bvModal
                .msgBoxConfirm("Deseja negar a pedido?")
                .then(value => {
                    this.boxOne = value;
                    if (this.boxOne == true) {
                        axios
                            .post(
                                `${baseApiUrl}/updateRecusadoProfessorHorario`,
                                {
                                    item: item,
                                    payload: this.$store.state.user
                                }
                            )
                            .then(() => {
                                this.$toasted.global.defaultSuccess();
                                this.getItems();
                            });
                        // console.log(item);
                    }
                });
        }
    },
    mounted() {
        this.getItems();
    }
};
</script>

<style>
</style>