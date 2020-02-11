<template>
    <header>
        <div id="barradeacessibilidade">
            <div>
                <a
                    href="mapa-do-site#Mapa do Site"
                    title="Mapa do site"
                    style="font-size:11px;"
                >MAPA DO SITE</a>
                <a
                    href="http://www.sgi.cefetmg.br/acessibilidade/"
                    title="Acessibilidade"
                    style="font-size:11px;"
                >ACESSIBILIDADE</a>
                <a
                    href="javascript:;"
                    id="altocontraste"
                    onclick="window.toggleContrast()"
                    onkeydown="window.toggleContrast()"
                    title="Alto Contraste"
                    style="font-size:11px;"
                >ALTO CONTRASTE</a>
            </div>
        </div>
        <div id="cabecalho">
            <div style="align-self: flex-start">
                <h1>
                    <a href="http://www.divinopolis.cefetmg.br">Unidade Divinópolis</a>
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
        <div id="busca">
            <div>
                <div>
                    <h4>
                        <a href="https://email.cefetmg.br/" target="_blank">
                            <img
                                src="http://www.divinopolis.cefetmg.br/wp-content/themes/unidades/imagens/mail-logo-cefet.png"
                            />
                            Serviço de e-mail
                        </a>
                    </h4>
                </div>
            </div>
            <div>
                <div>
                    <form role="search" method="get" action="http://www.divinopolis.cefetmg.br/">
                        <fieldset>
                            <div style="padding-bottom:0px;">
                                <input
                                    type="search"
                                    placeholder="Buscar..."
                                    value
                                    name="s"
                                    required
                                    style="width:100%;"
                                />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header'
};
</script>

<style>
header{
    width: 100%;
    background-color: #004C84;    
    background-image: linear-gradient(
        to bottom,
        transparent,
        rgba(0, 0, 0, 0.3)
    );
    display: flex;
    flex-direction: column;
    
}
#barradeacessibilidade{
    display: flex;
    justify-content: flex-end;
    padding: 5px;
}
#cabecalho{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 25px;

}
#busca{
    background-color: #E1E1E1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding: 5px 25px;

}
header a, header a:hover{
    color: white;
    text-decoration: none;
}

</style>