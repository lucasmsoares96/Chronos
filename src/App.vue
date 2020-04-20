<template>
  <div id="app">
    <Container />
  </div>
</template>

<script>
import { userKey } from "@/global";
import Container from "./components/template/Container";
import "@/custom.scss";

export default {
  name: "App",
  data() {
    return {
      dataRec: ""
    };
  },
  components: {
    Container
  },
  methods: {
    validateToken() {
      const userData = JSON.parse(localStorage.getItem(userKey));

      if (userData) {
        this.$store.commit("setUser", userData);
      } else {
        this.$store.commit("setUser", {
          auth: false,
          token: null,
          payload: {}
        });
        this.$router.push("/");
        return;
      }
    }
  },
  created() {
    this.validateToken();
    this.dataRec = JSON.parse(localStorage.getItem("dataRec"));
    this.$store.commit("setObj", this.dataRec);
  }
};
</script>

<style>
#table {
  width: 100%;
  overflow: scroll;
}

h2,
h3 {
  color: #007bff;
  font-size: 2rem;
}
.btn {
  width: 140px;
}
</style>
