<template>
  <section>
    <h2>Histórico</h2>
    <div id="table">
      <b-table ref="table" striped :fields="fields" :items="getItems">
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
        >{{ data.value.slice(0, 10).split("-").reverse().join("/") }}</template>
      </b-table>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

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
      ]
    };
  },
  methods: {
    getItems() {
      let items = [];
      return axios
        .post(`${baseApiUrl}/historico`)
        .then((res) => {
          items = res.data;
          items.forEach((e) => {
            if (e.status == 0) {
              e._cellVariants = { status: "warning" };
              e.status = "Em espera";
            } else if (e.status == 1) {
              e._cellVariants = { status: "info" };
              e.status = "Aprovado";
            } else if (e.status == 2) {
              e._cellVariants = { status: "danger" };
              e.status = "Recusado";
            }
          });
          return items;
        })
        .catch(showError);
    },
    denyItem(item) {
      this.$bvModal.msgBoxConfirm("Deseja restaurar o pedido?").then(value => {
        if (value == true) {
          axios
            .post(`${baseApiUrl}/desfazer`, {
              item: item
            })
            .then(() => {
              this.$toasted.global.defaultSuccess();
              this.$refs.table.refresh();
              this.getItems();
            })
            .catch(showError);
        }
      });
    }
  }
};
</script>

<style>
</style>