<template>
        <b-navbar v-if="user" toggleable="lg" type="light" variant="light">
            <b-navbar-brand href="#">
                <font-awesome-icon icon="user" class="mr-2" >

                </font-awesome-icon>
                {{user.nome}}
                </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/teacher">Suas Reservas</b-nav-item>
                    <b-nav-item
                        v-if="user.admRecursos"
                        to="/resourcesAdmin"
                    >Administração de Recursos</b-nav-item>
                    <b-nav-item v-if="user.admGeral" to="/generalAdmin">Administração Geral</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item @click.prevent="logOut" href=""> <font-awesome-icon icon="sign-out-alt"></font-awesome-icon> Sair</b-nav-item>
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
    methods:{
        logOut(){
            localStorage.removeItem(userKey)
            this.$store.commit('setUser',{})
            this.$router.push("/")
        }
    }
};
</script>

<style>
</style>

