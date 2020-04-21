<template>
  <header>
    <div id="cabecalho">
      <div style="align-self: flex-start">
        <h1>
          <router-link to="/">Assistente de Reserva de Recursos</router-link>
        </h1>
      </div>
      <div style="align-self: flex-end">
        <a href="http://www.cefetmg.br" target="_blank">
          <img
            src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/logo-topo-5.png"
            alt="CEFET-MG"
          />
        </a>
      </div>
    </div>
    <NavBar />
  </header>
</template>

<script>
import NavBar from "./NavBar";

export default {
  name: "Header",
  props: {},
  computed: {},
  components: {
    NavBar
  }
};
</script>

<style>
header {
  background-color: #004c84;
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
  display: flex;
  flex-direction: column;
  color: white;
}
#cabecalho {
  min-height: 162px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 25px 50px;
  padding-bottom: 30px;
}
header a,
header a:hover {
  color: white;
  text-decoration: none;
  font-weight: 400;
}
</style>