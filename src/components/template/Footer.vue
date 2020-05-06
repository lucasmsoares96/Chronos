<template>
  <footer id="footer">
    <span id="unidades">
      <div>
        <span>
          <a href="#">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/bg_unidades-3.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.araxa.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/araxa.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.campus1.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/campus1bh.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.campus2.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/campus2bh.jpg"
            />
          </a>
        </span>
        <span>
          <a href="#">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/campus6bh.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.contagem.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/contagem.jpg"
            />
          </a>
        </span>
      </div>
      <div>
        <span>
          <a href="http://www.curvelo.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/curvelo.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.divinopolis.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/divinopolis.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.leopoldina.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/leopoldina.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.nepomuceno.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/nepomuceno.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.timoteo.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/timoteo.jpg"
            />
          </a>
        </span>
        <span>
          <a href="http://www.varginha.cefetmg.br">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/unidades/varginha.jpg"
            />
          </a>
        </span>
      </div>
    </span>
    <div id="rodape">
      <ul id="social">
        <li>
          <a href="https://github.com/lucasmsoares96/Chronos" target="_blank">
            <img alt="Vue logo" src="@/assets/GitHub-Mark-Light-120px-plus.png" width="32" />
          </a>
        </li>
        <li style="visibility: hidden;">
          <a href="https://github.com/lucasmsoares96/Chronos" target="_blank">
            <img alt="Vue logo" src="@/assets/GitHub-Mark-Light-120px-plus.png" width="32" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/cefetmg" target="_blank">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/ico_facebook.png"
              alt="Facebook"
            />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/cefet_mg" target="_blank">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/ico_twitter.png"
              alt="Twitter"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/edu/school?id=10506&amp;trk=prof-following-school-logo"
            target="_blank"
          >
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/ico_linkedin.png"
              alt="Linkedin"
            />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/cefetmg/" target="_blank">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/ico_instagram.png"
              alt="Instagram"
            />
          </a>
        </li>
      </ul>
      <div id="info">
        <h4>
          <a href="http://www.divinopolis.cefetmg.br">Unidade Divinópolis</a>
        </h4>
        <p>
          Rua Álvares de Azevedo 400 - Bela Vista - Divinópolis - MG -
          Brasil - CEP 35503-822
        </p>
        <p>Telefone: +55 (37) 3229-1150 - +55 (37) 3229-1180</p>
      </div>
      <div id="logo">
        <p>
          <a href="http://www.cefetmg.br" target="_blank">
            <img
              src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/logo_CEFET-1.png"
              alt="CEFET-MG"
            />
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
@media screen and (max-width: 940px) {
  #rodape {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (min-width: 940px) {
  #rodape {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}

@media screen and (max-width: 1100px) {
  #unidades {
    display: none;
  }
}
@media screen and (min-width: 1100px) {
  #unidades {
    padding-bottom: 60px;
    padding-top: 20px;
    display: inline;
  }
}

#footer {
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#social {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  border: 0px;
  padding: 20px 0px;
  margin: 0px;
}

#rodape {
  width: 100%;
  color: white;
  height: 100%;
  padding: 20px;
  background-color: #004c84;
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
}

#rodape a {
  color: white;
  text-decoration: none;
}

#info h4,
#info p {
  text-align: center;
  font-size: 13px;
  padding: 0;
}
#info h4 {
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  padding-bottom: 10px;
}
</style>
