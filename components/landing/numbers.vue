<template>
	<v-container grid-list-md text-xs-center tag="section" class="indicators">
		<v-layout row align-center justify-space-between wrap>
			<v-flex pa-0 xs12 sm4 md4 lg4 xl4>
				<v-card dark color="background" :height="indicatorHeight" class="indicators-item">
					<v-layout :row="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
					          :column="$vuetify.breakpoint.smOnly"
					          :align-center="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
					          :align-start="$vuetify.breakpoint.smOnly" :justify-center="$vuetify.breakpoint.smAndUp"
					          :justify-start="$vuetify.breakpoint.xsOnly">
						<div class="infographic-icon">
							<img src="~assets/icons/landing/infographic_project_green.svg" alt="">
						</div>
						<div class="infographic-text">
							<div class="infographic-count"
							     v-if="values.projects.total">{{ values.projects.total.toLocaleString('ru-RU') }}
								<div class="infographic-count-growth"
								     v-if="values.projects.new">+{{ values.projects.new.toLocaleString('ru-RU') }}
								</div>
							</div>
							<v-tooltip right>
								<div slot="activator" class="infographic-description">{{ declOfNum(values.projects.total, ['Проект', 'Проекта', 'Проектов']) }}
									<div class="infographic-description-icon">?</div>
								</div>
                                <span>Проект (Жилой комплекс) – группа домов, объединенных<br>общей придомовой инфраструктурой и единым стилем фасада.<br>+ - количество проектов в базе новостроек,продажа которых<br>началась не более 30 дней назад</span>
								<!-- <span>{{ values.projects.new }} новых проектов<br/>за этой месяц</span> -->
							</v-tooltip>
						</div>
					</v-layout>
				</v-card>
			</v-flex>
			<v-flex pa-0 xs12 sm4 md4 lg4 xl4>
				<v-card dark color="background" :height="indicatorHeight" class="indicators-item text--black">
					<v-layout :row="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
					          :column="$vuetify.breakpoint.smOnly"
					          :align-center="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
					          :align-start="$vuetify.breakpoint.smOnly" :justify-center="$vuetify.breakpoint.smAndUp"
					          :justify-start="$vuetify.breakpoint.xsOnly">
						<div class="infographic-icon">
							<img src="~assets/icons/landing/infographic_building_green.svg" alt="">
						</div>
						<div class="infographic-text">
							<div class="infographic-count"
							     v-if="values.buildings.total">{{ values.buildings.total.toLocaleString('ru-RU') }}
								<div class="infographic-count-growth"
								     v-if="values.buildings.new">+{{ values.buildings.new.toLocaleString('ru-RU') }}
								</div>
							</div>
							<v-tooltip right>
								<div slot="activator" class="infographic-description">{{ declOfNum(values.buildings.total, ['Корпус', 'Корпуса', 'Корпусов']) }}
									<div class="infographic-description-icon">?</div>
								</div>
								<span>Корпус – многоквартирный дом, в котором продаются<br>квартиры от застройщика.<br>+ - количество корпусов в базе новостроек, продажа которых<br>началась не более 30 дней назад</span>
							</v-tooltip>
						</div>
					</v-layout>
				</v-card>
			</v-flex>
			<v-flex pa-0 xs12 sm4 md4 lg4 xl4>
				<v-card dark color="background" :height="indicatorHeight" class="indicators-item text--black">
					<v-layout :row="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
					          :column="$vuetify.breakpoint.smOnly"
					          :align-center="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
					          :align-start="$vuetify.breakpoint.smOnly" :justify-center="$vuetify.breakpoint.smAndUp"
					          :justify-start="$vuetify.breakpoint.xsOnly">
						<div class="infographic-icon">
							<img src="~assets/icons/landing/infographic_plan_green.svg" alt="">
						</div>
						<div class="infographic-text">
							<div class="infographic-count"
							     v-if="values.lots.total">{{ values.lots.total.toLocaleString('ru-RU') }}
								<div class="infographic-count-growth"
								     v-if="values.lots.new">+{{ values.lots.new.toLocaleString('ru-RU') }}
								</div>
							</div>
							<v-tooltip right>
								<div slot="activator" class="infographic-description">{{ declOfNum(values.lots.total, ['Квартира', 'Квартиры', 'Квартир']) }}
									<div class="infographic-description-icon">?</div>
								</div>
								<span>Квартиры – жилое помещение и нежилые помещения<br>(апартаменты), не относящиеся к жилому фонду, но имеющие<br>необходимые условия для проживания.<br>+ - количество квартир в корпусах, продажа которых<br>началась не более 30 дней назад</span>
							</v-tooltip>
						</div>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
    props: ['values'],
    name: "indicators",
    computed: {
      indicatorHeight() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '200px';
          case 'sm':
            return '190px';
          case 'md':
            return '150px';
          case 'lg':
            return '190px';
          case 'xl':
            return '190px';
        }
      },
    },
    methods: {
        declOfNum(number, titles) {  
            const cases = [2, 0, 1, 1, 1, 2];  
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
        }
    }
};
</script>

