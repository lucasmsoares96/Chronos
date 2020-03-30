<template>
  <div id="awaiting-analysis">
    <h2>Aguardando Análise</h2>
    <!-- <table>
      <tr>
        <td> - 07:00:00 </td>
        <td> - 07:50:00 </td>
        <td> - 08:55:00 </td>
        <td> - 09:45:00 </td>
        <td> - 10:50:00 </td>
        <td> - 11:40:00 </td>
        <td> - 12:30:00 </td>
        <td> - 13:50:00 </td>
        <td> - 14:40:00 </td>
        <td> - 15:50:00 </td>
        <td> - 16:40:00 </td>
        <td> - 17:30:00 </td>
        <td> - 19:00:00 </td>
        <td> - 19:50:00 </td>
        <td> - 20:55:00 </td>
        <td> - 21:45:00 </td>
      </tr>
    </table>-->
    <div id="table">
      <b-table ref="table" striped :fields="fields" :items="getItems">
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
      fund: []
    };
  },
  methods: {
    getItems() {
      return axios
        .post("http://localhost:3000/selectProfessorHorario", {
          payload: this.$store.state.user
        })
        .then(res => {
          this.items = res.data.map(e => {
            switch (e.horario) {
              case "07:00:00":
                e.horario = "07:00 - 07:50";
                e.pos = 0;
                break;
              case "07:50:00":
                e.horario = "07:50 - 08:40";
                e.pos = 1;
                break;
              case "08:55:00":
                e.horario = "08:55 - 09:45";
                e.pos = 2;
                break;
              case "09:45:00":
                e.horario = "09:45 - 10:35";
                e.pos = 3;
                break;
              case "10:50:00":
                e.horario = "10:50 - 11:40";
                e.pos = 4;
                break;
              case "11:40:00":
                e.horario = "11:40 - 12:30";
                e.pos = 5;
                break;
              case "12:30:00":
                e.horario = "12:30 - 13:50";
                e.pos = 6;
                break;
              case "13:50:00":
                e.horario = "13:50 - 14:40";
                e.pos = 7;
                break;
              case "14:40:00":
                e.horario = "14:40 - 15:30";
                e.pos = 8;
                break;
              case "15:50:00":
                e.horario = "15:50 - 14:40";
                e.pos = 9;
                break;
              case "16:40:00":
                e.horario = "16:40 - 17:30";
                e.pos = 10;
                break;
              case "17:30:00":
                e.horario = "17:30 - 19:00";
                e.pos = 11;
                break;
              case "19:00:00":
                e.horario = "19:00 - 19:50";
                e.pos = 12;
                break;
              case "19:50:00":
                e.horario = "19:50 - 20:40";
                e.pos = 13;
                break;
              case "20:55:00":
                e.horario = "20:55 - 21:45";
                e.pos = 14;
                break;
              case "21:45:00":
                e.horario = "21:45 - 22:35";
                e.pos = 15;
                break;
              default:
                break;
            }
            return e;
          });
          let i = 0,
            j = 0,
            cont = 1;
          for (i = 0; i < this.items.length - 1; i++) {
            // console.log(this.items[i]);
            if (
              this.items[i].email == this.items[i + 1].email &&
              this.items[i].numero == this.items[i + 1].numero &&
              this.items[i].pos + 1 == this.items[i + 1].pos
            ) {
              let parts1 = this.items[i].horario.split("-")[0];
              // console.log("part1 " + parts1);
              let parts2 = this.items[i + 1].horario.split("-")[1];
              // console.log("part2 " + parts2)
              let vetPart = [parts1, parts2];
              // console.log("partes " + vetPart)
              this.items[i + 1].horario = vetPart.join("-");
              // this.items[i + 1].pos = this.items[i].pos
              // console.log(this.items[i])
              cont++;
            } else {
              this.fund[j] = this.items[i];
              this.fund[j].cont = cont;
              cont = 1;
              // console.log(j)
              j = j + 1;
            }
          }
          this.fund[j] = this.items[this.items.length - 1];
          this.fund[j].cont = cont;
          return this.fund;
        });
    },
    approveItem(item) {
      this.$bvModal.msgBoxConfirm("Deseja aprovar o reserva?").then(value => {
        if (value == true) {
          axios
            .post(`${baseApiUrl}/updateAprovadoProfessorHorario`, {
              item: item,
              payload: this.$store.state.user
            })
            .then(() => {
              this.$toasted.global.defaultSuccess();
              this.$refs.table.refresh()
            })
            .catch(showError);
        }
      });
    },
    denyItem(item) {
      this.$bvModal.msgBoxConfirm("Deseja negar a pedido?").then(value => {
        if (value == true) {
          axios
            .post(`${baseApiUrl}/updateRecusadoProfessorHorario`, {
              item: item,
              payload: this.$store.state.user
            })
            .then(() => {
              this.$toasted.global.defaultSuccess();
              this.$refs.table.refresh()
            });
        }
      });
    }
  },
};
</script>

<style>
@media screen and (max-width: 600px) {
  #awaiting-analysis {
    padding: 5px;
  }
}
@media screen and (min-width: 600px) {
  #awaiting-analysis {
    padding: 20px;
  }
}
</style>