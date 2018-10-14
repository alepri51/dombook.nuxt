<template>
  <div>
    <h1>{{ counter }} Super secret page {{ $route.params }}</h1>
    <p>If you try to access this URL not connected, you will see the error page telling your that you are not connected.</p>
    <nuxt-link to="/">Back to the home page</nuxt-link>
  </div>
</template>

<script>
export default {
    //middleware: 'auth'
    validate({ params }) {
        //debugger
        return !isNaN( +params.id);
    },
    data: () => ({
        counter: 0
    }),
    created() {
        setInterval(() => {
            this.counter++;
        }, 1000);
    },
    computed: {
        routeName() {
            debugger;
            return this.$route.params;
            return JSON.stringify(this.$route.params);
        }
    }
}
</script>
