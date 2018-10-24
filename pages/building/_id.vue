<template>
	<div class="housing_page">
		<div class="content-wrapper">
			<section class="view-action">
				<v-container>
					<v-btn round color="primary" to="/home">
						<v-icon>keyboard_arrow_left</v-icon>
						Вернуться к поиску
					</v-btn>
				</v-container>
			</section>
			<section v-if="filter && !isEmpty(filter)" class="main_info-block">
				<v-container>
					<v-layout :row="$vuetify.breakpoint.mdAndUp" :column="$vuetify.breakpoint.smAndDown" align-start>
						<v-flex class="main_info-item">
							<object-heading :objectData="headingData"></object-heading>
							<main-info-list :listInfo="infoListData" :lotInfo="false"></main-info-list>
						</v-flex>
						<v-flex class="main_info-item">
							<div class="main-info-sales-department">
								<div class="sales-department-title">
									<v-tooltip top>
										<div slot="activator">
											<div class="list-item-icon list-sales-department"></div>
											<span v-if="$vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.xsOnly">Отдел продаж:</span>
										</div>
										<span>Отдел продаж</span>
									</v-tooltip>
								</div>
                                <div v-if="!isEmpty(filter.phone) && filter.phone.schedule.length > 0 && !isEmpty(currentSchedule)"
                                     class="sales-department-shedule white--text">
									<div class="list-item-icon list-sales-department-shedule"></div>
									{{ currentSchedule.time_from }} - {{ currentSchedule.time_to }}
								</div>
								<div v-if="filter.phone" class="sales-department-phone">
									<v-btn @click="showPhone" round color="primary">
										<div class="list-item-icon list-sales-department-phone"></div>
										<span v-if="!phone">Показать телефон</span>
										<a :href="`tel:${phone}`" v-if="phone"
										   class="sales-department-phone-link">{{ phone }}</a></v-btn>
								</div>
								<div v-if="!filter.phone">Данные отсутствуют</div>
							</div>
							<div class="twice-gallery">
                                <no-ssr>
								<swiper :options="swiperOptions">
									<swiper-slide v-for="(photo, index) in galleryImages" v-if="photo"
									              :key="index">
										<img :src="photo.url" :alt="photo.photo_type.name">
										<div class="swiper-img-description">{{ photo.photo_type && photo.photo_type.name }}</div>
									</swiper-slide>
									<div class="swiper-button-prev" slot="button-prev"></div>
									<div class="swiper-button-next" slot="button-next"></div>
								</swiper>
                                </no-ssr>
							</div>
							<div class="sales-block main_info-item-sales">
								<v-layout row align-start justify-start>
									<div v-if="filter.parking_available" class="main_info-item sales-block-item">
										<div class="list-item-icon icon-parking"></div>
										<div>
											<h4 class="sales-block-item-title">Машиноместа:</h4>
											<p class="sales-block-item-text"
											   v-if="filter.parking_count > 0">в продаже - {{ filter.parking_count }}</p>
											<p class="sales-block-item-text" v-else>паркинг присутствует</p>
										</div>
									</div>
									<div v-if="filter.pantry_available" class="sales-block-item">
										<div class="list-item-icon icon-pantry"></div>
										<div>
											<h4 class="sales-block-item-title">Кладовки:</h4>
											<p class="sales-block-item-text"
											   v-if="filter.pantry_count > 0">в продаже - {{ filter.pantry_count }}</p>
											<p class="sales-block-item-text" v-else>кладовки присутствуют</p>
										</div>
									</div>
								</v-layout>
							</div>
						</v-flex>
						<!--<div class="header-buttons">-->
						<!--<v-btn round color="secondaryLighten1" class="header-button">В избранное</v-btn>-->
						<!--<v-btn round color="secondaryLighten1" class="header-button">Поделиться</v-btn>-->
						<!--</div>-->
					</v-layout>

					<v-divider></v-divider>
				</v-container>
			</section>
			<section v-if="filter && !isEmpty(filter)" class="sales-block">
				<v-container>
					<h2 class="section-title">В продаже
						<v-tooltip top>
							<div slot="activator" class="section-title-icon">?</div>
							<span>В списке представлены типы недвижимости, подходящие под Ваши фильтры</span>
						</v-tooltip>
					</h2>
					<v-layout :row="$vuetify.breakpoint.mdAndUp" :column="$vuetify.breakpoint.smAndDown" align-start
					          justify-start>
						<div class="statistics-block">
							<div v-for="(stat, key, index) in filter.statistics" class="statistics-item" :key="index">
								<v-tooltip top>
									<div slot="activator" class="statistics-item-col">
										<div class="list-item-icon" :class="'rooms-'+getRoomIconName(key)"></div>
										<div class="statistics-col-value">
											{{ stat.count }}
										</div>
									</div>
									<span> <strong>Количество {{ key }}</strong>: {{ stat.count }} шт.</span>
								</v-tooltip>
								<v-tooltip top>
									<div slot="activator" class="statistics-item-col list-sales-square">
										<div class="list-item-icon"></div>
										<div class="statistics-col-value">
											<div>
												{{ Number(stat.square.min.toFixed(1)).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }}
											</div>
											<div>
												{{ Number(stat.square.max.toFixed(1)).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }}
											</div>
										</div>
									</div>
									<span><strong>площадь:</strong> {{ Number(stat.square.min.toFixed(1)).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }} – {{ Number(stat.square.max.toFixed(1)).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }} м²</span>
								</v-tooltip>
								<v-tooltip top>
									<div slot="activator" class="statistics-item-col list-sales-metrprice">
										<div class="list-item-icon"></div>
										<div class="statistics-col-value">
											<div>
												{{ (Number((stat.price_square.min / 1000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }}
											</div>
											<div>
												{{ (Number((stat.price_square.max / 1000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 })}}
											</div>
										</div>
									</div>
									<span><strong>Цена за кв.м:</strong> {{ (Number((stat.price_square.min / 1000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }} – {{ (Number((stat.price_square.max / 1000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }} тыс./м²</span>
								</v-tooltip>
								<v-tooltip top>
									<div slot="activator" class="statistics-item-col list-sales-budget">
										<div class="list-item-icon"></div>
										<div class="statistics-col-value">
											<div>
												{{ (Number((stat.price.min / 1000000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }}
											</div>
											<div>
												{{ (Number((stat.price.max / 1000000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }}
											</div>
										</div>
									</div>
									<span><strong>Бюджет:</strong> {{ (Number((stat.price.min / 1000000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 }) }} – {{ (Number((stat.price.max / 1000000).toFixed(1))).toLocaleString('ru-RU', { minimumFractionDigits: 1 })  }} млн.</span>
								</v-tooltip>
							</div>
						</div>
						<div v-if="!isEmpty(filter.finishings)" class="sales-block-item finishing">
							<div class="list-item-icon icon-decoration"></div>
							<div>
								<h4 class="sales-block-item-title">{{ filter.finishings.length > 1 ? 'Варианты отделки' : 'Отделка' }}:</h4>
								<p v-for="(finishing, index) in finishings" class="sales-block-item-text"
								   :key="index">{{ finishing.name }}</p>
							</div>
						</div>
						<div class="sales-block-item item-sales">
							<div class="list-item-icon icon-sales"></div>
							<div>
								<h4 class="sales-block-item-title">Скидки:</h4>
								<p class="sales-block-item-text">{{ filter.discounts }}</p>
							</div>
						</div>
					</v-layout>
				</v-container>
			</section>
			<section v-if="filter && !isEmpty(filter)" class="housing_page-tabs-content">
				<v-container pl-0 pr-0>
					<div>
						<v-tabs v-model="activeTab" color="background" show-arrows slider-color="primary">
							<v-tab v-if="filter.lots && filter.lots.length > 0" ripple key="1">
								Квартиры в продаже
							</v-tab>
							<v-tab v-if="filter.project_description" ripple key="3">
								Подробная информация
							</v-tab>
							<v-tabs-items v-model="activeTab" :touchless=true>
								<v-tab-item v-if="filter.lots && filter.lots.length > 0" :key="1">
									<v-card tag="article" class="tab">
										<v-card-title>
											<v-tooltip top>
												<h1 slot="activator" class="tab-title">Квартиры в продаже
													<div class="tab-title-icon">?</div>
												</h1>
												<span>В списке представлены типы недвижимости, подходящие под Ваши фильтры</span>
											</v-tooltip>
											<small v-if="filter.analytics.date"
											       class="tab-subtitle">последняя дата обновления - {{ getDate(filter.analytics.date) }}
											</small>
										</v-card-title>

										<div class="custom-table">
											<v-data-table v-if="lots" :headers="table.headers" :items="lots"
											              :search="table.search" :pagination.sync="table.pagination"
											              hide-actions>
												<template slot="headerCell" slot-scope="props">
													<v-tooltip bottom>
                                                <span slot="activator">
                                                    {{ props.header.text }}
                                                </span>
														<span>
                                                    {{ props.header.text }}
                                                </span>
													</v-tooltip>
												</template>
												<template slot="items" slot-scope="props">
													<tr @click="goToCard(props.item.id)">
														<td class="text-xs-center">{{ props.item.section !== '' ? props.item.section : '-'}}</td>
														<td class="text-xs-center">{{ props.item.floor }}</td>
														<td class="text-xs-center"><span
																v-if="props.item.rooms && props.item.rooms !== void 0">{{ props.item.rooms }} </span><span
																v-if="props.item.is_studio">(ст)</span><span
																v-if="props.item.is_open_plan">(сп)</span></td>
														<td class="text-xs-center">{{ props.item.square !== null ? props.item.square.toLocaleString('ru-RU') : '-' }} m<sup>2</sup>
														</td>
														<td class="text-xs-center">{{ props.item.price_square !== null ? props.item.price_square.toLocaleString('ru-RU') : '-' }} &#8381;</td>
														<td class="text-xs-center">{{ props.item.price !== null ? props.item.price.toLocaleString('ru-RU') : '-' }} &#8381;</td>
														<td class="text-xs-center" v-if="$vuetify.breakpoint.smAndUp">
															<v-btn @click="goToCard(props.item.id)"
															       class="sales-list-btn" round
															       color="primary">Подробнее
															</v-btn>
														</td>
													</tr>
												</template>
											</v-data-table>
											<div class="text-xs-center pt-2">
												<v-pagination v-model="table.pagination.page" total-visible="5"
												              :length="pages"
												              circle></v-pagination>
											</div>
										</div>

									</v-card>
								</v-tab-item>

								<v-tab-item v-if="filter.project_description" :key="3">
									<v-card tag="article" class="tab">
										<v-card-title>
											<h1 class="tab-title without-icon">Подробная информация</h1>
										</v-card-title>
										<v-layout column align-center tag="article" class="project-description">
											<p v-if="buildingDescription"
											   v-for="(description, index) in buildingDescription" :key="index"
											   class="description-item">{{ description }}</p>
										</v-layout>
									</v-card>
								</v-tab-item>
							</v-tabs-items>

						</v-tabs>
					</div>
				</v-container>
			</section>
		</div>
    </div>
</template>

<script>
  //import Layout from '../components/class_layout';
  import moment from 'moment';
  import isEmpty from 'lodash/isEmpty';
  import 'swiper/dist/css/swiper.css';
  //import { swiper, swiperSlide } from 'vue-awesome-swiper';
  //import sw from 'vue-awesome-swiper';
  import find from 'lodash/find';
  import forEach from 'lodash/forEach';
  import PhoneNumber from 'awesome-phonenumber';

  export default {
    validate({ params }) {
        return !isNaN(+params.id);
    },
    components: {
      mainInfoList: () => import('~/components/building/mainInfoList'),
      objectHeading: () => import('~/components/building/objectPageHeading'),
      swiper: () => import('~/node_modules/vue-awesome-swiper/src/swiper'),
      swiperSlide: () => import('~/node_modules/vue-awesome-swiper/src/slide')
      //swiper,
      //swiperSlide,
    },
    query: {
        merge: (data, params) => ({
            entities: data.entities
        })
    },
    //extends: Layout,
    data() {
      return {
        activeTab: null,
        phone: null,
        table: {
          search: '',
          pagination: {
            rowsPerPage: 8,
            page: 1,
          },
          selected: [],
          headers: [
            {
              text: 'Секция',
              align: 'center',
              value: 'section',
            },
            {
              text: 'Этаж',
              align: 'center',
              value: 'floor',
            },
            {
              text: 'Комнатность',
              align: 'center',
              value: 'lotType',
            },
            {
              text: 'Площадь',
              align: 'center',
              value: 'square',
            },
            {
              text: 'Цена за м²',
              align: 'center',
              value: 'metrPrice',
            },
            {
              text: 'Бюджет покупки',
              align: 'center',
              value: 'budget',
            },
            {
              text: '',
              align: 'center',
              sortable: false,
              value: 'actions',
            },
          ],
        },
        swiperOptions: {
          slidesPerView: this.$vuetify.breakpoint.smAndUp ? 2 : 1,
          spaceBetween: 0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      }
    },
    computed: {
      filter() {
          //debugger
        return (this.entities.buildingDetails && this.entities.buildingDetails[this.$route.params.id]) || {};
      },
      finishings() {
          let finishings = this.filter.finishings;
          return finishings.map(id => this.entities.finishing[id]);
      },
      subwayStations() {
          //debugger
        let stations = this.filter.subway_stations;
        return stations.map(id => this.entities.subway_station[id]);
      },
      lots() {
          //debugger
        let lots = this.filter.lots;
        return lots.map(id => this.entities.lot[id]);
      },
      pages() {
        if (this.table.pagination.rowsPerPage == null ||
          this.table.pagination.totalItems == null
        ) return 0;

        return Math.ceil(this.table.pagination.totalItems / this.table.pagination.rowsPerPage);
      },
      currentSchedule() {
          let currentDay = moment().day() !== 0 ? moment().day() : 7;

        let currentSсhedule = find(this.filter.phone.schedule, (o) => {
            return o.weekday == currentDay;
        });

          return this.filter.phone.schedule.length > 0 && currentSсhedule !== undefined ? {
          time_from: moment(currentSсhedule.time_from, 'HH:mm:ss').format("H:mm"),
          time_to: moment(currentSсhedule.time_to, 'HH:mm:ss').format("H:mm"),
        } : {};
      },
      galleryImages() {
        let arr = [];
        forEach(this.filter.primary_photos, (photo) => {
          arr.push(photo);
        });
        arr.push({
          url: 'https://static-maps.yandex.ru/1.x/?size=434,310&l=map&z=13&pt=' + this.filter.location.coordinates[1] + ',' + this.filter.location.coordinates[0] + ',home',
          photo_type: {
            name: 'карта',
          },
        });
        return arr;
      },
      buildingDescription() {
        return this.filter.project_description.split('\n');
      },
      infoListData() {
        let info = {
          in_operation_date: this.filter.in_operation_date ? this.filter.in_operation_date : void 0,
          sales_start: this.filter.sales_start ? this.filter.sales_start : void 0,
          developer: this.filter.developer ? this.filter.developer.name : void 0,
          builder: this.filter.builder ? this.filter.builder.name : void 0,
          construction_stage: this.filter.construction_stage ? this.filter.construction_stage : void 0,
          constructive: this.filter.constructive ? this.filter.constructive : void 0,
          floors_num: this.filter.floors_num ? this.filter.floors_num : void 0,
          realty_class: this.filter.realty_class ? this.filter.realty_class : void 0,
        };

        if (this.filter.construction_stage_comment) info.construction_stage.comment = this.filter.construction_stage_comment;

        return info;
      },
      headingData() {
        return {
          project_name: this.filter.project_name ? this.filter.project_name : void 0,
          name: this.filter.name ? this.filter.name : void 0,
          address: this.filter.address ? this.filter.address : void 0,
          subwayStations: this.subwayStations,
        };
      },
    },
    methods: {
      execute(...args) {
        //debugger;
        let { ...rest } = args[0];
        if(this.entities.buildingDetails && this.entities.buildingDetails[this.route.id]) return;
        rest.method = 'post';
        return this.$store._actions.execute[0]({ ...rest });
      },
      async showPhone() {
        // this.sendMetrics();
        let {data} = await this.$store.dispatch('execute', {
          method: 'POST', endpoint: 'phone', payload: {
            buildingId: this.filter._id
          }
        });

        if (data.success) {
          let pn = new PhoneNumber(data.phone, 'RU');
          this.phone = pn.getNumber('international');
        } else {
          this.phone = 'Нет данных';
        }
      },
      // sendMetrics() {
      //   yaCounter41520226.reachGoal('GetPhone');
      //   return true;
      // },
      getDate(date) {
        return moment(date).format('DD.MM.YYYY');
      },
      isEmpty(building) {
        return isEmpty(building);
      },
      getRoomIconName(name) {
        switch (name.toLowerCase().trim()) {
          case '1-комн':
          case '2-комн':
          case '3-комн':
          case '4-комн':
            return name.replace(/\D/g, '');
          case 'сп 1-комн':
          case 'сп 2-комн':
          case 'сп 3-комн':
          case 'сп 4-комн':
          case 'сп':
            return 'sp';
          case 'студия 1-комн':
          case 'студия 2-комн':
          case 'студия 3-комн':
          case 'студия 4-комн':
          case 'ст':
            return 'st';
          case 'помещение':
            return 'p';
        }
      },
      goToCard(id) {
        this.$router.push(`/lot/${id}`);
      },
    },
  }
</script>

<style>
	/*.main-info-statuses .main-info-status {*/
	/*padding: 16px 32px;*/
	/*font-size: 14px;*/
	/*}*/

	/*.main-info-statuses .main-info-status:first-child {*/
	/*border-top-left-radius: 8px;*/
	/*border-bottom-left-radius: 8px;*/
	/*background: #2E2E2E;*/
	/*}*/

	/*.main-info-statuses .main-info-status:last-child {*/
	/*border-top-right-radius: 8px;*/
	/*border-bottom-right-radius: 8px;*/
	/*background: #A9C833;*/
	/*}*/


</style>
