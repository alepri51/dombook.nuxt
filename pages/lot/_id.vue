<template>
	<div class="lot_page">
		<div class="content-wrapper">
			<section v-if="building" class="view-action">
				<v-container>
					<v-btn round color="primary" @click="goToBuilding(building.id)">
						<v-icon>keyboard_arrow_left</v-icon>
						Вернуться к корпусу
					</v-btn>
				</v-container>
			</section>
			<section v-if="lot && !isEmpty(lot) && building &&  !isEmpty(building)" class="main_info-block">
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
								<div v-if="!isEmpty(building.phone) && building.phone.schedule.length > 0 && !isEmpty(currentSchedule)"
									 class="sales-department-shedule white--text">
									<div class="list-item-icon list-sales-department-shedule"></div>
									{{ currentSchedule.time_from }} - {{ currentSchedule.time_to }}
								</div>
								<div v-if="building.phone" class="sales-department-phone">
                                    <v-btn @click="showPhone" round color="primary">
										<div class="list-item-icon list-sales-department-phone"></div>
                                        <span v-if="!phone">Показать телефон</span>
                                        <a :href="`tel:${phone}`" v-if="phone"
                                           class="sales-department-phone-link">{{ phone }}</a></v-btn>
								</div>
								<div v-if="!building.phone">Данные отсутствуют</div>
							</div>
							<div class="twice-gallery">
                                <no-ssr>
								<swiper v-if="!isEmpty(galleryImages)" :options="swiperOptions">
									<swiper-slide v-for="(photo, index) in galleryImages" v-if="photo" :key="index">
										<img :src="photo.url" :alt="photo.photo_type && photo.photo_type.name">
										<div class="swiper-img-description">{{ photo.photo_type && photo.photo_type.name }}</div>
									</swiper-slide>
									<div class="swiper-button-prev" slot="button-prev"></div>
									<div class="swiper-button-next" slot="button-next"></div>
								</swiper>
                                </no-ssr>
							</div>
						</v-flex>
					</v-layout>

				</v-container>
			</section>
			<section v-if="lot && !isEmpty(lot)" class="sales-block apartment-sales-block">
				<v-container>
					<main-info-list :listInfo="infoListData" :lotInfo="true"></main-info-list>
				</v-container>
			</section>

			<section v-if="building && !isEmpty(building)" class="housing_page-tabs-content">
				<v-container pl-0 pr-0>
					<div>
						<v-tabs v-model="activeTab" color="background" show-arrows slider-color="primary">
							<v-tab v-if="building.project_description" ripple key="4">
								Подробная информация
							</v-tab>
							<v-tab v-if="building.lots && building.lots.length > 0" ripple key="5">
								Другие квартиры в этом корпусе
							</v-tab>

							<v-tabs-items v-model="activeTab" :touchless=true>

								<v-tab-item v-if="building.project_description" :key="4">
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

								<v-tab-item v-if="buildingLots && buildingLots.length > 0" :key="5">
									<v-card tag="article" class="tab">
										<v-card-title>
											<h1 class="tab-title">Другие квартиры в этом корпусе</h1>
											<small v-if="building.analytics.date"
											       class="tab-subtitle">последняя дата обновления - {{ getDate(building.analytics.date) }}
											</small>
										</v-card-title>

										<div class="custom-table">
											<v-data-table v-if="buildingLots" :headers="table.headers"
											              :items="buildingLots" :search="table.search"
											              :pagination.sync="table.pagination" no-data-text="Нет данных"
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
							</v-tabs-items>

						</v-tabs>
					</div>
				</v-container>
			</section>
		</div>
	</div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  //import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import moment from 'moment';
  import isEmpty from 'lodash/isEmpty';
  import forEach from 'lodash/forEach';
  import find from 'lodash/find';
  import PhoneNumber from 'awesome-phonenumber';

  export default {
    validate({ params }) {
        return !isNaN(+params.id);
    },
    query: {
        merge: (data, params) => ({
            entities: data.entities
        })
    },
    data() {
      return {
        activeTab: null,
          phone: null,
        swiperOptions: {
          slidesPerView: this.$vuetify.breakpoint.smAndUp ? 2 : 1,
          spaceBetween: 0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        table: {
          search: '',
          pagination: {
            rowsPerPage: 7,
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
      };
    },
    components: {
      mainInfoList: () => import('~/components/building/mainInfoList'),
      objectHeading: () => import('~/components/building/objectPageHeading'),
      swiper: () => import('~/node_modules/vue-awesome-swiper/src/swiper'),
      swiperSlide: () => import('~/node_modules/vue-awesome-swiper/src/slide')
    },
    computed: {
      lot() {
        let lot = (this.entities.lot && this.entities.lot[this.$route.params.id]);
        //console.log(lot);
        return lot || {}
      },
      building() {
          //debugger
        let building = this.lot && this.entities.buildingDetails && Object.values(this.entities.buildingDetails).find(building => this.lot.building === building._id);
        return building || {};
      },
      subwayStations() {
          //debugger
        let stations = this.building.subway_stations;
        return stations.map(id => this.entities.subway_station[id]);
      },
      lotType() {
        return this.entities.lookup[this.lot.lot_type].text;
      },
      lotFinishingType() {
        return this.entities.lookup[this.lot.lot_finishing_type].text;
      },
      galleryImages() {
        let arr = [];
        forEach(this.lot.planing_photos, (photo) => {
          !photo.photo_type && (photo.photo_type = {
            name: 'планировка'
          });
          arr.push(photo);
        });
        forEach(this.building.primary_photos, (photo) => {
          arr.push(photo);
        });
        arr.push({
          url: 'https://static-maps.yandex.ru/1.x/?size=434,310&l=map&z=13&pt=' + this.building.location.coordinates[1] + ',' + this.building.location.coordinates[0] + ',home',
          photo_type: {
            name: 'карта',
          },
        });
        return arr;
      },
      currentSchedule() {
          let currentDay = moment().day() !== 0 ? moment().day() : 7;
        let currentSсhedule = find(this.building.phone.schedule, function (o) {
            return o.weekday == currentDay !== 0 ? currentDay : 7;
        });

          return this.building.phone.schedule.length !== 0 && currentSсhedule !== undefined ? {
          time_from: moment(currentSсhedule.time_from, 'HH:mm:ss').format("H:mm"),
          time_to: moment(currentSсhedule.time_to, 'HH:mm:ss').format("H:mm"),
        } : {};
      },
      pages() {
        if (this.table.pagination.rowsPerPage == null ||
          this.table.pagination.totalItems == null
        ) return 0;

        return Math.ceil(this.table.pagination.totalItems / this.table.pagination.rowsPerPage);
      },
      buildingLots() {
        return this.building.lots.map(id => this.entities.lot[id]).filter(lot => this.lot.id !== lot.id);
      },
      buildingDescription() {
        let stringsArray = this.building.project_description.split('\n');
        return stringsArray;
      },
      infoListData() {
        return {
          lot_type: this.lot.lot_type !== null ? this.lotType : 'Неизвестен',
          in_operation_date: this.building.in_operation_date ? this.building.in_operation_date : void 0,
          sales_start: this.building.sales_start ? this.building.sales_start : void 0,
          lotFinishingType: this.lotFinishingType ? this.lotFinishingType : void 0,
          lot_info: {
            is_studio: this.lot.is_studio,
            is_open_plan: this.lot.is_open_plan,
            rooms: this.lot.rooms,
            square: this.lot.square,
            price: this.lot.price,
            price_square: this.lot.price_square,
            floor: this.lot.floor,
            kitchen_square: this.lot.kitchen_square ? this.lot.kitchen_square : void 0,
            section: this.lot.section,
          },
        };
      },
      headingData() {
        return {
          project_name: this.building.project_name ? this.building.project_name : void 0,
          name: this.building.name ? this.building.name : void 0,
          address: this.building.address ? this.building.address : void 0,
          subwayStations: this.subwayStations,
        };
      },
    },
    methods: {
        async showPhone() {
            debugger
            let { data } = await this.$axios.post('https://api.dombook.ru/api/phone', {
                buildingId: this.building._id
            });

            if (data.success) {
                let pn = new PhoneNumber(data.phone, 'RU');
                this.phone = pn.getNumber('international');
            } else {
                this.phone = 'Нет данных';
            }
        },
      getDate(date) {
        return moment(date).format('DD.MM.YYYY');
      },
      isEmpty(object) {
        return isEmpty(object);
      },
      goToCard(id) {
        this.$router.push(`/lot/${id}`);
        this.scrollTop();
      },
      goToBuilding(id) {
        this.$router.push(`/building/${id}`);
      },
      scrollTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
    },
  };
</script>
<style>
	.lot_page .v-tabs__bar .v-tabs__div {
		max-width: 600px;
	}
</style>