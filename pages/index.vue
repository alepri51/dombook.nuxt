<template>
  <div>

    <div>
        <h2 class="ma-0 text-xs-center header-main-title">Портал поиска квартир<br/>в новостройках московского региона</h2>
    </div>
    <enter/>
    <numbers :values="values"/>
    <hot :buildings="values.newBuildings"/>
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
    async asyncData(ctx) {
        try {
            let path = '/api/hot';
            let data = await ctx.$axios.$get(path);

            return {
                values: data.entities.landing[0]
            }
        }
        catch(err) {
            debugger
            //console.log(err);
            //err = JSON.stringify(err, null, 2);
            //err = err.replace(/\n/gi, '<br>').replace(/\"/gi, '');
            ctx.error({ 
                code: err.code,
                message: err.message,
                stack: err.stack,
            });
        }
    },
    data: () => ({
        //values: {}
        /* values: {
            projects: {
                total: 100,
                new: 10
            },
            buildings: {
                total: 100,
                new: 10
            },
            lots: {
                total: 100,
                new: 10
            },
        } */
    })
};
</script>