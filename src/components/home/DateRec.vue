<template>
  <b-form id="formulario">
    <b-calendar hide-header v-model="value" locale="pt-BR"></b-calendar>
    <div id="form2">
      <b-form-group label="Selecione o recurso desejado">
        <b-form-radio-group
          v-model="selected"
          :options="options"
          class="mb-3"
          value-field="idTipoDeRecursos"
          text-field="nome"
          disabled-field="notEnabled"
          stacked
        ></b-form-radio-group>
      </b-form-group>
    </div>
    <b-button
      class="btn1"
      variant="primary"
      style="align-self: flex-end"
      v-on:click="sendDateRec"
    >enviar</b-button>
    <span></span>
  </b-form>
</template>

<script>
import axios from "axios";
import { showError } from "@/global";

export default {
  name: "DateRec",
  data() {
    return {
      selected: "",
      value: "",
      options: []
    };
  },
  methods: {
    reqTable() {
      axios.get("http://localhost:3000/tipoderecursos").then(res => {
        this.options = res.data;
      });
    },
    sendDateRec() {
      let data = this.value;
      let tipoRecurso = this.selected;
      let obj = [data, tipoRecurso];
      localStorage.setItem("dataRec", JSON.stringify(obj));
      axios
        .post("http://localhost:3000/data", { data, tipoRecurso })
        .then(() => {
          this.$store.commit("setObj", obj);
          this.$router.push("/schedule");
        })
        .catch(showError);
    }
  },
  mounted() {
    this.reqTable();
  }
};
</script>

<style>
/* @media screen and (max-width: 600px) {
  #formulario {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #form2 {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
} */

@media screen and (max-width: 800px) {
  #formulario {
    margin: auto;
  }
  #form2 {
    margin-top: 30px;
  }
  .btn1 {
    float: right;
    margin-bottom: 30px;
  }
}

@media screen and (min-width: 800px) {
  #formulario {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #form2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.btn1 {
  width: 120px;
  margin-top: 0px 10px;
}
</style>