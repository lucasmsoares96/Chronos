<template>
    <section>
        <div id="grade">
            <h2>Informe os dados da reserva</h2>
            <DataRec />
            <b-modal
                v-if="!this.$store.state.user"
                id="modal1"
                title="É professor?"
                header-text-variant="light"
            >
                <b-form class="formulario">
                    <h6>Conecte-se:</h6>
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input
                            id="user-email"
                            type="text"
                            placeholder="Informe seu email"
                            v-model="user.email"
                        />
                    </b-form-group>
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input
                            id="user-password"
                            type="password"
                            placeholder="Informe sua senha"
                            v-model="user.password"
                        />
                    </b-form-group>
                </b-form>

                <template v-slot:modal-footer="{ cancel }">
                    <b-button variant="primary" @click="sendUserData">sim</b-button>
                    <b-button @click="cancel()">não</b-button>
                </template>
            </b-modal>
        </div>
    </section>
</template>

<script>
import DataRec from "./DateRec";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
// import SingIn from './SignIn'

export default {
    name: "Home",
    data(){
        return {
            user: {},
        }
},
    components: {
        DataRec
        //  SingIn,
    },
    methods: {
        sendUserData() {
            axios
                .post(`${baseApiUrl}/login`, {
                    email: this.user.email,
                    password: this.user.password
                })
                .then(res => {
                    this.$store.commit("setUser",res.data);
                    this.$router.push("/teacher");
                }).catch(showError);
        }
    },
    mounted() {
        console.log(this.$store.state.user);
        this.$bvModal.show("modal1");
    }
};
</script>

<style>
/* *{
    border: solid 1px;
    margin: 5px;
    padding: 2px;
} */

section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#grade {
    width: 70%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    margin: 20px;
}
</style>