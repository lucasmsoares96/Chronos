<template>
  <b-modal
    id="modal1"
    :title="title"
    header-text-variant="light"
    hide-header-close
    no-close-on-esc
    no-close-on-backdrop
  >
    <b-form class="formulario">
      <h6 v-if="!showSignUp">Conecte-se:</h6>
      <h6 v-else>Cadastre-se:</h6>
      <b-form-input
        v-if="showSignUp"
        id="user-name"
        type="text"
        placeholder="Informe seu nome"
        v-model="user.nome"
        class="mb-3"
      />
      <b-form-input
        v-if="showSignUp"
        id="user-matricula"
        type="text"
        placeholder="Informe seu número de matrícula"
        v-model="user.matricula"
        class="mb-3"
      />
      <b-form-input
        v-if="showSignUp"
        id="user-cpf"
        type="text"
        placeholder="Informe seu cpf"
        v-model="user.cpf"
        class="mb-3"
        :maxlength="11"
      />
      <b-form-input
        v-if="showSignUp"
        id="user-area"
        type="text"
        placeholder="Informe seu Area do Conhecimento"
        v-model="user.areaDoConhecimento"
        class="mb-3"
        :maxlength="45"
      />
      <b-form-input
        id="user-email"
        type="text"
        placeholder="Informe seu email"
        v-model="user.email"
        class="mb-3"
        :maxlength="100"
      />
      <b-form-input
        v-if="showSignUp"
        id="user-confirmEmail"
        type="text"
        placeholder="Confirme seu email"
        v-model="user.confirmEmail"
        class="mb-3"
        :maxlength="100"
      />
      <b-form-input
        id="user-password"
        type="password"
        placeholder="Informe sua senha"
        v-model="user.password"
        class="mb-3"
        @keydown.enter.native="login"
        :maxlength="75"
      />
      <b-form-input
        v-if="showSignUp"
        id="confirm-password"
        type="password"
        placeholder="Confirme sua senha"
        v-model="user.confirmPassword"
        class="mb-3"
        :maxlength="75"
      />
    </b-form>

    <template v-slot:modal-footer="{ cancel }">
      <b-button v-if="!showSignUp" variant="primary" @click="login">sim</b-button>
      <b-button v-else variant="primary" @click="siginUp">sim</b-button>
      <b-button @click="cancel()">não</b-button>
      <a href @click.prevent="showSignUp = !showSignUp">
        <span v-if="showSignUp">Já tem cadastro? Faça seu LogIn!</span>
        <span v-else>Não tem cadastro? Registre-se</span>
      </a>
    </template>
  </b-modal>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError, userKey } from "@/global";
export default {
  name: "Auth",
  data() {
    return {
      showSignUp: false,
      user: {}
    };
  },
  methods: {
    cancel() {},
    login() {
      axios
        .post(`${baseApiUrl}/login`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$bvModal.hide("modal1");
          this.user = {};
        })
        .catch(showError);
    },
    siginUp() {
      axios
        .post(`${baseApiUrl}/inserirProfessor`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.showSignUp = false;
          this.login();
        })
        .catch(showError);
    }
  },
  computed: {
    title() {
      return this.showSignUp ? "Deseja se cadastrar?" : "É professor?";
    }
  },
  mounted() {
    if (Object.keys(this.$store.state.user).length == 0) {
      this.$bvModal.show("modal1");
    }
  }
};
</script>

<style>
</style>