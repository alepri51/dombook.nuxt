<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Building _id</h2>

      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ loggedInUser.username }}
          {{ $route.params.id }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: 'auth',
    /* validate({ params }) {
        return !isNaN( +params.id)
    }, */

    async fetch(ctx) {
        debugger
        try {
            //let path = '/api/building/' + ctx.route.params.id;
            let path = '/api/building';
            let data = await ctx.$axios.$get(path);
            console.log(data);
        }
        catch(err) {
            console.log(err);
            err = JSON.stringify(err, null, 2);
            err = err.replace(/\n/gi, '<br>').replace(/\"/gi, '');
            ctx.error(err);
        }
    },     
    computed: {
        ...mapGetters(['loggedInUser']),
    },
};
</script>
