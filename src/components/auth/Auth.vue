<template>
    <b-form class="formulario">
        <h6 v-if="!showSignUp">Conecte-se:</h6>
        <h6 v-else>Cadastre-se:</h6>
        <b-form-input
            v-if="showSignUp"
            id="user-name"
            type="text"
            placeholder="Informe seu nome"
            v-model="user.email"
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
            id="user-password"
            type="password"
            placeholder="Informe sua senha"
            v-model="user.password"
            class="mb-3"
        />
        <b-form-input
            v-if="showSignUp"
            id="confirm-password"
            type="password"
            placeholder="Confirme sua senha"
            v-model="user.password"
            class="mb-3"
        />
    </b-form>
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
        login() {
            axios
                .post(`${baseApiUrl}/login`, this.user)
                .then(res => {
                    this.$store.commit("setUser", res.data);
                    localStorage.setItem(userKey, JSON.stringify(res.data));
                    this.$router.push("/teacher");
                })
                .catch(showError);
        },
        siginUp() {
            axios
                .post(`${baseApiUrl}/inserirProfessor`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.user = {};
                    this.shwoSignUp = false;
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
    }
};
</script>

<style>
</style>