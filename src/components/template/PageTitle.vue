
<template>
    <div id="page-title">
            <h1>{{ main }}</h1>
            <h2>{{ sub }}</h2>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['min','sub']
};
</script>

<style>
</style>