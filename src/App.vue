<template>
    <div id="app">
        <Container />
    </div>
</template>

<script>
import Container from "./components/template/Container";

export default {
    name: "App",
    components: {
        Container
    }
};
</script>

<style>
#table{
    width: 100%;
    overflow: scroll;
}

h2 {
    margin: 20px 0px;
    color: #007bff;
    font-size: 2rem;
}
</style>
