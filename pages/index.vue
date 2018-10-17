<template>
  <section class="section">
    <!-- <div class="container">
      <h1 class="title">Nuxt Auth</h1>
      <p><nuxt-link to="/profile">PROFILE</nuxt-link></p>
      <p><nuxt-link to="/building">building</nuxt-link></p>
    </div> -->

    <greet/>
    <enter/>
    <numbers/>
    <hot/>
  </section>
</template>

<script>

export default {
  components: {
    greet: () => import('~/components/landing/head'),
    enter: () => import('~/components/landing/enter'),
    numbers: () => import('~/components/landing/numbers'),
    hot: () => import('~/components/landing/hot')
  },
  watch: {
      '$store.state.auth': (val) => {
          //console.log('AUTH', val)
      }
  }
};
</script>