<template>
  <div style="display: flex; flex-direction: column;">
    <selection/>
    <div style="display: flex; flex-direction: row; flex: 1">
        <list :buildings="list" :total="count" style="flex: 2"/>
        <location :buildings="points" style="flex: 3"/>
    </div>
  </div>
</template>

<script>

export default {
    layout: 'nofooter',
    components: {
        selection: () => import('~/components/home/selection'),
        list: () => import('~/components/home/list'),
        location: () => import('~/components/home/map')
    },
    queries: [
        {
            endpoint: 'search/list',
            method: 'post',
            payload: {"viewport":[[[[56.06757655398861,37.03996283691405],[56.06757655398861,38.19764716308592],[55.432467441048146,38.19764716308592],[55.432467441048146,37.03996283691405],[56.06757655398861,37.03996283691405]]]]},
            //merge: 'entities.landing.0'
            merge: (data) => ({
                list: data.buildings,
                count: data.count
            })
        },
        {
            endpoint: 'search/map',
            method: 'post',
            payload: {"viewport":[[[[56.06757655398861,37.03996283691405],[56.06757655398861,38.19764716308592],[55.432467441048146,38.19764716308592],[55.432467441048146,37.03996283691405],[56.06757655398861,37.03996283691405]]]]},
            //payload: {"price":[5000000,10000000],"square":30,"in_operation_date":"1696107600","area":[[[[56.06757655398861,37.03996283691405],[56.06757655398861,38.19764716308592],[55.432467441048146,38.19764716308592],[55.432467441048146,37.03996283691405],[56.06757655398861,37.03996283691405]]]],"viewport":[[[[56.06757655398861,37.03996283691405],[56.06757655398861,38.19764716308592],[55.432467441048146,38.19764716308592],[55.432467441048146,37.03996283691405],[56.06757655398861,37.03996283691405]]]],"skip":0},
            //merge: 'entities.landing.0'
            merge: (data) => ({
                points: data.buildings
            })
        },
    ]
};
</script>