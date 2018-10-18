<template>
	<v-card tag="article" dark color="background" class="excerpt-item">
		<v-img @click="goToBuilding(card.id)" class="white--text" :height="imageHeight"
		       :src="card.building_photos[0].url">
			<div class="excerpt-banner">
				<div class="excerpt-banner-item background--dark-grey">
					<div class="banner-item-main">{{ isCurrentDateAfter(card.in_operation_date) ? 'Сдан' : getQuarter(card.in_operation_date) }}</div>
					<div class="banner-item-sub" v-if="!isCurrentDateAfter(card.in_operation_date)">дата сдачи</div>
				</div>
				<div class="excerpt-banner-item background--primary">
					<div class="banner-item-main">{{ daysInSale(card.sales_start)}} {{ declOfNum(daysInSale(card.sales_start), ['День','Дня', 'Дней'])}}</div>
					<div class="banner-item-sub">в продаже</div>
				</div>
			</div>
		</v-img>
		<v-card-title @click="goToBuilding(card.id)">
			<h1 class="excerpt-title" :title="card.project_name">{{ card.project_name }}</h1>
			<div class="excerpt-subtitle">{{ card.name }}</div>
		</v-card-title>
		<v-card-text @click="goToBuilding(card.id)" class="excerpt-description">
			<v-layout column align-start justify-start>
				<div class="description-item">
					<div class="description-item-icon icon-ruble"></div>
					<div class="description-item-text">от
						<strong>{{ (Number((card.price.min / 1000000).toFixed(1))).toLocaleString('ru-RU') }}</strong> млн до
						<strong>{{ (Number((card.price.max / 1000000).toFixed(1))).toLocaleString('ru-RU') }}</strong> млн
					</div>
				</div>
				<div class="description-item">
					<div class="description-item-icon icon-square"></div>
					<div class="description-item-text">от <strong
							v-if="card.square.min">{{ card.square.min.toLocaleString('ru-RU') }}</strong> м<sup>2</sup> до
						<strong v-if="card.square.max">{{ card.square.max.toLocaleString('ru-RU') }}</strong> м<sup>2</sup>
					</div>
				</div>
				<div class="description-item">
					<div class="description-item-icon icon-plan"></div>
					<div class="description-item-text"><span
							v-if="card.count.lot_1 && card.count.lot_1 !== 0"><strong>{{ card.count.lot_1 }}</strong> - 1к</span><span
							v-if="card.count.lot_2 && card.count.lot_2 !== 0"><strong>{{ card.count.lot_2 }}</strong> - 2к</span>
						<span v-if="card.count.lot_3 && card.count.lot_3 !== 0"><strong>{{ card.count.lot_3 }}</strong> - 3к</span><span
								v-if="card.count.lot_4 && card.count.lot_4 !== 0"><strong>{{ card.count.lot_4 }}</strong> - 4+к</span>
						<span v-if="card.count.lot_st && card.count.lot_st !== 0"><strong>{{ card.count.lot_st }}</strong> - ст</span><span
								v-if="card.count.lot_sp && card.count.lot_sp !== 0"><strong>{{ card.count.lot_sp }}</strong> - сп</span>
					</div>
				</div>
			</v-layout>
		</v-card-text>
	</v-card>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['card'],
    name: "buildingCard",
    computed: {
      imageHeight() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '250px';
          case 'sm':
            return '300px';
          case 'md':
            return '300px';
          case 'lg':
            return '270px';
          case 'xl':
            return '285px';
        }
      },
    },
    methods: {
      daysInSale(salesStart) {
        return moment().diff(salesStart, 'days');
      },
      getQuarter(operationDate) {
        return moment(operationDate).format('Q кв Y');
      },
      declOfNum(number, titles) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
      },
      isCurrentDateAfter(in_operation_date) {
        return moment().isAfter(in_operation_date);
      },
      goToBuilding(id) {
        this.$router.push(`building/${id}`);
      },
    },
  };
</script>

