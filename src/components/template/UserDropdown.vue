
<template>
    <div id="UserDropdown">

    </div>
</template>

<script>
export default {
    name: "UserDropdown",
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
};
</script>

<style>
#UserDropdown{
    height: 100%;
    display: flex;
    justify-content: flex-end
}
#b-dropdown{
    border: none;
    padding: 0;
    margin: 0;
    width: 15%;
    height: 100%;
}
/* #b-dropdown-item{
} */
</style>

