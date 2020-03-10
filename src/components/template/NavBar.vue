<template>
    <b-navbar v-if="user" toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">{{user.nome}}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="/teacher">Suas Reservas</b-nav-item>
                <b-nav-item href="/resourcesAdmin">Administração de Recursos</b-nav-item>
                <b-nav-item href="/generalAdmin">Administração Geral</b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: "NavBar",
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
};
</script>

<style>
</style>

