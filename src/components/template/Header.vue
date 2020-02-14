<template>
    <header>
        <div id="cabecalho">
            <div style="align-self: flex-start">
                <h1>
                    <router-link to="/">Chonus</router-link>
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
        <div class="topnav" id="myTopnav">
            <a href="#home" class="active">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a
                href="javascript:void(0);"
                style="font-size:15px;"
                class="icon"
                @click="myFunction()"
                >&#9776;</a
            >
        </div>
    </header>
</template>

<script>
// import Userdropdown from "./Userdropdown";

export default {
    name: "Header",
    components: {
        // Userdropdown
    },
    methods: {
        myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
            console.log("entrou")
        }
    }
};
</script>

<style>
#busca {
    height: 64px;
    background-color: #e1e1e1;
}
header {
    background-color: #004c84;
    background-image: linear-gradient(
        to bottom,
        transparent,
        rgba(0, 0, 0, 0.3)
    );
    display: flex;
    flex-direction: column;
}
#cabecalho {
    height: 162px;
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
}

body {
    margin: 0;
    font-family: Arial;
}

.topnav {
    overflow: hidden;
    background-color: #E1E1E1;
}

.topnav a {
    float: left;
    display: block;
    color: #555;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

.active {
    color: white;
}

.topnav .icon {
    display: none;
}

.dropdown {
    float: left;
    overflow: hidden;
}

.dropdown .dropbtn {
    font-size: 17px;
    border: none;
    outline: none;
    color: white;
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.topnav a:hover,
.dropdown:hover .dropbtn {
    background-color: #555;
    color: white;
}

.dropdown-content a:hover {
    background-color: #ddd;
    color: black;
}

.dropdown:hover .dropdown-content {
    display: block;
}

@media screen and (max-width: 600px) {
    .topnav a:not(:first-child),
    .dropdown .dropbtn {
        display: none;
    }
    .topnav a.icon {
        float: right;
        display: block;
    }
}

@media screen and (max-width: 600px) {
    .topnav.responsive {
        position: relative;
    }
    .topnav.responsive .icon {
        position: absolute;
        right: 0;
        top: 0;
    }
    .topnav.responsive a {
        float: none;
        display: block;
        text-align: left;
    }
    .topnav.responsive .dropdown {
        float: none;
    }
    .topnav.responsive .dropdown-content {
        position: relative;
    }
    .topnav.responsive .dropdown .dropbtn {
        display: block;
        width: 100%;
        text-align: left;
    }
}
</style>