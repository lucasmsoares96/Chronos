<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "Main",
  components: {}
};
</script>

<style>
main {
  background-color: white;
}

.row {
  margin: 0px;
}
.col {
  padding: 0px;
}
.card-body {
  padding: 0px;
}

@media screen and (max-width: 600px) {
  section {
    padding: 0px;
  }
  section h3,
  section h2 {
    padding-left: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}

@media screen and (min-width: 600px) {
  section {
    padding: 30px;
  }
  section h3,
  section h2 {
    padding: 30px;
  }
}
</style>