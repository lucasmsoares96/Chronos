<template>
    <div id="schedule">
        <b-row cols="12" style="width: 100%" align-h="between">
            <h2>Quadro de horarios</h2>
            <b-button variant="primary" v-b-modal.modal1 class="mb-2">Solicitar Reserva</b-button>
        </b-row>
        <div id="table">
            <b-table @click.native="clickOnCell" bordered :items="items" :fields="fields">
                <template v-slot:cell()="data">
                    <div style="display:none">{{ data.value }}</div>
                </template>
                <template v-slot:cell(numero)="data">{{ data.value }}</template>
            </b-table>
        </div>
        <div>
            <b-modal
                id="modal1"
                title="Fazer uma reserva para esse horário?"
                header-text-variant="light"
            >
                <div>
                    <b-form-textarea
                        id="textarea"
                        v-model="text"
                        placeholder="Digite o seu motivo..."
                        rows="5"
                        max-rows="10"
                        maxlength="255"
                    ></b-form-textarea>
                </div>
                <template v-slot:modal-footer="{ cancel }">
                    <b-button variant="primary" @click="sendData">OK</b-button>
                    <b-button @click="cancel()">Cancelar</b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Schedule",
    data() {
        return {
            text: "",
            recurso: "",
            horario: "",
            vet: []
        };
    },
    methods: {
        clickOnCell(e) {
            // console.log([e.srcElement.parentNode.rowIndex]);
            // console.log([e.srcElement.cellIndex]);
            // this.click += 1;
            // console.log(this.click);
            // console.log(e.target.className);
            if (Object.keys(this.$store.state.user).length) {
                this.text = "";
                console.log(e);
                const table = document.getElementsByTagName("table")[0];
                let row =
                    table.rows[e.srcElement.parentNode.rowIndex].cells[0]
                        .innerHTML;
                let column =
                    table.rows[0].cells[e.srcElement.cellIndex].innerHTML;
                console.log("linha  " + row);
                console.log("coluna " + column);
                this.recurso = row;
                this.horario = column;
                let obj = {};
                obj.recurso = this.recurso;
                obj.horario = this.horario;
                if (
                    e.toElement.children[0].innerHTML == 0 ||
                    e.toElement.children[0].innerHTML == 1
                ) {
                    if (
                        e.target.className == "table-success" ||
                        e.target.className == "table-warning"
                    ) {
                        this.vet.push(obj);
                        e.target.className = "table-primary";
                    } else if (e.toElement.children[0].innerHTML == 0) {
                        for (let cell in this.vet) {
                            // console.log(cell);
                            if (
                                this.vet[cell].recurso == row &&
                                this.vet[cell].horario == column
                            ) {
                                this.vet.splice(cell, 1);
                            }
                        }
                        // console.log(this.vet);
                        e.target.className = "table-success";
                    } else {
                        e.target.className = "table-warning";
                    }
                    // e.target.className = "table-primary";
                    // this.$bvModal.show("modal1");
                } else {
                    this.$bvModal.msgBoxOk("Esse horário não está disponível");
                }
            } else {
                this.$bvModal.msgBoxOk(
                    "É preciso estar logado para solicitar uma reserva"
                );
            }
            console.log(this.vet);
        },
        sendData() {
            axios
                .post("http://localhost:3000/professorhorario", {
                    data: this.data,
                    recurso: this.recurso,
                    horario: this.vet,
                    texto: this.text
                })
                .then(this.$bvModal.hide("modal1"));
        }
    },
    computed: {
        fields() {
            return this.$store.state.fields;
        },
        items() {
            return this.$store.state.items;
        },
        data() {
            return this.$store.state.obj.data;
        }
    },
    mounted() {
        this.$store.commit("resSchedule");
        this.$bvModal.msgBoxOk(
            "selecione um ou mais horarios em seguida click em Solicitar Reserva"
        );
    }
};
</script>

<style>
#schedule {
    overflow: scroll;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}

#schedule td:hover {
    background-color: #c1c1c1;
}
</style>