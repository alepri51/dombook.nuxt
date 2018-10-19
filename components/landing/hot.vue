<template>
	<v-container grid-list-md text-xs-center tag="section" class="excerpt">
		<h2 class="section-heading">Новые корпуса в Москве</h2>
		<v-layout :row="$vuetify.breakpoint.mdAndUp" :column="$vuetify.breakpoint.smAndDown" align-center
		          justify-space-between wrap>
			<building-card v-for="(card, index) in cards" :key="index" :card="card"></building-card>
		</v-layout>
	</v-container>
</template>

<script>

export default {
    props: ['buildings'],
    components: {
        buildingCard: () => import('~/components/common/building-card'),
    },
    computed: {
        cards() {
            //ИЗМЕНИТЬ ЛОГИКУ ЧТО БЫ НА СЕРВЕРЕ И КЛИЕНТЕ ИЗНАЧАЛЬНО ОТРИСОВЫВАЛОСЬ ОДИНАКОВОЕ КОЛИЧЕСТВО
            //let buildings = (this.$vuetify.breakpoint.name === 'lg') ? this.buildings.slice(0, 3) : this.buildings;
            let buildings = (!process.browser || this.$vuetify.breakpoint.name === 'lg') ? this.buildings.slice(0, 3) : this.buildings;
            return buildings;
        },
    },
};
</script>

<style scoped>
	.excerpt {
		margin-bottom: 50px;
		padding-left: 0px;
		padding-right: 0px;
	}

	.excerpt .section-heading {
		line-height: 1;
		margin-bottom: 60px;
		font-size: 42px;
		font-weight: 600;
	}
	@media screen and (max-width: 1264px) {
		.excerpt {
			margin-bottom: 15px;
		}
	}

	@media screen and (max-width: 400px) {
		.excerpt .section-heading {
			margin-bottom: 45px;
			font-size: 34px;
		}
	}
</style>