<template>
  <div>

    <div>
        <h2 class="ma-0 text-xs-center header-main-title">Портал поиска квартир<br/>в новостройках московского региона</h2>
    </div>
    <enter/>
    <numbers :values="dataset"/>
    <hot :buildings="dataset.newBuildings"/>
  </div>
</template>

<script>

export default {
    auth: false,
    components: {
        enter: () => import('~/components/landing/enter'),
        numbers: () => import('~/components/landing/numbers'),
        hot: () => import('~/components/landing/hot')
    },
    query: {
        //endpoint: 'hot',
        endpoint: 'landing',
        method: 'get',
        //merge: 'entities.landing.0'
        merge: (data) => ({
            dataset: data.entities.landing[0]
        })
    },
    /* asyncData(ctx) {
        
    }, */
    data: () => ({
        //dataset => HERE WILL BE SERVER DATA
        dataset: {}
    }),
    mounted() {
        //this.dataset.lots.total = 1
        //this.dataset.lots.new = 1
    }
};
</script>