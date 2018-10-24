<template>
	<v-container tag="section" class="greeting">
        
        <v-layout :row="$vuetify.breakpoint.mdAndUp" :column="$vuetify.breakpoint.smAndDown"
                  align-center
                  justify-center
        >
	        <v-flex d-flex align-center justify-center xs12 sm4 class="greeting-box mr-50 new-search">
		        <div class="arrow"></div>

                <v-flex v-show="$vuetify.breakpoint.smAndUp" d-flex class="greeting-icons-row">
                    <div class="greeting-icon-wrap">
                        <div class="greeting-icon"><img src="~assets/icons/landing/banner_user.svg" alt=""></div>
                        <div class="greeting-icon-description">Портрет покупателя</div>
                    </div>
                    <div class="greeting-icon-wrap">
                        <div class="greeting-icon"><img src="~assets/icons/landing/banner_apartment.svg" alt=""></div>
                        <div class="greeting-icon-description">Квартиры</div>
                    </div>
                </v-flex>

		        <div class="greeting-button">
			        <v-btn class="custom-round" color="secondary"
			               @click="questionnaire.visible = true">Искать по-новому
			        </v-btn>
		        </div>
		        <div class="greeting-button-description text-xs-center">Подбор квартиры по вашим<br/>потребностям и возможностям</div>
            </v-flex>
	        <v-flex d-flex align-center justify-center xs12 sm4 class="greeting-box filters-search">
		        <div class="arrow"></div>

                <v-flex v-show="$vuetify.breakpoint.smAndUp" d-flex class="greeting-icons-row">
                    <div class="greeting-icon-wrap">
                        <div class="greeting-icon"><img src="~assets/icons/landing/banner_filters.svg" alt=""></div>
                        <div class="greeting-icon-description">Фильтры</div>
                    </div>
                    <div class="greeting-icon-wrap">
                        <div class="greeting-icon"><img src="~assets/icons/landing/banner_apartment_green.svg" alt=""></div>
                        <div class="greeting-icon-description">Квартиры</div>
                    </div>
                </v-flex>

		        <div class="greeting-button">
			        <v-btn class="custom-round" color="primary" to="home">Искать по фильтрам</v-btn>
                    </div>
		        <div class="text-xs-center">Подбор квартиры <br/>путем настройки фильтров</div>
            </v-flex>
        </v-layout>
        
		<questionnaire :visible="questionnaire.visible" @close="questionnaire.visible = false"/>
    </v-container>
</template>

<script>
  //import Base from './class_base';

  export default {
    //extends: Base,
    components: {
        questionnaire: () => import('~/components/modals/questionnaire')
    },
    data() {
        return {
            questionnaire: {
                visible: false
            }
        };
    },
    methods: {},
  };
</script>


<style>
	.greeting {
		margin-bottom: 65px;
	}
	.greeting-box {
		flex-direction: column;
		max-width: 430px !important;
		margin-top: 30px;
		position: relative;
	}

	.greeting-box .arrow {
		position: absolute;
		top: 0;
		left: 0;
	}

	.new-search .arrow {
		height: 45px;
		width: 165px;
		transform: translate(85px);
		background: url('~assets/icons/landing/banner_left_arrow.svg') center center no-repeat;
		background-size: contain;
	}

	.filters-search .arrow {
		width: 155px;
		height: 55px;
		transform: translate(95px);
		background: url('~assets/icons/landing/banner_right_arrow.svg') center center no-repeat;
		background-size: contain;
	}
	.greeting-box.mr-50 {
		margin-right: 50px;
	}

	.greeting-icon {
		height: 69px;
		width: 69px;
		margin-right: 10px;
	}

	.greeting-icons-row {
		padding-top: 50px;
		margin-bottom: 70px;
	}

	.greeting-icon img {
		height: 100%;
		width: 100%;
	}

	.greeting-icon-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.greeting-icon-wrap:first-child {
		margin-right: 30px;
	}

	.greeting-icon-description {
		font-weight: 400;
		font-size: 16px;
		max-width: 100px;
	}

	.greeting-button {
		margin-bottom: 30px;
	}

	.greeting-button .v-btn__content {
		height: 100%;
	}

	.custom-round.v-btn {
		width: 100%;
		flex-direction: column;
		text-transform: none;
		font-weight: 600;
		font-size: 26px;
		padding: 30px 80px;
		border-radius: 32px;
		margin: 0px;
	}

	@media screen and (max-width: 1904px) {
		.greeting-icons-row {
			padding-top: 38px;
			margin-bottom: 48px;
		}

		.new-search .arrow {
			height: 40px;
			width: 145px;
		}

		.filters-search .arrow {
			width: 145px;
			height: 50px;
		}

		.greeting-button {
			margin-bottom: 20px;
		}

		.custom-round.v-btn {
			font-size: 24px;
			padding: 26px 80px;
		}
	}

	@media screen and (max-width: 1264px) and (min-width: 960px) {
		.greeting {
			margin-bottom: 45px;
		}

		.greeting-icon {
			height: 62px;
			width: 62px;
			margin-right: 8px;
		}

		.greeting-box .arrow {
			top: -8px;
		}

		.greeting-icons-row {
			padding-top: 28px;
			margin-bottom: 38px;
		}

		.greeting-icon-wrap:first-child {
			margin-right: 20px;
		}

		.new-search .arrow {
			transform: translate(60px);
			height: 40px;
			width: 140px;
		}

		.filters-search .arrow {
			width: 137px;
			height: 48px;
			transform: translate(76px);
			top: -12px;
		}

		.greeting-button {
			margin-bottom: 15px;
		}

		.custom-round.v-btn {
			font-size: 22px;
			padding: 22px 68px;
		}
	}

	@media screen and (max-width: 960px) {
		.greeting-box.mr-50 {
			margin-right: 0px;
		}

		.greeting-box:first-child {
			margin-bottom: 30px;
		}
	}

	@media screen and (max-width: 600px) {
		.greeting {
			margin-bottom: 38px;
			padding-left: 26px;
			padding-right: 26px;
		}

		.greeting-box {
			width: 100%;
		}

		.greeting-button {
			width: 100%;
		}

		.greeting-button .v-btn {
			padding: 30px 35px;
		}

		.greeting-box:first-child {
			margin-bottom: 0px;
			margin-top: 16px;
		}

		.greeting-button {
			margin-bottom: 15px;
		}
	}

	@media screen and (max-width: 340px) {
		.custom-round.v-btn {
			font-size: 20px;
		}
	}
</style>
