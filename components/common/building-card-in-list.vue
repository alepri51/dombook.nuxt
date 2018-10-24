<template>
  <article @click="onBuildingClick">
    <div class="left">
      <div class="building-image" :style="{ 'background-image': `url(${activeImageUrl})` }">
        <!--<span class="arrow left">-->
        <!--<i aria-hidden="true" class="v-icon material-icons">chevron_left</i>-->
        <!--</span>-->
        <!--<span class="arrow right">-->
        <!--<i aria-hidden="true" class="v-icon material-icons">chevron_right</i>-->
        <!--</span>-->
        <ul class="dots">
          <li v-for="(photo, index) in b.primary_photos"
              :key="index" @mouseover="indexOfActiveImage = index"
              :class="{ active: index === indexOfActiveImage}">
          </li>
        </ul>
      </div>
      <div class="footer white--text">
        <div class="banner banner-with-icon background--dark-grey">
          <v-tooltip v-if="b.construction_stage" top>
            <div slot="activator" :class="'stage-' + b.construction_stage.id" class="icon"></div>
            <!--<img slot="activator" :src="iconSrcOfStage" alt="" class="icon">-->
            <span>{{ b.construction_stage.name }}</span>
          </v-tooltip>
          <div>
            <div class="main"> {{ isHandedOver ? 'Сдан' : 'Будет сдан' }} </div>
            <div class="sub"> {{ handOverPrettyDate }} </div>
          </div>
        </div>
        <div class="banner background--primary">
          <div class="main"> Продаётся </div>
          <div class="sub" v-if="b.sales_start"> {{ salesStartPrettyPeriod }} </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="building-name mb-2"> {{ b.project_name }} </div>
      <div class="address mb-0"> {{ b.name }} </div>
      <div class="subway" v-if="b.subway_station">
        <v-icon :color="b.subway_station.station.line ? b.subway_station.station.line.color : ''">fiber_manual_record</v-icon>
        {{ b.subway_station.station.name }}, {{ b.subway_station.time }} мин
        <div class="address-icon going-man-icon"></div>
        - {{ b.subway_station.distance > 500 ? (Number((b.subway_station.distance / 1000).toFixed(1))).toLocaleString('ru-RU') + ' км' : (Number((b.subway_station.distance).toFixed(1))).toLocaleString('ru-RU') + ' м'}}
      </div>
      <table class="floats">
        <tr v-for="(float, type) in floats" :key="type">
          <td>
            <v-tooltip top :open-delay="tooltips.delay">
              <div class="d-inline-flex align-center" slot="activator">
                <img class="icon" :src="getRoomIconSrc(type)"> <strong>{{ float.count }}</strong>
              </div>
              <span> <strong>{{ type }}</strong>: {{ float.count }}  </span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip top :open-delay="tooltips.delay">
              <div class="d-inline-flex align-center" slot="activator">
                <img class="icon" src="/icons/icon_metr_inverse_green.svg">
                <div class="range">
                  <span>{{ getPrettyFloat(float.square.min) }}</span>
                  <span>{{ getPrettyFloat(float.square.max) }}</span>
                </div>
              </div>
              <span><strong>площадь</strong> {{ float.square.min }} – {{ float.square.max }} м²</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip top :open-delay="tooltips.delay">
              <div class="d-inline-flex align-center" slot="activator">
                <img class="icon" src="/icons/icon_metrprice_inverse_green.svg">
                <div class="range">
                  <span>{{ getPrettySquarePrice(float.price_square.min) }}</span>
                  <span>{{ getPrettySquarePrice(float.price_square.max) }}</span>
                </div>
              </div>
              <span>
                {{ getPrettySquarePrice(float.price_square.min) }} –
                {{ getPrettySquarePrice(float.price_square.max) }}
                <strong>тыс./м²</strong>
              </span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip top :open-delay="tooltips.delay">
              <div class="d-inline-flex align-center" slot="activator">
                <img class="icon" src="/icons/icon_budget_inverse_green.svg">
                <div class="range">
                  <span>{{ getPrettyTotalPrice(float.price.min) }}</span>
                  <span>{{ getPrettyTotalPrice(float.price.max) }}</span>
                </div>
              </div>
              <span>
                {{ getPrettyTotalPrice(float.price.min) }} –
                {{ getPrettyTotalPrice(float.price.max) }}
                <strong>млн.</strong>
              </span>
            </v-tooltip>
          </td>
        </tr>
      </table>
    </div>
  </article>
