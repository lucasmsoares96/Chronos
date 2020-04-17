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
            @click="justification(data.item, 'save')"
            class="btn2 mr-2"
          >
            <font-awesome-icon icon="check"></font-awesome-icon>
          </b-button>
          <b-button
            variant="danger"
            v-b-tooltip.hover
            title="Negar Pedido?"
            class="btn2 mr-2"
            @click="justification(data.item, 'remove')"
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
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Informe sua justificativa"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="textState" invalid-feedback="É preciso informar o motivo">
          <b-form-textarea
            v-model="text"
            :state="textState"
            placeholder="..."
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "AwaitingAnalysis",
  data() {
    return {
      mode: "",
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
      text: "",
      textState: null,
      submittedTexts: []
    };
  },
  methods: {
    getItems() {
      let items = [];
      return axios
        .post("http://localhost:3000/selectProfessorHorario")
        .then(res => {
          items = res.data;
          return items;
        });
    },
    approveItem() {
      axios
        .post(`${baseApiUrl}/updateAprovadoProfessorHorario`, {
          item: this.item,
          justification: this.text
        })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.getItems();
          this.$refs.table.refresh();
        })
        .catch(showError);
    },
    denyItem() {
      axios
        .post(`${baseApiUrl}/updateRecusadoProfessorHorario`, {
          item: this.item,
          justification: this.text
        })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.getItems();
          this.$refs.table.refresh();
        });
    },
    justification(item, mode) {
      this.item = item;
      this.mode = mode;
      this.$bvModal.show("modal-prevent-closing");
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.textState = valid;
      return valid;
    },
    resetModal() {
      this.text = "";
      this.textState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the text to submitted texts
      this.submittedTexts.push(this.text);
      if (this.mode == "save") this.approveItem();
      else this.denyItem();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
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