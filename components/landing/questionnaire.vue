<template>
    <v-dialog v-model="visible" content-class="portrait-dialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown"
              full-width>
        <v-card>
            <div class="dialog-close">
                <v-btn @click.native="commit('HIDE_MODAL', { portrait: void 0 })" flat class="close-btn"><span
                        class="icon"></span></v-btn>
            </div>
            <h2 class="text-xs-center header-main-title">Ответьте на вопросы для быстрого поиска<br/>нужной квартиры
            </h2>
            <v-stepper v-model="currentStep">
                <v-stepper-items>
                    <v-stepper-content v-for="(step, inx) in steps" :step="step.order" :key="inx">
                        <v-layout column justify-space-between align-center>
                            <div class="question">
                                <h4 class="question-title">{{ step.text }}</h4>
	                            <v-radio-group v-if="step.type=='radio'" class="answers" v-model="step.currentAnswer"
	                                           mandatory>
                                    <v-radio v-for="(answer, index) in step.answers" :key="index"
                                             @change="changeBranch(answer)" :label="answer.text" color="secondary"
                                             :value="answer.value" class="answer"></v-radio>
                                </v-radio-group>
	                            <div class="portrait-range">
		                            <range v-if="step.type === 'range'" :ref="`range${step.order}`"
		                                   @mounted="onRangeMounted" :name="step.alias" :value="step.currentAnswer"
		                                   @change="onRangeChange" :min="step.rangeOptions.min"
		                                   :max="step.rangeOptions.max"
		                                   :show-scroll-arrows="step.rangeOptions.showScrollArrows"
		                                   :fix-right="step.rangeOptions.fixRight"
		                                   :interval="step.rangeOptions.interval" :max-gap="step.rangeOptions.maxGap"
		                                   :label-validator="step.rangeOptions.labelValidator"
		                                   :left="step.rangeOptions.left" :width="step.rangeOptions.width"
		                                   :scale="step.rangeOptions.scale">
			                            <div slot="tooltip" slot-scope="{ value }" style="white-space: nowrap">
				                            {{ step.tooltipConstructor.apply(null, [value]) }}
			                            </div>

			                            <div slot="label" slot-scope="{ label }" style="white-space: nowrap">
				                            {{ step.labelConstructor.apply(null, [label]) }}
			                            </div>
		                            </range>
	                            </div>
                                <!--<v-range-slider v-if="step.type=='range'" :name="step.alias" v-model="step.range"-->
                                                <!--:max="40000000" :min="1000000" :step="100000" thumb-label="always"-->
                                                <!--color="secondary"></v-range-slider>-->
                                <!--<v-slider v-if="step.type=='slider'" v-model="step.slider" :max="200" :min="20"-->
                                          <!--thumb-label="always" color="secondary"></v-slider>-->
                            </div>
                            <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly"
                                      :align-center="$vuetify.breakpoint.xsOnly"
                                      :justify-center="$vuetify.breakpoint.smAndUp" class="small-device-layout">
                                <v-btn v-if="step.order > 1 && $vuetify.breakpoint.mdAndUp" class="portrait-button" outline round color="secondary"
                                       @click="previousStep(step)">
                                    Предыдущий вопрос
                                </v-btn>

                                <v-btn v-if="!step.final" round :disabled="isCurrentAnswerEmpty" class="portrait-button"
                                       color="secondary"
                                       @click="nextStep(step)">
                                    Далее
                                </v-btn>
	                            <v-btn v-if="step.final" :disabled="isCurrentAnswerEmpty" round class="portrait-button"
	                                   color="secondary"
	                                   @click="goToMap()">
                                    Показать результат отбора
                                </v-btn>

                                <v-btn v-if="step.order > 1 && $vuetify.breakpoint.smAndDown" class="portrait-button" outline round color="secondary"
                                       @click="previousStep(step)">
                                    Предыдущий вопрос
                                </v-btn>
                            </v-layout>
                        </v-layout>
                    </v-stepper-content>
                </v-stepper-items>

                <!--<v-stepper-header>-->
                    <!--<v-stepper-step v-for="(step, inx) in steps" v-if="step.filter" :complete="currentStep > step.order"-->
                                    <!--:step="step.order" :key="inx">-->
                        <!--<div class="step-filter-title">{{ step.filter.name }}</div>-->
                        <!--<div class="step-filter-value">{{ getStepValue(step)}}</div>-->
                    <!--</v-stepper-step>-->
                <!--</v-stepper-header>-->
            </v-stepper>
        </v-card>
    </v-dialog>
