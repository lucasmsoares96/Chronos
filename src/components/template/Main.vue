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

section {
  padding: 40px;
}
</style>