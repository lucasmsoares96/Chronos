<template>
  <b-navbar v-if="this.$store.state.user.nome" toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#">
      <font-awesome-icon icon="user" class="mr-2"></font-awesome-icon>
      {{this.$store.state.user.nome}}
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Quadro de Horários</b-nav-item>
        <b-nav-item to="/teacher">Suas Reservas</b-nav-item>
        <b-nav-item
          v-if="this.$store.state.user.admRecursos"
          to="/resourcesAdmin"
        >Administração de Recursos</b-nav-item>
        <b-nav-item v-if="this.$store.state.user.admGeral" to="/generalAdmin">Administração Geral</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <span class="mr-1">
          <b-nav-item @click.prevent href>
            <font-awesome-icon icon="book" mr-3></font-awesome-icon>Sobre
          </b-nav-item>
        </span>
        <b-nav-item @click.prevent="logOut" href>
          <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>Sair
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <b-navbar v-else toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav></b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item @click.prevent href>
          <font-awesome-icon icon="book" mr-3></font-awesome-icon>Sobre
        </b-nav-item>
        <b-nav-item-dropdown right ref="dropdown">
          <template v-slot:button-content>Sign In</template>
          <b-dropdown-form v-if="!signUp" style="width: 350px">
            <h6>Conecte-se:</h6>
            <b-form-group label="Email" label-for="dropdown-form-email" @submit.stop.prevent>
              <b-form-input
                id="dropdown-form-email"
                size="sm"
                v-model="user.email"
                placeholder="email@example.com"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Senha" label-for="dropdown-form-password">
              <b-form-input
                id="dropdown-form-password"
                type="password"
                size="sm"
                v-model="user.password"
                placeholder="senha"
              ></b-form-input>
            </b-form-group>
            <b-button variant="primary" size="sm" @click="login">Sign In</b-button>
          </b-dropdown-form>
          <b-dropdown-form v-if="signUp" style="width: 350px">
            <h6>Cadastre-se:</h6>
            <b-form-input
              id="user-name"
              type="text"
              placeholder="Informe seu nome"
              v-model="user.nome"
              class="mb-3"
            />
            <b-form-input
              id="user-cpf"
              type="text"
              placeholder="Informe seu cpf"
              v-model="user.cpf"
              class="mb-3"
            />
            <b-form-input
              id="user-area"
              type="text"
              placeholder="Informe seu Area do Conhecimento"
              v-model="user.areaDoConhecimento"
              class="mb-3"
            />
            <b-form-input
              id="user-email"
              type="text"
              placeholder="Informe seu email"
              v-model="user.email"
              class="mb-3"
            />
            <b-form-input
              id="user-confirmEmail"
              type="text"
              placeholder="Confirme seu email"
              v-model="user.confirmEmail"
              class="mb-3"
            />
            <b-form-input
              id="user-password"
              type="password"
              placeholder="Informe sua senha"
              v-model="user.password"
              class="mb-3"
            />
            <b-form-input
              id="confirm-password"
              type="password"
              placeholder="Confirme sua senha"
              v-model="user.confirmPassword"
              class="mb-3"
            />
            <b-button variant="primary" size="sm" @click="siginUp">Sign Up</b-button>
          </b-dropdown-form>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button v-if="!signUp" @click="onClick">Não tem cadastro? Registre-se</b-dropdown-item-button>
          <b-dropdown-item-button v-else @click="onClick">Já tem cadastro? Faça LogIn</b-dropdown-item-button>
          <b-dropdown-item-button>Esqueceu sua Senha?</b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      signUp: false,
      user: {}
    };
  },
  methods: {
    login() {
      axios
        .post(`${baseApiUrl}/login`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.user = {};
        })
        .catch(showError);
    },
    siginUp() {
      axios
        .post(`${baseApiUrl}/inserirProfessor`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.shwoSignUp = false;
          this.login();
        })
        .catch(showError);
    },
    logOut() {
      localStorage.setItem(
        userKey,
        JSON.stringify({ auth: false, token: null, payload: {} })
      );
      this.$store.commit("setUser", {
        auth: false,
        token: null,
        payload: {}
      });
      if (
        window.location.pathname != "/" &&
        window.location.pathname != "/schedule"
      ) {
        this.$router.push("/");
      }
    },
    onClick() {
      this.signUp = !this.signUp;
      this.$refs.dropdown.show();
    }
  }
};
</script>

<style>
</style>