</template>

<script>
  import moment from 'moment';

  export default {
      name: "buildingCardInList",
      props: {
          building: {
              type: Object,
              required: false
          },
          filters: {
              type: Object,
              default: function() {
                  return {}
              },
              //required: true
          }
      },
      data() {
          return {
              tooltips: {
                  delay: 500
              },
              indexOfActiveImage: 0
          }
      },
      computed: {
          floats() {
              return this.b.statistics;//['Все']
          },
          activeImageUrl() {
              return (this.building && this.building.primary_photos) ? (this.building.primary_photos[this.indexOfActiveImage]) : '';
          },
          isHandedOver() {
              return moment(this.b.in_operation_date).isBefore(moment());
          },
          handOverPrettyDate() {
              const date = moment(this.b.in_operation_date);
              return date.format('Q [кв.] YYYY');
          },
          salesStartPrettyPeriod() {
              const duration = moment.duration(moment().diff(moment(this.b.sales_start)));

              const period = [
                  {
                      titles: [ 'год', 'года', 'лет' ],
                      value: duration.asYears()
                  }, {
                      titles: [ 'месяц', 'месяца', 'месяцев' ],
                      value: duration.asMonths()
                  }, {
                      titles: [ 'неделю', 'недели', 'неделей' ],
                      value: duration.asWeeks()
                  }, {
                      titles: [ 'день', 'дня', 'дней' ],
                      value: duration.asDays()
                  },
              ].find(p => p.value >= 2);

              const roundedValue = Math.floor(period.value);

              return `${roundedValue} ${this.declOfNum(roundedValue, period.titles)}`;
          },
          b() {
              return this.building || [];
          }
      },
      methods: {
          async onBuildingClick() {
              console.log(this.filters);

            await this.$store.dispatch('execute', {
                endpoint: `/building/${this.building.id}`,
                method: 'post',
                payload: this.filters,
                cache: true,
            });

              this.$router.push(`/building/${this.building.id}`);
          },
          getPrettyFloat(val) {
              return (parseFloat(val).toFixed(1) + '').replace(/\./g, ',')
          },
          getPrettyTotalPrice(val) {
              return this.getPrettyFloat(Math.floor(val / 100000) / 10)
          },
          getPrettySquarePrice(val) {
              return this.getPrettyFloat(Math.floor(val / 100) / 10)
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
                case 'студия':
                  case 'ст':
                      return 'st';
                case 'помещение':
                  return '1';
              }
          },
          getRoomIconSrc(name) {
              return `~assets/icons/icon_rooms_${this.getRoomIconName(name)}_purple.svg`;
          },
          declOfNum(number, titles) {
              const cases = [2, 0, 1, 1, 1, 2];
              return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
          }
      },
      created() {
          //console.log(this.building)
      }
  };
</script>

