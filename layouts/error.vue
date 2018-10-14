<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <div  v-else>
        <h1>An error occurred</h1>
        <h4>{{ error }}</h4>
    </div>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
    layout: 'dark',
    props: {
        error: {
            type: Object,
            default: null
        }
    }
}
</script>

<style scoped>
    .container {
        font-family: sans-serif;
        padding-top: 10%;
        text-align: center;
    }

    h1 {
        font-size: 20px;
    }
</style>
