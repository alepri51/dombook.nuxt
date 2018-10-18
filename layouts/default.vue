<template>
  <v-app>
    <navigation/>
    <nuxt/>
    <foot/>
  </v-app>
</template>

<script>

export default {
    components: {
        navigation: () => import('~/components/common/navigation'),
        foot: () => import('~/components/common/footer')
    }
};
</script>
