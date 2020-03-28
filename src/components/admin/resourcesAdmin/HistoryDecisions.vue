<template>
    <div id="history-decisions">
        <h2>Histórico</h2>
        <div id="table">
            <b-table striped :fields="fields" :items="items">
                <template v-slot:cell(actions)="data">
                    <b-button
                        variant="danger"
                        v-b-tooltip.hover
                        title="Cancelar Decisão?"
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
import { baseApiUrl } from "@/global";

export default {
    name: "HistoryDecisions",
    data() {
        return {
            fields: [
                {
                    key: "status",
                    label: "Decisão",
                    thClass: "text-center",
                    tdClass: "text-center"
                },
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
                .post("http://localhost:3000/historico", {
                    payload: this.$store.state.user
                })
                .then(res => {
                    this.items = res.data;
                    this.items.forEach(e => {
                        if (e.status == 1) {
                            e._cellVariants = { status: "success" };
                            e.status = "Aprovado";
                        } else if (e.status == 2) {
                            e._cellVariants = { status: "danger" };
                            e.status = "Recusado";
                        }
                    });
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
@media screen and (max-width: 600px) {
    #history-decisions {
        padding: 5px;
    }
}
@media screen and (min-width: 600px) {
    #history-decisions {
        padding: 20px;
    }
}
</style>