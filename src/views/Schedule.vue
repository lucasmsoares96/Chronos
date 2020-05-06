<template>
  <section>
    <div id="schedule">
      <b-row style="width: 100%; margin-left: 0px; margin-right: 0px;" align-h="between">
        <h2>Quadro de horarios</h2>
        <h3>{{this.$store.state.obj.date.split("-").reverse().join(" / ")}}</h3>
      </b-row>
      <b-row
        cols="12"
        style="width: 100%; margin-left: 0px; margin-right: 0px;"
        align-h="between"
        class="mb-2"
      >
        <table v-if="checkDate()" class="mt-3">
          <tr>
            <td id="model" class="table-success">livre</td>
            <td id="model" class="table-warning">1 em análise</td>
            <td id="model" class="table-danger">ocupado</td>
          </tr>
        </table>
        <table v-else class="mb-4 mt-3">
          <tr>
            <td id="model" class="table-light">livre</td>
            <td id="model" class="table-secondary">1 em análise</td>
            <td id="model" class="table-dark">ocupado</td>
          </tr>
        </table>
        <b-button
          v-if="checkDate()"
          variant="primary"
          @click="requestReservation"
          class="mb-3 mt-3"
        >Solicitar Reserva</b-button>
      </b-row>
      <div id="table">
        <b-table @click.native="clickOnCell" bordered :items="resSchedule" :fields="fields">
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
  </section>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "Schedule",
  data() {
    return {
      text: "",
      recurso: "",
      horario: "",
      vet: [],
      fields: [
        { key: "numero", label: "Identificação" },
        { key: "07:00-07:50" },
        { key: "07:50-08:40" },
        { key: "08:55-09:45" },
        { key: "09:45-10:35" },
        { key: "10:50-11:40" },
        { key: "11:40-12:30" },
        { key: "12:30-13:50" },
        { key: "13:50-14:40" },
        { key: "14:40-15:30" },
        { key: "15:50-16:40" },
        { key: "16:40-17:30" },
        { key: "17:30-19:00" },
        { key: "19:00-19:50" },
        { key: "19:50-20:40" },
        { key: "20:55-21:45" },
        { key: "21:45-22:35" }
      ],
      items: []
    };
  },
  methods: {
    resSchedule() {
      return axios
        .get(`${baseApiUrl}/dataRecursos`, {
          params: {
            data: this.$store.state.obj.date,
            tipoRecurso: this.$store.state.obj.tipoRecurso
          }
        })
        .then(res => {
          this.items = res.data;
          this.items.forEach((e, index1) => {
            this.items[index1]["_cellVariants"] = {};
            Object.values(e).forEach((el, index2) => {
              let today = new Date();
              let date = new Date(
                this.$store.state.obj.date.split("-").join("/")
              );
              if (date > today) {
                if (
                  el == 2 &&
                  Object.keys(this.items[index1])[index2] != "idhorario"
                ) {
                  let col = String(Object.keys(this.items[index1])[index2]);
                  this.items[index1]["_cellVariants"][col] = "danger";
                } else if (
                  el == 1 &&
                  Object.keys(this.items[index1])[index2] != "idhorario"
                ) {
                  let col = String(Object.keys(this.items[index1])[index2]);
                  this.items[index1]["_cellVariants"][col] = "warning";
                } else if (
                  el == 0 &&
                  Object.keys(this.items[index1])[index2] != "idhorario"
                ) {
                  let col = String(Object.keys(this.items[index1])[index2]);
                  this.items[index1]["_cellVariants"][col] = "success";
                }
              } else {
                if (
                  el == 2 &&
                  Object.keys(this.items[index1])[index2] != "idhorario"
                ) {
                  let col = String(Object.keys(this.items[index1])[index2]);
                  this.items[index1]["_cellVariants"][col] = "dark";
                } else if (
                  el == 1 &&
                  Object.keys(this.items[index1])[index2] != "idhorario"
                ) {
                  let col = String(Object.keys(this.items[index1])[index2]);
                  this.items[index1]["_cellVariants"][col] = "secondary";
                } else if (
                  el == 0 &&
                  Object.keys(this.items[index1])[index2] != "idhorario"
                ) {
                  let col = String(Object.keys(this.items[index1])[index2]);
                  this.items[index1]["_cellVariants"][col] = "light";
                }
              }
            });
          });
          return this.items;
        })
        .catch(showError);
    },
    clickOnCell(e) {
      if (e.toElement.cellIndex != 0 && e.srcElement.parentNode.rowIndex != 0) {
        if (this.checkDate()) {
          const table = document.getElementsByTagName("table")[1];
          let row =
            table.rows[e.srcElement.parentNode.rowIndex].cells[0].innerHTML;
          let column = table.rows[0].cells[e.srcElement.cellIndex].innerHTML;
          this.recurso = row;
          this.horario = column;
          let obj = {};
          obj.recurso = this.recurso;
          obj.horario = this.horario;
          obj.valor = e.toElement.children[0].innerHTML;
          if (Object.keys(this.$store.state.user).length) {
            if (
              this.vet.length == 0 ||
              this.vet[this.vet.length - 1].recurso == this.recurso
            ) {
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
                    if (
                      this.vet[cell].recurso == row &&
                      this.vet[cell].horario == column
                    ) {
                      this.vet.splice(cell, 1);
                    }
                  }
                  e.target.className = "table-success";
                } else {
                  for (let cell in this.vet) {
                    if (
                      this.vet[cell].recurso == row &&
                      this.vet[cell].horario == column
                    ) {
                      this.vet.splice(cell, 1);
                    }
                  }
                  e.target.className = "table-warning";
                }
              } else {
                this.$bvModal.msgBoxOk("Esse horário não está disponível");
              }
            } else {
              this.$bvModal.msgBoxOk(
                "Só é possível selecionar um recurso por vez"
              );
            }
          } else {
            this.$bvModal.msgBoxOk(
              "É preciso estar logado para solicitar uma reserva"
            );
          }
        } else {
          this.$bvModal.msgBoxOk("Não é possível alterar datas passadas");
        }
      }
    },
    checkDate() {
      let today = new Date();
      let date = new Date(this.$store.state.obj.date.split("-").join("/"));
      if (date > today) {
        return true;
      } else return false;
    },
    requestReservation() {
      if (Object.keys(this.$store.state.user).length) {
        this.text = "";
        this.$bvModal.show("modal1");
      } else {
        this.$bvModal.msgBoxOk(
          "É preciso estar logado para solicitar uma reserva"
        );
      }
    },
    sendData() {
      axios
        .post(`${baseApiUrl}/insertProfessorHorario`, {
          data: this.$store.state.date,
          horario: this.vet,
          texto: this.text
        })
        .then(() => {
          this.$bvModal.hide("modal1");
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    }
  },
  mounted() {
    if (!this.checkDate) {
      this.$bvModal.msgBoxOk(
        "selecione um ou mais horarios em seguida click em Solicitar Reserva"
      );
    }
  }
};
</script>

<style>
@media screen and (max-width: 600px) {
  #schedule {
    padding: 20px;
  }
}

@media screen and (min-width: 600px) {
  #schedule {
    padding: 0px;
  }
}

#model {
  width: 100px;
  text-align: center;
}

#schedule {
  overflow: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

#schedule td:hover {
  background-color: #c1c1c1;
}
</style>