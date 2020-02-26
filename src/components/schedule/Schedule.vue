<template>
    <div id="schedule">
        <h1>Quadro de horarios</h1>
        <div id="table">
            <b-table
                @click.native="clickOnCell"
                bordered
                :items="items"
                :fields="fields"
            >
                <template v-slot:cell()=""> </template>
                <template v-slot:cell(numero)="data">
                    {{ data.value }}
                </template>
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
                    >
                    </b-form-textarea>
                </div>
                <template v-slot:modal-footer="{ cancel }">
                    <b-button variant="primary" @click="sendData">
                        OK
                    </b-button>
                    <b-button @click="cancel()">
                        Cancelar
                    </b-button>
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
            horario: ""
        };
    },
    methods: {
        clickOnCell(e) {
            // console.log([e.srcElement.parentNode.rowIndex]);
            // console.log([e.srcElement.cellIndex]);
            // console.log(e.target.className)
            (this.text = ""), console.log(e);
            const table = document.getElementsByTagName("table")[0];
            let row =
                table.rows[e.srcElement.parentNode.rowIndex].cells[0].innerHTML;
            let column = table.rows[0].cells[e.srcElement.cellIndex].innerHTML;
            console.log("linha  " + row);
            console.log("coluna " + column);
            this.recurso = row;
            this.horario = column;

            // if (e.target.className == )
            this.$bvModal.show("modal1");
        },
        sendData() {
            axios
                .post("http://localhost:3000/professorhorario", {
                    data: this.data,
                    recurso: this.recurso,
                    horario: this.horario,
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