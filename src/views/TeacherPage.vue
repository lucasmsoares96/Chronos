<template>
  <div class="teacher-page-tabs">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Suas Reservas">
          <section>
            <h2>Aguardando Análise</h2>
            <div id="table">
              <b-table
                hover
                striped
                :fields="fields"
                :items="items"
                :sort-by.sync="sortBy"
              >
                <template v-slot:cell(actions)="data">
                  <b-button
                    v-b-tooltip.hover
                    title="Cancelar reserva?"
                    variant="danger"
                    class="btn2 mr-2"
                    @click="removeItem(data.item)"
                  >
                    <font-awesome-icon icon="times"></font-awesome-icon>
                  </b-button>
                </template>
                <template v-slot:cell(data)="data">{{
                  data.value.slice(0, 10).split("-").reverse().join("/")
                }}</template>
              </b-table>
            </div>
          </section>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "TeacherPage",
  data() {
    return {
      boxOne: "",
      reserva: {},
      sortBy: "status",
      fields: [
        {
          key: "status",
          label: "Situação",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "nome",
          label: "Tipo",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "numero",
          label: "Recurso",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "data",
          label: "Data",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "horario",
          label: "Horário",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: "Ações",
          thClass: "text-center",
          tdClass: "text-right",
        },
      ],
      items: [],
    };
  },
  methods: {
    getItems() {
      axios
        .post(`${baseApiUrl}/selectProfessorHorarioEspec`)
        .then((res) => {
          this.items = res.data;
          this.items.forEach((e) => {
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
        })
        .catch(showError);
    },
    removeItem(item) {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("Deseja cancelar a reserva?")
        .then((value) => {
          this.boxOne = value;
          if (this.boxOne == true) {
            axios
              .post(`${baseApiUrl}/deleteProfessorHorarioEspec`, {
                item: item,
              })
              .then(() => this.getItems())
              .catch(showError);
          }
        });
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>

<style>
</style>