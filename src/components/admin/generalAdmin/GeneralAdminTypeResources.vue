<template>
  <div id="general-admin-type-resources">
    <h2>Tipos de Recursos</h2>
    <b-form>
      <b-form-group label="Tipo de Recurso: " label-for="rec-type">
        <b-form-input
          id="rec-type"
          type="text"
          v-model="recType.nome"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o tipo de recurso..."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Descrição: " label-for="descricao">
        <b-form-input
          id="descricao"
          type="text"
          v-model="recType.descricao"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a descrição do recurso..."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Responsável:" label-for="teachers">
        <b-form-select
          v-if="mode === 'save' || 'edit'"
          id="teachers"
          :options="teachers"
          v-model="recType.idProfessor"
        />
        <b-form-input v-else id="type" type="text" v-model="recType.email" readonly />
      </b-form-group>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Adicionar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button variant="warning" v-if="mode === 'edit'" @click="save">Editar</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <div id="table">
      <b-table striped :items="items" :fields="fields">
        <template v-slot:cell(actions)="data">
          <b-button variant="warning" @click="loadRecType(data.item, 'edit')" class="btn2 mr-2">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
          </b-button>
          <b-button variant="danger" class="btn2 mr-2" @click="loadRecType(data.item, 'remove')">
            <font-awesome-icon icon="trash"></font-awesome-icon>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  name: "GeneralAdminTypeResources",
  data() {
    return {
      fields: [
        {
          key: "nome",
          label: "Tipo de Recurso",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "email",
          label: "Responsável",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "descricao",
          label: "Descrição",
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
      recType: {},
      mode: "save",
      items: [],
      teachers: []
    };
  },
  methods: {
    getTypeResources() {
      axios
        .get("http://localhost:3000/selectTabelaTipoDeRecursos")
        .then(res => (this.items = res.data));
    },
    reset() {
      this.mode = "save";
      this.recType = {};
    },
    save() {
      const method = this.recType.idTipoDeRecursos ? "put" : "post";
      axios[method](`${baseApiUrl}/insertTipoDeRecursos`, {
        recType: this.recType
      })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.getTypeResources();
        })
        .catch(showError);
    },
    remove() {
      const id = this.recType.idTipoDeRecursos;
      axios
        .delete(`${baseApiUrl}/deleteTipoDeRecursos/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset;
          this.getTypeResources();
        })
        .catch(showError);
    },
    loadRecType(recType, mode = "save") {
      this.mode = mode;
      this.recType = { ...recType };
      if (this.mode == "remove") {
        this.$bvModal
          .msgBoxConfirm("Deseja excluir o tipo de recurso?", {
            okVariant: "danger"
          })
          .then(value => {
            if (value == true) {
              this.remove();
            }
          });
      }
    },
    loadTeachers() {
      const url = `${baseApiUrl}/selectTabelaProfessor`;
      axios.get(url).then(res => {
        this.teachers = res.data.map(teachers => {
          return {
            value: teachers.idProfessor,
            text: `${teachers.nomeP} - ${teachers.areaDoConhecimento} - ${teachers.email}`
          };
        });
      });
    }
  },
  mounted() {
    this.getTypeResources();
    this.loadTeachers();
  }
};
</script>

<style>
@media screen and (max-width: 600px) {
  #general-admin-type-resources {
    padding: 5px;
  }
}
@media screen and (min-width: 600px) {
  #general-admin-type-resources {
    padding: 20px;
  }
}
</style>