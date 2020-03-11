<template>
    <div id="app">
        <Container />
    </div>
</template>

<script>
// import { axios } from "axios";
import { userKey } from "@/global";
    // baseApiUrl,
import Container from "./components/template/Container";

export default {
    name: "App",
    components: {
        Container
    },
    data(){
        return {
            validatingToken: true
        }
    },
    methods:{
        validateToken(){
            this.validatingToken=true
            const userData = JSON.parse(localStorage.getItem(userKey))

            if (userData) {
            this.$store.commit('setUser',userData)
            }else {
                this.$store.commit('setUser',{})
                this.validatingToken = false
                // this.$router.push("/")
                return
            }
            // axios.post(`${baseApiUrl}/validateToken`,userData).then(res => {
            //     if (res.data) {
            //         this.$store.commit('setUser',userData)
            //     }else{
            //         localStorage.removeItem(userKey)
            //         this.$router.push('/')
            //     }
            //     this.validatingToken = false
            // })
        }
    },
    mounted(){
        this.validateToken();
    }
}
</script>

<style>
#table{
    width: 100%;
    overflow: scroll;
}

h2 {
    margin: 20px 0px;
    color: #007bff;
    font-size: 2rem;
}
</style>
