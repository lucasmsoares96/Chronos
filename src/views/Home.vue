<template>
  <section id="home">
    <h2 style="align-self: flex-start">Informe os dados da reserva</h2>
    <div id="grade">
      <DataRec />
      <Auth />
    </div>
  </section>
</template>

<script>
import DataRec from "../components/home/DateRec";
import Auth from "../components/home/Auth.vue";

export default {
  name: "Home",
  components: {
    DataRec,
    Auth
  }
};
</script>

<style>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  #grade {
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }
}
@media screen and (max-width: 800px) {
  #grade {
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px;
  }
}
@media screen and (min-width: 800px) {
  #grade {
    width: 75%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px;
  }
}
</style>