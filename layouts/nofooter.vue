<template>
  <div style="display: flex; flex-direction: column; height: 100vh">
    <Navbar/>
    <nuxt style="flex: 1"/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';
import foot from '~/components/footer';

export default {
  components: {
    Navbar
  }
};
</script>