<style scoped>
  .v-tooltip:hover {
    cursor: help;
  }

  article {
    font-size: 10px;
    margin: 8px 16px;
    width: 100%;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    display: flex;
    transition: box-shadow 0.1333s ease-out;
    user-select: none;
  }

  article:hover {
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  }

  article:active {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  }

  article > .left {
    align-self: stretch;
    display: flex;
    flex-direction: column;
  }

  .building-image {
    background-size: cover;
    background-position: center center;
    border-top-left-radius: 8px;
    position: relative;
    width: 200px;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    overflow-x: hidden;
  }

  .arrow {
    width: 50%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0; bottom: 0;
    background: transparent;
    color: white;
    text-shadow: 0 0 12px rgba(0,0,0,0.8);
    opacity: 0.6;
    transition: 0.1s ease-in;
  }

  .arrow:hover {
    cursor: pointer;
    opacity: 1;
  }

  .arrow.left {
    border-top-left-radius: 8px;
    left: 0;
  }

  .arrow.left i {
    margin-left: 12px;
  }

  .arrow.right {
    right: 0;
    justify-self: flex-end;
  }

  .arrow.right i {
    margin-left: auto;
    margin-right: 12px;
  }

  .dots {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    bottom: 0;
    display: flex;
  }

  .dots > li {
    width: 24px;
    height: 24px;
    background: transparent;
  }

  .dots > li:before {
    content: '';
    width: 8px;
    height: 8px;
    display: block;
    margin: 8px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 8px rgba(0,0,0,0.5);
    opacity: 0.5;
  }

  .dots > li:hover {
    cursor: default;
  }

  .dots > li:hover {
    user-focus: none;
    user-focus-pointer: none;
  }

  /*.dots > li:not(.active):hover {*/
  /*cursor: pointer;*/
  /*opacity: 1;*/
  /*}*/

  /*.dots > li:not(.active):hover:before {*/
  /*background: var(--primary-color);*/
  /*}*/

  .dots > li.active:before {
    opacity: 1;
  }
  .dots > li:active::after {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .left > .footer {
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .subway {
    font-size: 13px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .subway .v-icon {
    font-size: 16px;
    align-items: end;
  }

  .subway .address-icon {
    background: url("~assets/icons/icon_going_man_bold_green.svg") center center no-repeat;
    height: 14px;
    width: 10px;
	  display: inline-block;
    margin-top: -7px;
    margin-right: 0px;
  }
  .footer {
    display: flex;
    align-items: baseline;
    justify-content: baseline;
    width: 100%;
  }
  .footer > * {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .footer > *:first-child {
    border-bottom-left-radius: 10px;
  }

  .banner {
    padding: 4px 8px;
    line-height: 12px;
    position: relative;
  }

  .banner-with-icon {
    display: flex;
    align-items: center;
    padding-left: 36px;
  }

  .banner-with-icon .icon{
    width: 24px;
    height: 24px;
    position: relative;
  }

  .banner .main {
    font-weight: 700;
  }

  article > .right {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    line-height: 18px;
    border-top-right-radius: 10px;
  }

  /*article > .right:hover .building-name {*/
  /*color: #5300BC;*/
  /*}*/

  .building-name {
    font-weight: 700;
    text-transform: uppercase;
    font-size: inherit;
    line-height: 16px;
  }

  .building-name:after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    border-radius: 2px;
    background: var(--primary-color);
    margin-top: 8px;
  }

  .address {
    color: #808080;
  }

  .floats {
    border-collapse: collapse;
    width: 100%;
    line-height: 12px;
    font-size: 10px;
  }

  .floats tr:last-child td {
    padding-bottom: 0;
  }

  .floats td {
    padding: 2px;
  }

  .floats td:first-child {
    padding-left: 0;
  }
  .floats td:last-child {
    padding-right: 0;
  }

  .floats .icon {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-left: 0;
    padding: 0;
    margin-right: 4px;
  }

  .floats .range {
    display: inline-flex;
    flex-direction: column;
    background: #808080;
  }

  .floats .range > * {
    display: inline-block;
    background: white;
    line-height: 12px;
    font-size: 10px;
    font-weight: 700;
  }
  .floats .range > *:last-child {
    margin-top: 1px;
  }

  .gray {
    color: #808080 !important;
  }

  /*.floats .range > *:first-child {*/
  /*position: relative;*/
  /*}*/

  /*.floats .range > *:last-child {*/
  /*position: relative;*/
  /*}*/

  @media screen and (max-width: 400px) {
	  article {
		  flex-direction: column;
		  font-size: 12px;
	  }

	  article > .left {
		  min-height: 200px;
	  }

	  .banner {
		  padding-top: 6px;
		  padding-bottom: 6px;
		  line-height: 14px;
	  }

	  .footer > *:first-child {
		  border-bottom-left-radius: 0px;
	  }

	  .building-image {
		  width: 100%;
		  height: auto;
		  border-top-right-radius: 8px;
	  }

	  .floats {
		  font-size: 12px;
		  margin-top: 8px;
	  }

	  .floats .range > * {
		  font-size: 12px;
	  }

    .banner-with-icon .icon {
      margin-right: 8px;
    }
  }

  @media screen and (max-width: 330px) {
    article {
      margin: 6px 8px;
      max-width: 248px;
    }

    article > .left {
      min-height: 180px;
    }
  }
</style>