<template>
    <div id="app">
        <Container />
    </div>
</template>

<script>
import { userKey } from "@/global";
import Container from "./components/template/Container";

export default {
    name: "App",
    components: {
        Container
    },
    methods:{
        validateToken(){
            const userData = JSON.parse(localStorage.getItem(userKey))

            if (userData) {
            this.$store.commit('setUser',userData)
            }else {
                this.$store.commit('setUser',{
                auth: false,
                token: null,
                payload: {},
            })
                this.$router.push("/")
                return
            }
        }
    },
    created(){
        this.validateToken();
    }
}
</script>

<style>
*{
    outline: none;
}
#table{
    width: 100%;
    overflow: scroll;
}

h2, h3 {
    margin-bottom: 20px;
    color: #007bff;
    font-size: 2rem;
}
</style>
