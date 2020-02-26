<template>
    <section>
        <div id="grade">
            <h2>Informe os dados da reserva</h2>
            <DataRec />
            <b-modal
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

                <template v-slot:modal-footer="{ cancel }">
                    <b-button variant="primary" @click="sendUserData"
                        >sim</b-button
                    >
                    <b-button @click="cancel()">
                        não
                    </b-button>
                </template>
            </b-modal>
        </div>
    </section>
</template>

<script>
import DataRec from "./DateRec";
import axios from "axios";
// import SingIn from './SignIn'

export default {
    name: "Home",
    components: {
        DataRec
        //  SingIn,
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
        this.$bvModal.show("modal1");
    }
};
</script>

<style>
section {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
@media screen and (max-width: 600px) {
    #grade {
        width: 80%;
    }
}
@media screen and (min-width: 600px) {
    #grade {
        width: 50%;
    }
}
</style>