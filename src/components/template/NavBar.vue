<template>
    <b-navbar v-if="user.nome" toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
            <font-awesome-icon icon="user" class="mr-2"></font-awesome-icon>
            {{user.nome}}
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
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
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-form>
                        <b-form-group
                            label="Email"
                            label-for="dropdown-form-email"
                            @submit.stop.prevent
                        >
                            <b-form-input
                                id="dropdown-form-email"
                                size="sm"
                                placeholder="email@example.com"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Password" label-for="dropdown-form-password">
                            <b-form-input
                                id="dropdown-form-password"
                                type="password"
                                size="sm"
                                placeholder="Password"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
                        <b-button variant="primary" size="sm" @click="onClick">Sign In</b-button>
                    </b-dropdown-form>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item-button>New around here? Sign up</b-dropdown-item-button>
                    <b-dropdown-item-button>Forgot Password?</b-dropdown-item-button>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { userKey } from "@/global";
export default {
    name: "NavBar",
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem(userKey);
            this.$store.commit("setUser", {
                auth: false,
                token: null,
                payload: {}
            });
            this.$router.push("/");
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

