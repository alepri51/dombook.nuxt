<template>
	<div>
		<h1 class="main_info-title">
			<div class="title-text" v-if="objectData.project_name">{{ objectData.project_name }}<br>
				<small>{{ objectData.name }}</small>
			</div>
		</h1>
		<div class="main_info-subtitle">
			<div v-if="objectData.address" class="title-address">{{ objectData.address}}</div>
			<div v-if="objectData.subwayStations" class="station-lines">
				<div v-for="(subway_station,index) in objectData.subwayStations" :key="index"
				     class="title-address station-line">
					<v-icon :color="subway_station.station.line ? subway_station.station.line.color : ''">fiber_manual_record</v-icon>
					{{ subway_station.station.name }}, {{ subway_station.time }} мин
					<div class="address-icon going-man-icon"></div>
					- {{ subway_station.distance > 500 ? (Number((subway_station.distance / 1000).toFixed(1))).toLocaleString('ru-RU') + ' км' : (Number((subway_station.distance).toFixed(1))).toLocaleString('ru-RU') + ' м'}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "objectPageHeading",
    props: ['objectData'],
  };
</script>

<style scoped>
	.main_info-block .main_info-title {
		font-size: 42px;
		line-height: 1;
		text-transform: uppercase;
		position: relative;
		font-weight: bold;
		padding-bottom: 18px;
		margin-bottom: 16px;
	}

	.main_info-block .main_info-title small {
		font-size: 22px;
		text-transform: none;
		color: #808080;
		font-weight: normal;
	}

	.main_info-block .main_info-title:after {
		content: '';
		display: block;
		height: 0px;
		width: 34px;
		position: absolute;
		bottom: 0;
		left: 0;
		border: 1px solid var(--primary-color);
	}

	.main_info-block .main_info-subtitle {
		font-size: 22px;
		font-weight: normal;
		color: #808080;
		margin-bottom: 28px;
	}

	.station-lines {
		display: flex;
		flex-direction: column;
	}

	.title-address .v-icon {
		margin-right: 0px;
	}

	.address-icon {
		height: 18px;
		width: 14px;
		background-repeat: no-repeat;
		display: inline-block;
		vertical-align: middle;
		margin-left: 4px;
		margin-top: -8px;
	}

	.title-address.station-line {
		font-size: 16px;
		margin-right: 16px;
	}

	.title-address.station-line .v-icon {
		font-size: 18px;
		vertical-align: middle;
		margin-right: 16px;
		margin-top: -4px;
	}

	@media screen and (max-width: 1904px) and (min-width: 960px) {

		.main_info-block .main_info-title {
			font-size: 34px;
			margin-top: 8px;
			padding-bottom: 18px;
			margin-bottom: 12px;
		}

		.main_info-block .main_info-title small {
			font-size: 20px;
		}

		.title-address.station-line .v-icon {
			margin-right: 2px;
		}

		.sales-block .section-title {
			font-size: 28px;
		}

		.title-address.station-line {
			font-size: 14px;
			margin-right: 0px;
		}
	}

	@media screen and (max-width: 1264px) and (min-width: 960px) {

		.main_info-block .main_info-title {
			font-size: 28px;
			padding-bottom: 16px;
			margin-bottom: 10px;
		}
	}

	@media screen and (max-width: 600px) {

		.main_info-block .main_info-title {
			font-size: 26px;
			line-height: 1.1;
		}

		.main_info-block .main_info-title small {
			font-size: 20px;
		}

		.main_info-block .main_info-subtitle {
			font-size: 16px;
		}

		.station-lines {
			margin-top: 16px;
		}

		.title-address.station-line {
			font-size: 14px;
			margin-bottom: 8px;
			margin-right: 0px;
		}

		.title-address.station-line .v-icon {
			margin-right: 0px;
		}

	}

	@media screen and (max-width: 400px) {

		.main_info-block .main_info-title {
			padding-bottom: 12px;
			margin-bottom: 10px;
		}
	}

</style>