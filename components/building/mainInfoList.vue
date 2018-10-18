<template>
	<v-list class="main_info-list">
		<v-list-tile v-if="!lotInfo && listInfo.lot_type" class="list-item list-apartments">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lot_type }}</v-list-tile-title>
				<v-list-tile-sub-title>Тип лота</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo" class="list-item list-date-comission">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ isCurrentDateAfter(listInfo.in_operation_date) ? 'Сдан' : getQuarter(listInfo.in_operation_date) }}</v-list-tile-title>
				<v-list-tile-sub-title>Дата гос. комиссии</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.sales_start" class="list-item list-date-sales-start">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ getDate(listInfo.sales_start) }}</v-list-tile-title>
				<v-list-tile-sub-title>Дата старта продаж</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.lotFinishingType" class="list-item list-finishing">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lotFinishingType }}</v-list-tile-title>
				<v-list-tile-sub-title>Отделка</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.developer" class="list-item list-sales-developer">
			<v-list-tile-content>
				<v-tooltip top>
					<div slot="activator" class="list-tile-title-iconed">
						<div class="list-item-icon"></div>
						<div>
							<v-list-tile-title>{{ listInfo.developer }}</v-list-tile-title>
							<v-list-tile-sub-title>Девелопер</v-list-tile-sub-title>
						</div>
					</div>
					<span>{{ listInfo.developer }}</span>
				</v-tooltip>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.builder" class="list-item list-sales-builder">
			<v-list-tile-content>

				<v-tooltip top>
					<div slot="activator" class="list-tile-title-iconed">
						<div class="list-item-icon"></div>
						<div>
							<v-list-tile-title>{{ listInfo.builder }}</v-list-tile-title>
							<v-list-tile-sub-title>Застройщик</v-list-tile-sub-title>
						</div>
					</div>
					<span>{{ listInfo.builder }}</span>
				</v-tooltip>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.construction_stage" class="list-item list-sales-construction-stage">
			<v-list-tile-content>
				<v-tooltip top>
					<div slot="activator" class="list-tile-title-iconed">
						<div class="list-item-icon" :class="'stage-' + listInfo.construction_stage.id"></div>
						<div>
							<v-list-tile-title>{{ listInfo.construction_stage.comment }}</v-list-tile-title>
							<v-list-tile-sub-title>Стадия строительства</v-list-tile-sub-title>
						</div>
					</div>
					<span v-if="listInfo.construction_stage">{{ listInfo.construction_stage.name }} - {{ listInfo.construction_stage.comment }}</span>
				</v-tooltip>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.constructive" class="list-item list-sales-construction">
			<v-list-tile-content>
				<v-tooltip top>
					<div slot="activator" class="list-tile-title-iconed">
						<div class="list-item-icon"></div>
						<div>
							<v-list-tile-title>{{ listInfo.constructive.name }}</v-list-tile-title>
							<v-list-tile-sub-title>Конструктив</v-list-tile-sub-title>
						</div>
					</div>
					<span v-if="listInfo.constructive">{{ listInfo.constructive.name }}</span>
				</v-tooltip>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.floors_num" class="list-item list-sales-floors">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.floors_num }}</v-list-tile-title>
				<v-list-tile-sub-title>Этажность</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="!lotInfo && listInfo.realty_class" class="list-item list-sales-class">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.realty_class.name }}
				</v-list-tile-title>
				<v-list-tile-sub-title>Класс</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>

		<v-list-tile
				v-if="lotInfo && !listInfo.lot_info.is_studio && !listInfo.lot_info.is_open_plan && listInfo.lot_info.rooms !== null"
				class="list-item list-sales-rooms">
			<div class="list-item-icon" :class="'rooms-' + listInfo.lot_info.rooms"></div>
			<v-list-tile-content>
				<v-list-tile-title><span
						v-if="listInfo.lot_info.is_studio && listInfo.lot_info.rooms == null">Студия</span><span
						v-if="listInfo.lot_info.is_open_plan && listInfo.lot_info.rooms == null">Свободная планировка</span><span
						v-if="listInfo.lot_info.rooms">{{ listInfo.lot_info.rooms }}</span><span
						v-if="listInfo.lot_info.rooms !== null && listInfo.lot_info.is_studio"> (ст)</span><span
						v-if="listInfo.lot_info.rooms !== null && listInfo.lot_info.is_open_plan"> (сп)</span>
				</v-list-tile-title>
				<v-list-tile-sub-title>Комнатность</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="lotInfo" class="list-item list-sales-square">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lot_info.square.toLocaleString('ru-RU') }}</v-list-tile-title>
				<v-list-tile-sub-title>Площадь</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="lotInfo" class="list-item list-sales-budget">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lot_info.price.toLocaleString('ru-RU') }}
				</v-list-tile-title>
				<v-list-tile-sub-title>Бюджет</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="lotInfo" class="list-item list-sales-metrprice">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lot_info.price_square.toLocaleString('ru-RU') }}
				</v-list-tile-title>
				<v-list-tile-sub-title>Цена за м²</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="lotInfo" class="list-item list-sales-floors">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lot_info.floor }}</v-list-tile-title>
				<v-list-tile-sub-title>Этажность</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="lotInfo && listInfo.lot_info.kitchen_square" class="list-item list-sales-kitchen-square">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lot_info.kitchen_square }}
				</v-list-tile-title>
				<v-list-tile-sub-title>Площадь кухни</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile v-if="lotInfo && listInfo.lot_info.section" class="list-item list-sales-section">
			<div class="list-item-icon"></div>
			<v-list-tile-content>
				<v-list-tile-title>{{ listInfo.lot_info.section }}
				</v-list-tile-title>
				<v-list-tile-sub-title>Секция</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</template>

<script>
  import moment from 'moment';

  export default {
    name: "main-info-list",
    props: ['listInfo', 'lotInfo'],
    methods: {
      getQuarter(operationDate) {
        return moment(operationDate).format('Q кв Y');
      },
      isCurrentDateAfter(in_operation_date) {
        return moment().isAfter(in_operation_date);
      },
      getDate(date) {
        return moment(date).format('DD.MM.YYYY');
      },
    },
  };
</script>

<style scoped>
	.main_info-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
		justify-content: start;
		padding: 0px;
	}

	.apartment-sales-block .main_info-list {
		justify-content: space-between;
	}

	.main_info-list .list-item {
		width: 50%;
		margin-bottom: 28px;
	}

	.apartment-sales-block .list-item {
		width: auto;
	}

	@media screen and (max-width: 1904px) and (min-width: 960px) {

		.main_info-list .list-item {
			margin-bottom: 16px;
		}
	}

	@media screen and (max-width: 960px) {
		.apartment-sales-block .list-item {
			width: auto;
			min-width: 220px;
		}
	}

	@media screen and (max-width: 400px) {
		.apartment-sales-block .list-item {
			min-width: 150px;
		}

		.main_info-list {
			flex-wrap: wrap;
		}

		.main_info-list .list-item {
			margin-bottom: 16px;
		}

	}

</style>