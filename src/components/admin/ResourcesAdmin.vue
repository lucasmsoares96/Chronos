<template>
    <div class="admin-page-tabs">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Reservas aguardando análise">
                    <div id="table">
                        <b-table striped :fields="fields" :items="getItems">
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
                                    class="btn2"
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
                        </b-table>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
    name: "ResourcesAdmin",
    data() {
        return {
            fields: [
                {
                    key: "nomeP",
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
                    key: "data",
                    label: "Data",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "horario",
                    label: "Horário",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "nome",
                    label: "Tipo",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "numero",
                    label: "Recurso",
                    sortable: true,
                    thClass: "text-center"
                },
                {
                    key: "show_details",
                    label: "Motivo",
                    thClass: "text-center"
                },
                {
                    key: "actions",
                    label: "Ação",
                    thClass: "text-center",
                    tdClass: "text-right"
                }
            ],
            boxOne: '',
        };
    },
    methods: {
        getItems() {
            return axios
                .get("http://localhost:3000/selectProfessorHorarioEspec")
                .then(res => res.data);
        },
        approveItem(item) {
            this.boxOne = "";
            this.$bvModal
                .msgBoxConfirm("Deseja aprovar o reserva?")
                .then(value => {
                    this.boxOne = value;
                    if (this.boxOne == true) {
                        axios.delete(`${baseApiUrl}/updateAprovadoProfessorHorario`,{
                            item : item,
                            payload : this.$store.state.user,
                        })
                        console.log(item);
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
                        axios.delete(`${baseApiUrl}/updateRecusadoProfessorHorario`,{
                            item : item,
                            payload : this.$store.state.user,
                        })
                        console.log(item);
                    }
                });
        }
    }
};
</script>

<style>
.btn2 {
    width: 60px;
}
</style>