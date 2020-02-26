<template>
        <b-form class="formulario">
            <p>Conecte-se</p>
            <b-form-group label="E-mail:" label-for="user-email">
                <b-form-input
                    id="user-email"
                    type="text"
                    placeholder="Informe seu email"
                />
            </b-form-group>
            <b-form-group label="Senha:" label-for="user-password">
                <b-form-input
                    id="user-password"
                    type="password"
                    placeholder="Informe sua senha"
                />
            </b-form-group>
        </b-form>
</template>

<script>
import axios from "axios";

export default {
    name: "SignIn",
    data() {
        return {};
    },
    methods: {
        sendUserData() {
            axios
                .post("http://localhost:3000/data", {
                    // data
                })
                .then(() => {
                    this.$router.push("/teacher");
                });
        }
    },
    mounted() {
    }
};
</script>

<style>
</style>