<template>
    <v-dialog v-model="visible" content-class="portrait-dialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown" full-width>
        <v-card>
            <div class="dialog-close">
                <v-btn @click.native="$emit('close')" flat class="close-btn"><span
                        class="icon"></span></v-btn>
            </div>
            <h2 class="text-xs-center header-main-title">Ответьте на вопросы для быстрого поиска<br/>нужной квартиры
            </h2>
            
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props: ['visible'],
    components: {

    },
    activated() {

    },
    data() {
        return {
            
        };
    }
};
</script>

<style>
    .portrait-dialog .header-main-title {
        margin-top: 0px;
        line-height: 1.2;
        padding-bottom: 38px;
        padding-left: 259px;
        padding-right: 259px;
        margin-bottom: 0px;
    }

    .portrait-dialog .header-main-title:after {
        border: 2px solid var(--secondary-color);
    }

    .portrait-dialog .v-stepper {
        box-shadow: none;
    }

    .portrait-dialog .v-stepper__header {
        box-shadow: none;
        justify-content: start;
        flex-wrap: nowrap;
        height: 90px;
    }

    .portrait-dialog .v-stepper__step__step {
        display: none;
    }

    .portrait-dialog .v-stepper__step {
        display: flex;
        width: 18%;
        flex-direction: row;
        flex-wrap: nowrap;
        padding-right: 58px;
        padding-left: 30px;
        max-width: 350px;
    }

    .portrait-dialog .v-stepper__step:first-child, .portrait-dialog .v-stepper__step:last-child {
        width: 430px;
        max-width: 430px;
        min-width: 430px;
        background: #b8b8b8;
    }

    .portrait-dialog .v-stepper__label {
        margin-left: auto;
    }

    .portrait-dialog .v-stepper__step:nth-child(2) {
        background: #878787;
    }

    .portrait-dialog .v-stepper__step:nth-child(3) {
        background: #515151;
    }

    .portrait-dialog .v-stepper__step:nth-child(4) {
        background: #2e2e2e;
    }

    .portrait-dialog .v-stepper__step:nth-child(5) {
        background: #282828;
    }

    .portrait-dialog .v-stepper__step:nth-child(6) {
        background: #161616;
    }

    .portrait-dialog .v-stepper__step--active:not(:last-child) {
        border-top-right-radius: 8px;
    }

    .portrait-dialog .v-stepper__step--inactive {
        display: none;
    }

    .portrait-dialog .step-filter-title {
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
    }

    .portrait-dialog .step-filter-value {
        font-size: 18px;
        color: #ffffff;
    }

    .portrait-dialog .v-stepper__content {
        padding: 38px 50px;
    }

    .portrait-dialog .v-stepper__content .v-card {
        box-shadow: none;
        position: relative;
    }

    .portrait-dialog .question {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        height: 270px;
    }

    .question .question-title {
        font-size: 42px;
        font-weight: bold;
        margin-bottom: 0px;
        max-width: 1220px;
        text-align: center;
    }

    .portrait-dialog .answers {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        padding: 30px;
    }

    .portrait-dialog .answer:not(:last-child) {
        margin-bottom: 26px;
    }

    .answer label {
        cursor: pointer;
        font-size: 28px;
        font-weight: normal;
        line-height: 28px;
    }

    .answer .v-icon {
        font-size: 28px;
    }

    .answer .v-input--selection-controls__input {
        margin-right: 30px;
    }

    .portrait-dialog .portrait-button {
        height: 90px;
        font-size: 27px;
        font-weight: bold;
        text-transform: none;
        width: 430px;
        border-radius: 64px;
    }

    .portrait-range {
	    margin-top: 32px;
    }

    .portrait-range .scrolling-window {
	    min-width: 580px;
	    width: 580px;
    }

    .portrait-range .vue-slider-component, .portrait-range .vue-slider-component {
	    min-width: 550px;
	    width: 550px;
    }

    .portrait-range .vue-slider-component {
	    margin-bottom: 50px;
    }

    .portrait-range .vue-slider-component .vue-slider .vue-slider-dot {
	    width: 20px !important;
	    height: 20px !important;
	    top: -8px !important;
	    background-color: var(--secondary-color);
    }

    .portrait-range .vue-slider .vue-slider-process {
	    background-color: var(--secondary-color) !important;
    }

    .portrait-range .vue-slider .tooltip {
	    font-size: 13px;
    }

    .portrait-range .vue-slider .vue-slider-piecewise-item span {
	    top: -26px !important;
    }

    @media screen and (max-width: 1904px) {
        .portrait-dialog .v-stepper__header {
            height: 68px;
        }

        .portrait-dialog .header-main-title {
            font-size: 38px;
            padding-left: 80px;
            padding-right: 80px;
            padding-bottom: 28px;
        }

        .portrait-dialog .close-btn {
            min-width: 48px;
            width: 48px;
            height: 48px;
        }

        .portrait-dialog .v-stepper__content {
            padding: 26px 50px 30px;
        }

        .question .question-title {
            font-size: 30px;
        }

        .answer label {
            font-size: 24px;
            line-height: 24px;
        }

        .answer .v-icon {
            font-size: 24px;
        }

        .answer .v-input--selection-controls__input {
            margin-right: 16px;
        }

        .portrait-dialog .answer:not(:last-child) {
            margin-bottom: 16px;
        }

        .portrait-dialog .question {
            height: 230px;
        }

        .portrait-dialog .portrait-button {
            height: 62px;
            font-size: 22px;
            width: 360px;
        }

        .portrait-dialog .v-stepper__step {
            padding-right: 38px;
            max-width: 275px;
            padding-top: 16px;
            padding-bottom: 16px;
        }

        .portrait-dialog .v-stepper__step:first-child, .portrait-dialog .v-stepper__step:last-child {
            width: 300px;
            max-width: 300px;
            min-width: 300px;
        }

        .portrait-dialog .step-filter-title {
            font-size: 18px;
        }

        .portrait-dialog .step-filter-value {
            font-size: 14px;
        }

    }

    @media screen and (max-width: 1264px) {
        .portrait-dialog .header-main-title {
            font-size: 30px;
            padding-left: 70px;
            padding-right: 70px;
        }

        .question .question-title {
            font-size: 28px;
        }

        .answer label {
            font-size: 22px;
        }

        .answer .v-icon {
            font-size: 22px;
        }

        .portrait-dialog .question {
            height: 220px;
        }

        .portrait-dialog .portrait-button {
            height: 58px;
            font-size: 20px;
            width: 320px;
        }

        .portrait-dialog .step-filter-title {
            font-size: 16px;
        }

        .portrait-dialog .v-stepper__step {
            padding-right: 24px;
            padding-left: 16px;
            max-width: 207px;
        }

        .portrait-dialog .v-stepper__step:first-child, .portrait-dialog .v-stepper__step:last-child {
            width: 215px;
            max-width: 215px;
            min-width: 215px;
        }
    }

    @media screen and (max-width: 960px) {

        .portrait-dialog .header-main-title {
            font-size: 32px;
            padding-left: 58px;
            padding-right: 58px;
            padding-top: 38px;
            padding-bottom: 38px;
        }

        .portrait-dialog .header-main-title:after {
            width: 68px;
        }

        .portrait-dialog .v-stepper__content {
            padding: 38px 38px 38px;
        }

        .portrait-dialog .question {
            height: 230px;
        }

        .step-filter-title {
            font-size: 14px;
        }

        .step-filter-value {
            font-size: 12px;
            line-height: 1;
        }

        .portrait-dialog .portrait-button {
            height: 52px;
            font-size: 14px;
            width: 250px;
        }

        .portrait-dialog .v-stepper__step {
            width: 20%;
            max-width: 175px;
            padding-right: 18px;
            padding-left: 10px;
        }

        .portrait-dialog .v-stepper__step:first-child, .portrait-dialog .v-stepper__step:last-child {
            width: 140px;
            max-width: 140px;
            min-width: 140px;
        }

        .portrait-dialog .step-filter-title {
            font-size: 14px;
        }

        .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
            display: flex !important;
        }

        .portrait-dialog .v-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

    @media screen and (max-width: 600px) {

        .portrait-dialog .question {
	        height: 250px;
        }

        .portrait-dialog .header-main-title {
            font-size: 26px;
            padding-left: 42px;
            padding-right: 42px;
            padding-top: 38px;
            padding-bottom: 38px;
        }

        .portrait-dialog .header-main-title:after {
            width: 48px;
            transform: translate(-26px, 0);
        }

        .question .question-title {
            font-size: 16px;
            text-align: center;
        }

        .answer label {
            font-size: 18px;
        }

        .answer .v-icon {
            font-size: 18px;
        }

        .answer .v-input--selection-controls__input {
            margin-right: 12px;
        }

        .portrait-dialog .answers {
            padding: 38px 8px;
        }

        .portrait-dialog .v-stepper__header {
            display: none;
        }

        .custom-radio .custom-radio-input:checked:after {
            content: '';
            display: block;
            position: absolute;
            top: 3px;
            left: 3px;
            height: 14px;
            width: 14px;
            border-radius: 50%;
            background: var(--secondary-color);
        }

        .small-device-layout {
            min-height: 128px;
        }

	    .portrait-range {
		    margin-top: 54px;
	    }

	    .portrait-range .scrolling-window {
		    min-width: 340px;
		    width: 340px;
		    margin-right: 8px !important;
		    margin-left: 8px !important;
	    }

	    .portrait-range .vue-slider-component, .portrait-range .vue-slider-component {
		    min-width: 320px;
		    width: 320px;
	    }

	    .portrait-range .vue-slider .tooltip {
		    font-size: 12px;
	    }
    }

    @media screen and (max-width: 340px) {
        .portrait-dialog .header-main-title {
            font-size: 24px;
            padding-left: 24px;
            padding-right: 24px;
        }

        .portrait-dialog .answers {
            padding: 38px 0px;
        }

        .portrait-dialog .portrait-button {
            height: 42px;
        }

        .small-device-layout {
            min-height: 108px;
        }
    }

</style>