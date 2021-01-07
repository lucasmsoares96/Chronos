<template>
  <section>
    <h2>Professores</h2>
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-form-group label="Nome: " label-for="user-nomeP">
        <b-form-input
          id="user-nome"
          type="text"
          v-model="user.nomeP"
          :maxlength="100"
          required
          placeholder="Informe o nome do professor..."
          :readonly="mode != 'edit'"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="CPF: " label-for="user-cpf">
        <b-form-input
          id="user-cpf"
          type="text"
          v-model="user.cpf"
          required
          placeholder="Informe o cpf do professor..."
          :maxlength="11"
          :readonly="mode != 'edit'"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Área do conhecimento: " label-for="user-areaDoConhecimento">
        <b-form-input
          id="user-areaDoConhecimento"
          type="text"
          v-model="user.areaDoConhecimento"
          required
          placeholder="Informe a Área do conhecimento do professor..."
          :readonly="mode != 'edit'"
          :maxlength="45"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="E-mail: " label-for="user-email">
        <b-form-input
          id="user-email"
          type="text"
          v-model="user.email"
          required
          placeholder="Informe o E-mail do professor..."
          :readonly="mode != 'edit'"
          :maxlength="100"
        ></b-form-input>
      </b-form-group>
      <b-form-checkbox
        v-show="mode === 'edit'"
        id="user-general-admin"
        v-model="user.admGeral"
        class="mt-3 mb-3"
      >Administrador Geral?</b-form-checkbox>
      <b-form-checkbox
        v-show="mode === 'edit'"
        id="user-resources-admin"
        v-model="user.admRecursos"
        class="mt-3 mb-3"
      >Administrador de Recursos?</b-form-checkbox>
      <div style="float: left">
        <b-button disabled variant="primary" v-if="mode === 'save'" @click="save">Adicionar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button variant="warning" v-if="mode === 'edit'" @click="save">Editar</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </div>
    </b-form>
    <div id="file">
      <b-form-file
        class="mb-1"
        accept=".xlsx"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Arquivo dos professores"
        drop-placeholder="Arraste para cá"
      ></b-form-file>
      <b-progress :value="uploadPercentage" :max="100" show-progress animated></b-progress>
      <br />
      <b-button class="float-right" variant="primary" @click="submitFile()">Enviar</b-button>
      <br />
    </div>
    <div style="clear: both" class="p-4"></div>
    <div id="table">
      <b-table striped :items="items" :fields="fields">
        <template v-slot:cell(actions)="data">
          <div style="width: 140px; margin: 0 0 0 auto;">
            <b-button variant="warning" @click="loadUser(data.item, 'edit')" class="btn2 mr-2">
              <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
            </b-button>
            <b-button variant="danger" class="btn2 mr-2" @click="loadUser(data.item, 'remove')">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  name: "GeneralAdminTeachers",
  data() {
    return {
      file: null,
      uploadPercentage: 0,
      mode: "save",
      user: {},
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
          key: "cpf",
          label: "CPF",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "admGeral",
          label: "Administrador Geral",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
          formatter: value => (value ? "Sim" : "Não")
        },
        {
          key: "admRecursos",
          label: "Administrador de Reservas",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
          formatter: value => (value ? "Sim" : "Não")
        },
        {
          key: "areaDoConhecimento",
          label: "Area do Conhecimento",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "actions",
          label: "Ações",
          tdClass: "text-right",
          thClass: "text-center"
        }
      ],
      items: []
    };
  },
  methods: {
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(`${baseApiUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function(progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this)
        })
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .catch(e => {
          showError(e);
          this.uploadPercentage = 0;
        });
    },
    getTeachers() {
      axios
        .get(`${baseApiUrl}/selectTabelaProfessor`)
        .then(res => (this.items = res.data))
        .catch(showError);
    },
    reset() {
      this.mode = "save";
      this.user = {};
    },
    save() {
      const method = this.user.idProfessor ? "put" : "post";
      axios[method](`${baseApiUrl}/cadastroDeProfessor`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.getTeachers();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.idProfessor;
      axios
        .delete(`${baseApiUrl}/deleteProfessor/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.getTeachers();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
      if (this.user.admGeral == 1) {
        this.user.admGeral = true;
      } else {
        this.user.admGeral = false;
      }
      if (this.user.admRecursos == 1) {
        this.user.admRecursos = true;
      } else {
        this.user.admRecursos = false;
      }
      if (this.mode == "remove") {
        this.$bvModal
          .msgBoxConfirm("Deseja excluir o professor?", {
            okVariant: "danger"
          })
          .then(value => {
            if (value == true) {
              this.remove();
            }
          });
      }
    }
  },
  mounted() {
    this.getTeachers();
  }
};
</script>

<style>
@media screen and (max-width: 680px) {
  #file {
    padding-top: 20px;
    clear: both;
  }
}
@media screen and (min-width: 680px) {
  #file {
    width: 50%;
    float: right;
  }
}
</style>