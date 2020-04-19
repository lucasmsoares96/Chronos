<template>
  <section id="about">
    <h2 class="mb-5">Sobre o Projeto</h2>
    <pre id="text">
      Esse projeto foi desenvolvido por dois alunos do segundo período do curso de Engenharia de Computação do CEFET-MG Campus V, Lucas Martins Soares e Vitor Martins Soares, orientados pelo diretor da instituição Emerson De Sousa Costa e coorientados por Tiago Alves De Oliveira, com o objetivo de otimizar o processo de reserva dos recursos físicos no CEFET.
      

    </pre>
  </section>
</template>

<script>
export default {
  name: "About"
};
</script>

<style>
@media screen and (max-width: 600px) {
  #text {
    width: 100%;
    min-height: 400px;
  }
}
@media screen and (max-width: 1000px) {
  #text {
    width: 100%;
    min-height: 400px;
  }
}
@media screen and (min-width: 1000px) {
  #text {
    width: 70%;
    min-height: 400px;
  }
}

pre {
  margin: auto;
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>