<style scoped>
	.indicators {
		margin-bottom: 30px;
		padding-left: 0;
		padding-right: 0;
	}

	.indicators img {
		height: 100%;
		width: 100%;
	}

	.indicators-item {
		border-radius: 8px;
		max-width: 550px;
		margin-right: 26px;
		margin-left: 26px;
		box-shadow: 0 0 70px rgba(0, 0, 0, 0.15);
	}

	.indicators .indicators-item .infographic-text {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		color: #000;
	}

	.infographic-icon {
		height: 74px;
		width: 74px;
		margin-right: 30px;
	}

	.infographic-description {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 32px;
		font-weight: 400;
	}

	.infographic-description-icon {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 34px;
		width: 34px;
		color: var(--v-primary-base);
		font-size: 24px;
		margin-left: 16px;
		line-height: 1;
		border: 2px solid var(--v-primary-base);
		border-radius: 50%;
		font-weight: bold;
	}

	.infographic-text .infographic-count {
		font-weight: bolder;
		display: flex;
		line-height: 1;
		font-size: 70px;
		color: #1C212B;
	}

	.infographic-count .infographic-count-growth {
		font-weight: bold;
		font-size: 27px;
		color: var(--v-primary-base);
		padding-top: 7px;
		margin-left: 8px;
	}

	.indicators-item > .layout {
		height: 100%;
	}

	@media screen and (max-width: 1904px) and (min-width: 960px) {
		.indicators-item {
			margin-right: 16px;
			margin-left: 16px;
		}

		.indicators .layout .flex:first-child .indicators-item {
			margin-left: 0px;
		}

		.indicators .layout .flex:last-child .indicators-item {
			margin-right: 0px;
		}

		.infographic-icon {
			height: 70px;
			width: 70px;
			margin-right: 24px;
		}

		.infographic-text .infographic-count {
			font-size: 50px;
		}

		.infographic-count .infographic-count-growth {
			font-size: 22px;
			padding-top: 4px;
		}

		.infographic-description-icon {
			height: 28px;
			width: 28px;
			font-size: 20px;
			margin-left: 10px;
		}

		.infographic-description {
			font-size: 22px;
		}
	}

	@media screen and (max-width: 1264px) and (min-width: 600px), (max-width: 340px) {
		.indicators {
			margin-bottom: 20px;
		}

		.indicators-item {
			margin-right: 8px;
			margin-left: 8px;
		}

		.infographic-icon {
			height: 58px;
			width: 58px;
			margin-right: 18px;
		}

		.infographic-text .infographic-count {
			font-size: 38px;
		}

		.infographic-count .infographic-count-growth {
			font-size: 18px;
			padding-top: 3px;
		}

		.infographic-description-icon {
			height: 22px;
			width: 22px;
			font-size: 18px;
			margin-left: 8px;
		}

		.infographic-description {
			font-size: 20px;
			line-height: 1.2;
		}
	}

	@media screen and (max-width: 960px) and (min-width: 600px) {
		.indicators .indicators-item {
			margin-right: 8px;
			margin-left: 8px;
			padding-left: 30px;
		}

		.indicators .layout .flex:first-child .indicators-item {
			margin-left: 26px;
		}

		.indicators .layout .flex:last-child .indicators-item {
			margin-right: 26px;
		}

		.infographic-icon {
			margin-right: 0px;
			margin-bottom: 12px;
			height: 54px;
			width: 54px;
		}

		.infographic-text .infographic-count {
			font-size: 30px;
		}

		.infographic-description {
			line-height: 1.4;
			font-size: 18px;
		}

		.infographic-count .infographic-count-growth {
			padding-top: 2px;
			margin-left: 4px;
			font-size: 16px;
		}

		.infographic-description-icon {
			height: 20px;
			width: 20px;
			font-size: 14px;
			margin-left: 6px;
		}
	}

	@media screen and (max-width: 600px) {
		.infographic-text .infographic-count {
			font-size: 48px;
			flex-direction: column-reverse;
			align-items: flex-start;
		}

		.infographic-count .infographic-count-growth {
			font-size: 26px;
			margin-left: 0px;
			padding-top: 0px;
		}

		.infographic-description {
			font-size: 24px;
		}

		.infographic-description-icon {
			height: 26px;
			width: 26px;
			font-size: 18px;
			margin-left: 8px;
		}

		.indicators-item {
			padding-left: 26px;
			margin-bottom: 26px;
		}

		.infographic-icon {
			margin-right: 24px;
			height: 74px;
			width: 74px;
		}
	}

	@media screen and (max-width: 360px) {
		.indicators-item {
			padding-left: 26px;
		}

		.infographic-text .infographic-count {
			font-size: 44px;
		}

		.infographic-description {
			font-size: 24px;
		}
	}
</style>