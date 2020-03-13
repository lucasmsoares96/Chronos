<template>
    <b-navbar v-if="user.nome" toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
            <font-awesome-icon icon="user" class="mr-2"></font-awesome-icon>
            {{user.nome}}
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Quadro de Horários</b-nav-item>
                <b-nav-item to="/teacher">Suas Reservas</b-nav-item>
                <b-nav-item v-if="user.admRecursos" to="/resourcesAdmin">Administração de Recursos</b-nav-item>
                <b-nav-item v-if="user.admGeral" to="/generalAdmin">Administração Geral</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
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

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>Sign In</template>
                    <b-dropdown-form>
                        <b-form-group
                            label="Email"
                            label-for="dropdown-form-email"
                            @submit.stop.prevent
                        >
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

                        <b-form-checkbox class="mb-3">Lembrar-me</b-form-checkbox>
                        <b-button variant="primary" size="sm" @click="login">Sign In</b-button>
                    </b-dropdown-form>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item-button>Não tem cadastro? Registre-se</b-dropdown-item-button>
                    <b-dropdown-item-button>Esqueceu sua Senha?</b-dropdown-item-button>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from 'axios';
export default {
    name: "NavBar",
    data(){
        return{
            user2:{},
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        login() {
            axios
                .post(`${baseApiUrl}/login`, {user : this.user2})
                .then(res => {
                    this.$store.commit("setUser", res.data);
                    localStorage.setItem(userKey, JSON.stringify(res.data));
                    // this.$router.push("/teacher");
                    this.$bvModal.hide("modal1");
                })
                .catch(showError);
        },
        logOut() {
            localStorage.removeItem(userKey);
            this.$store.commit("setUser", {
                auth: false,
                token: null,
                payload: {}
            });
            if (window.location.pathname != "/" && window.location.pathname != "/schedule") {
                this.$router.push("/");
            }
        },
        onClick() {
            // Close the menu and (by passing true) return focus to the toggle button
            this.$refs.dropdown.hide(true);
        }
    }
};
</script>

<style>
</style>

