<template>
  <v-app>
    <navigation/>
    <nuxt/>
  </v-app>
</template>

<script>
export default {
    components: {
        navigation: () => import('~/components/common/navigation')
    }
};
</script>