<style scoped>
	.excerpt-item {
		border-radius: 8px;
		margin-left: 16px;
		margin-right: 16px;
		width: 400px;
		cursor: pointer;
		box-shadow: 0 0 70px rgba(0, 0, 0, 0.15);
	}

	.excerpt-item .v-card__title {
		padding: 30px 40px 0;
	}

	.excerpt-item .v-card__text {
		padding: 0 15px 30px 40px;
	}

	.excerpt-title {
		text-transform: uppercase;
		position: relative;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1;
		text-align: left;
		padding-bottom: 20px;
		margin-bottom: 20px;
		font-size: 22px;
		color: #000;
	}

	.excerpt-title:after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 38px;
		height: 0;
		border: 1px solid var(--v-primary-base);
	}

	.excerpt-subtitle {
		font-weight: normal;
		text-align: left;
		font-size: 22px;
		color: #4A4A4A;
		display: flex;
		width: 100%;
		margin-bottom: 24px;
		line-height: 1;
	}

	.excerpt-description {
		color: #000;
	}

	.description-item {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}

	.description-item:not(:last-child) {
		margin-bottom: 18px;
	}

	.description-item .description-item-text {
		font-size: 20px;
		text-align: left;
		line-height: 1;
		font-weight: 400;
	}

	.description-item:last-child .description-item-text {
		font-size: 14px;
	}

	.description-item-text span:not(:last-child):after {
		content: '/';
		margin-left: 6px;
		margin-right: 6px;
	}

	.description-item .description-item-icon {
		height: 25px;
		width: 25px;
		background-size: contain;
		margin-right: 18px;
	}

	.description-item-icon.icon-ruble {
		background: url('~assets/icons/landing/icon_ruble_green.svg') center center no-repeat;
	}

	.description-item-icon.icon-square {
		background: url('~assets/icons/landing/icon_metr_green.svg') center center no-repeat;
	}

	.description-item-icon.icon-plan {
		background: url('~assets/icons/landing/icon_plan_green.svg') center center no-repeat;
	}

	.excerpt-banner {
		color: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: stretch;
	}

	.excerpt-banner-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 133px;
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.excerpt-banner-item:last-child:not(:nth-child(3)) {
		border-top-right-radius: 8px;
	}

	.excerpt-banner-item .banner-item-main {
		font-size: 22px;
		line-height: 1;
		font-weight: bold;
	}

	.excerpt-banner-item .banner-item-sub {
		font-size: 16px;
		line-height: 1.3;
		font-weight: normal;
	}

	@media screen and (max-width: 1904px) and (min-width: 1264px) {
		.excerpt-item {
			margin-right: 8px;
			margin-left: 8px;
			width: 380px;
		}

		.excerpt .layout .excerpt-item:first-child {
			margin-left: 0px;
		}

		.excerpt .layout .excerpt-item:last-child {
			margin-right: 0px;
		}

		.excerpt-banner-item:first-child {
			padding-left: 30px;
		}

		.excerpt-banner-item {
			padding-left: 20px;
			min-width: 126px;
		}

		.excerpt-banner-item .banner-item-main {
			font-size: 20px;
		}

		.excerpt-banner-item .banner-item-sub {
			font-size: 14px;
			line-height: 1.4;
		}

		.excerpt-item .v-card__title {
			padding: 20px 30px 0;
		}

		.excerpt-item .v-card__text {
			padding: 0 34px 30px;
		}

		.excerpt-title {
			padding-bottom: 15px;
			margin-bottom: 15px;
			font-size: 20px;
		}

		.excerpt-subtitle {
			font-size: 20px;
			margin-bottom: 20px;
		}

		.description-item:not(:last-child) {
			margin-bottom: 14px;
		}

		.description-item .description-item-icon {
			height: 23px;
			width: 23px;
			margin-right: 15px;
		}

		.description-item .description-item-text {
			font-size: 16px;
		}
	}

	@media screen and (max-width: 1264px) {

		.excerpt .section-heading {
			margin-bottom: 48px;
			font-size: 38px;
		}

		.excerpt-item {
			width: 420px;
			margin-bottom: 30px;
		}

		.description-item .description-item-icon {
			margin-right: 15px;
		}
	}

	@media screen and (max-width: 960px) {
		.excerpt .section-heading {
			margin-bottom: 38px;
			font-size: 32px;
		}
	}

	@media screen and (max-width: 600px) {
		.excerpt-item {
			margin-right: 8px;
			margin-left: 8px;
			width: 350px;
		}

		.excerpt-item .v-card__title {
			padding: 20px 20px 0;
		}

		.excerpt-item .v-card__text {
			padding: 0 25px 20px;
		}

		.excerpt-banner-item {
			padding-left: 15px;
		}

		.excerpt-banner-item:first-child {
			padding-left: 20px;
		}

		.excerpt-banner-item {
			width: 136px;
			min-width: 136.5px;
		}

		.excerpt-banner-item .banner-item-main {
			font-size: 18px;
		}

		.excerpt-banner-item .banner-item-sub {
			font-size: 14px;
			line-height: 1.4;
		}

		.excerpt-title {
			padding-bottom: 15px;
			margin-bottom: 15px;
			font-size: 20px;
		}

		.excerpt-subtitle {
			font-size: 20px;
			margin-bottom: 20px;
		}

		.description-item:not(:last-child) {
			margin-bottom: 14px;
		}

		.description-item .description-item-icon {
			height: 22px;
			width: 22px;
			margin-right: 8px;
		}

		.description-item .description-item-text {
			font-size: 14px;
		}
	}

	@media screen and (max-width: 340px) {
		.excerpt-item {
			width: 300px;
		}

		.excerpt-item .v-card__text {
			padding: 0 18px 16px;
		}

		.excerpt-item .v-card__title {
			padding: 16px 16px 0;
		}

		.excerpt-banner-item:first-child {
			padding-left: 16px;
		}

		.excerpt-banner-item {
			width: 100px;
			min-width: 100px;
		}

		.excerpt-banner-item .banner-item-main {
			font-size: 18px;
		}

		.excerpt-banner-item .banner-item-sub {
			font-size: 12px;
		}

		.description-item .description-item-icon {
			height: 18px;
			width: 18px;
		}

		.description-item:last-child .description-item-text {
			font-size: 12px;
		}
	}
</style>