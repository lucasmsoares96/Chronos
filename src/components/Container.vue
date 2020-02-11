<template>
    <b-container>
        <Header />
        <Main />
        <Footer />
    </b-container>
</template>

<script>

import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Main from "./Main.vue";

export default {
    name: 'Container',
    components: {
        Header, Footer, Main,
        
    }

}
</script>

<style>
body {
    background: #C1C1C1;
}
</style>