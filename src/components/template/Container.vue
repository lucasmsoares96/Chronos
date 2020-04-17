<template>
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Main from "./Main.vue";

export default {
  name: "Container",
  components: {
    Header,
    Footer,
    Main
  }
};
</script>

<style>
.card {
  border: none;
}
</style>