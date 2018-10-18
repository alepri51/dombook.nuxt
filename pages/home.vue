<template>
  <div style="display: flex; flex-direction: column;">
    <selection/>
    <div style="display: flex; flex-direction: row; flex: 1">
        <list style="flex: 2"/>
        <location style="flex: 3"/>
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
    }
};
</script>