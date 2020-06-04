<template>
    <h1>Provider {{ $route.params.id }} - Home Page</h1>
</template>

<script>
export default {
    middleware: 'auth'
}
</script>

<style scoped>

</style>