</template>

<script>
  import Modal from './class_modal';
  import forEach from 'lodash/forEach';
  import find from 'lodash/find';
  import orderBy from 'lodash/orderBy';
  import indexOf from 'lodash/indexOf';
  import moment from 'moment';

  export default {
        extends: Modal,
        components: {
            range: () => import('../elements/range')
        },
        activated() {

        },
        data() {
            return {
                questions: {
                    'target': {
                        text: 'Цель покупки недвижимости?',
                        alias: 'target',
                        branch: 'all',
                        order: 1,
                        type: 'radio',
                        answers: [
                            {
                                value: 'living',
                                text: 'Для проживания',
                                isBranch: true,
                                branch: 1,
                                next: 'date',
                            },
                            {
                                value: 'commerce',
                                text: 'В коммерческих целях',
                                isBranch: true,
                                branch: 2,
                                next: 'budget2',
                            },
                        ],
                      currentAnswer: '',
                    },

                    'date': {
                        text: 'Планируете заселиться не позднее?',
                        alias: 'date',
                        order: 2,
                        branch: 1,
                        type: 'radio',
                        next: 'finishing',
                        filter: {
                            name: 'Срок сдачи',
                        },
                        answers: [
                            {
                                value: 0,
                                text: 'Сразу',
                            },
                            {
                                value: 1,
                                text: '2019',
                                addition: {
                                    type: 'radio',
                                    items: [
                                        {
                                            text: '1кв',
                                            alias: '1',
                                        }, {
                                            text: '2кв',
                                            alias: '2',
                                        }, {
                                            text: '3кв',
                                            alias: '3',
                                        }, {
                                            text: '4кв',
                                            alias: '4',
                                        },
                                    ],
                                },
                            },
                            {
                                value: 2,
                                text: '2020',
                                addition: {
                                    type: 'radio',
                                    items: [
                                        {
                                            text: '1кв',
                                            alias: '1',
                                        }, {
                                            text: '2кв',
                                            alias: '2',
                                        }, {
                                            text: '3кв',
                                            alias: '3',
                                        }, {
                                            text: '4кв',
                                            alias: '4',
                                        },
                                    ],
                                },
                            },
                            {
                                value: 3,
                                text: 'Все равно',
                            },
                        ],
                      currentAnswer: '',
                    },

                    'finishing': {
                        text: 'Какая будет Ваша квартира?',
                        alias: 'finishing',
                        order: 4,
                        branch: 1,
                        type: 'radio',
                        next: 'rooms',
                        filter: {
                            name: 'Отделка',
                        },
                        answers: [
                            // {
                            //     value: 0,
                            //     text: 'По индивидуальному дизайн проекту',
                            //     filter: {
                            //         name: 'Срок сдачи',
                            //     },
                            // },
                            {
                                value: 0,
                                text: 'Хороший индивидуальный ремонт',
                                filter: {
                                    name: 'Срок сдачи',
                                },
                            },
                            {
                                value: 1,
                                text: 'Мне нравятся готовые решения',
                                filter: {
                                    name: 'Отделка',
                                },
                            },
                            // {
                            //     value: 3,
                            //     text: 'Не имеет значения',
                            // },
                        ],
                      currentAnswer: '',
                    },

                    'rooms': {
                        text: 'Сколько человек будет проживать?',
                        alias: 'rooms',
                        order: 5,
                        branch: 1,
                        type: 'radio',
                        next: 'square',
                        filter: {
                            name: 'Комнатность',
                        },
                        answers: [
                            {
                                value: 0,
                                text: 'Один человек',
                            },
                            {
                                value: 1,
                                text: 'Семья из двух человек',
                            },
                            {
                                value: 2,
                                text: 'Семья с детьми',
                            },
                        ],
                      currentAnswer: '',
                    },

                    'square': {
                        text: 'Укажите минимальную площадь квартиры, в которой бы вы хотели жить ?',
                        alias: 'square',
                        order: 6,
                        branch: 1,
                        type: 'range',
                        tooltipConstructor(value) {
                            return value;
                        },
                        labelConstructor(label) {
                            return label + ` м²`;
                        },
                        rangeOptions: {
                            min: 20,
                            max: 199,
                            fixRight: true,
                            interval: 1,
                            labelValidator: label => label % 40 === 0,
                            left: 0,
                            width: '330px',
                            scale: 325
                        },
                        next: 'budget',
                        slider: 30,
                        filter: {
                            name: 'Площадь',
                        },
                        currentAnswer: [ 30, 199 ],
                    },

                    'budget': {
                        text: 'Вы планируете потратить на покупку своей квартиры (без учета ремонта)?',
                        alias: 'budget',
                        order: 7,
                        branch: 1,
                        type: 'range',
                        tooltipConstructor(value) {
                            return value && (value / 1000000).toFixed(2);
                        },
                        labelConstructor(label) {
                            return `${label && (label / 1000000)} млн`;
                        },
                        rangeOptions: {
                            min: 3000000,
                            max: 50000000,
                            interval: 100000,
                            maxGap: 5000000,
                            labelValidator: label => label % 10000000 === 0 && label !== 50000000,
                            left: 0,
                            showScrollArrows: false,
                            width: '330px',
                            scale: 325
                        },
                        // range: [5000000, 10000000],
                        final: true,
                        filter: {
                            name: 'Бюджет',
                        },
                        currentAnswer: [5000000, 10000000],
                    },

                    'budget2': {
                        text: 'Сколько вы планируете вложить в покупку квартиры?',
                        alias: 'budget2',
                        order: 2,
                        branch: 2,
                        type: 'range',
                        next: 'investment',
                        tooltipConstructor(value) {
                            return value && (value / 1000000).toFixed(2);
                        },
                        labelConstructor(label) {
                            return `${label && (label / 1000000)} млн`;
                        },
                        rangeOptions: {
                            min: 3000000,
                            max: 50000000,
                            interval: 100000,
                            maxGap: 5000000,
                            labelValidator: label => label % 10000000 === 0 && label !== 50000000,
                            left: 0,
                            showScrollArrows: false,
                            width: '330px',
                            scale: 325
                        },
                        // range: [5000000, 10000000],
                        // final: true,
                        filter: {
                            name: 'Бюджет',
                        },
                        currentAnswer: [5000000, 10000000],
                    },

                    'investment': {
                        text: 'Вы планируете',
                        alias: 'investment',
                        order: 3,
                        branch: 2,
                        type: 'radio',
                        final: true,
                        answers: [
                            {
                                value: 0,
                                text: 'Купить для долгосрочного инвестирования',
                            }, {
                                value: 1,
                                text: 'Купить для продажи перед получением прав собственности',
                            }, {
                                value: 2,
                                text: 'Купить для сдачи в аренду',
                            },
                        ],
                      currentAnswer: '',
                    },
                },
                currentStep: 1,
              currentBranch: 1,
            };
        },
        name: "portrait",
        watch: {
            currentStep(step) {
                const ref = this.$refs[`range${step}`];
                if (ref && ref[0]) {
                    setTimeout(() => {
                        console.log('refreshing', ref[0]);
                        ref[0].refresh();
                    }, 400);
                }
                // if (alias && this.questions[alias] && this.questions[alias].type === 'range') {
                //     setTimeout(() => {
                //         this.$refs[`range${alias}`].refresh();
                //     }, 2000);
                // }
            }
        },
        computed: {
            currentAlias() {
                for (let alias in this.questions) {
                    const q = this.questions[alias];
                    if (q.order == this.currentStep && q.branch === this.currentBranch) return alias;
                }
            },
            steps() {
                let steps = [];
                forEach(this.questions, (question) => {
                    if (question.branch == this.currentBranch || question.branch == 'all') {
                        steps.push(question);
                    }
                });
                return orderBy(steps, 'order');
            },
          isCurrentAnswerEmpty() {
            let currentStep = find(this.steps, { 'order': this.currentStep });
            return currentStep.currentAnswer === '';
          },
        },
        methods: {
            setFilters() {
                let filters = {};
                let values = ['price', 'in_operation_date','lot_finishing_type', 'constructionStage'];

                if (this.currentBranch === 1) {
                    switch (this.questions.date.currentAnswer) {
                        case 0:
                            filters.in_operation_date = moment().unix();
                            break;
                        case 1:
                            filters.in_operation_date = moment().add(1, 'year').endOf('year').unix();
                            break;
                        case 2:
                            filters.in_operation_date = moment().add(2, 'year').endOf('year').unix();
                            break;
                    }

                    if (typeof this.questions.finishing.currentAnswer !== 'undefined') {
                      //debugger;
                        let with_finishing = this.entities.filter['Finishing'].names.filter(el => ["С мебелью", "С отделкой", "Без мебели", "Под чистовую", "Отделка как доп. опция"].includes(el.text));
                        let without_finishing = this.entities.filter['Finishing'].names.filter(el => "Без отделки" === el.text);

                        const finishingTypes = {
                            1: with_finishing.reduce((memo, type) => {
                                memo[type.value] = type;

                                return memo;
                            }, {}),
                            0: without_finishing.reduce((memo, type) => {
                                memo[type.value] = type;

                                return memo;
                            }, {})
                        };
                        
                        filters.lot_finishing_type = finishingTypes[this.questions.finishing.currentAnswer];
                    }

                    const rooms = {
                        "0": {
                            "text": "Студия",
                            "group": 2,
                            "is_studio": true
                        },
                        "1": {
                            "text": "СП",
                            "group": 2,
                            "is_open_plan": true
                        },
                        "2": {
                            "text": "1+",
                            "group": 1,
                            "rooms": 1
                        },
                        "3": {
                            "text": "2+",
                            "group": 1,
                            "rooms": 2
                        },
                        "4": {
                            "text": "3+",
                            "group": 1,
                            "rooms": 2
                        },
                        "5": {
                            "text": "4+",
                            "group": 1,
                            "rooms": 2
                        }
                    };

                    switch (this.questions.rooms.currentAnswer) {
                        case 0:
                            filters.rooms = {
                                //0: rooms[0],
                                //1: rooms[1],
                                2: rooms[2],
                            };
                            break;
                        case 1:
                            filters.rooms = {
                                //1: rooms[1],
                                3: rooms[3]
                            };
                            break;
                        case 2:
                            filters.rooms = {
                                //0: rooms[0],
                                //1: rooms[1],
                                3: rooms[3]
                            };
                            break;
                    }

                    filters.price = this.questions.budget.currentAnswer;

                    filters.square = this.questions.square.currentAnswer[0];
                }

                if (this.currentBranch === 2) {
                    filters.price = this.questions.budget2.currentAnswer;

                    let stage = this.entities.filter['ConstructionStage'].names.filter(el => ["Строительство не начато", "Работы нулевого цикла"].includes(el.text));

                    switch (this.questions.investment.currentAnswer) {
                        case 0:
                        case 1:
                            filters.constructionStage = stage.reduce((memo, type) => {
                                memo[type.value] = type;

                                return memo;
                            }, {});
                            /* filters.constructionStage = {
                                "5bab5679194eb200115d6d73": {
                                    "text": "Строительство не начато",
                                    "value": "5bab5679194eb200115d6d73"
                                },
                                "5bab5679194eb200115d6d72": {
                                    "text": "Работы нулевого цикла",
                                    "value": "5bab5679194eb200115d6d72"
                                }
                            }; */
                            break;
                        case 2:
                            filters.in_operation_date = moment().unix();
                            break;
                    }
                }

                console.log('¶¶¶¶¶setFilters', filters);

                //localStorage.setItem('_filters', JSON.stringify(filters));
                //debugger
                values.forEach(val => !filters[val] ? delete this.state.filters[val] : void 0);
                this.$store.commit('SET_FILTERS', { force: true, filters }) ;
            },
            onRangeMounted(ctx) {
                // setTimeout(() => {
                //     console.log('123123');
                //     ctx.refresh()
                // }, 5000);
            },
            onRangeChange(val) {
                const question = this.questions[this.currentAlias];
                question && (question.currentAnswer = val);
            },
            getStepValue(step) {
                switch (step.type) {
                    case 'radio':
                        const answ = step.answers[step.currentAnswer];
                        return answ && answ.text;
                    // case 'range':
                    //     return step.prettyValueConstructor(step.currentAnswer);
                }
            },
            changeBranch(answer) {
                if (answer.isBranch) {
                    this.currentBranch = answer.branch;
                }
            },
            nextStep(currentStep) {
                let nextStep;
              if (currentStep.next !== undefined) {
                    nextStep = find(this.steps, {'alias': currentStep.next});
                } else {
                let currentAnswer = find(currentStep.answers, { 'value': currentStep.currentAnswer });
                    nextStep = find(this.steps, {'alias': currentAnswer.next});
                }
                this.currentStep = nextStep.order;
            },
            previousStep(currentStep) {
                let currentStepIndex = indexOf(this.steps, currentStep);
                this.currentStep = this.steps[currentStepIndex - 1].order;
            },
            goToMap() {
                this.setFilters();
                this.currentStep = 1;
                this.$router.push('home');
            },
        },
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