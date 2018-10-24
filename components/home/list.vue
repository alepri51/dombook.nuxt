<template>
    <div name="" wrap class="elevation-1 pb-1" align-start @scroll="onScroll">
        <h2 class="mt-0 mb-3 search-num">
            <span style="font-weight: 400!important;"> Найдено </span>
            <span style="font-weight: 700!important;">{{total.value}} </span>
            <span style="font-weight: 400!important;">{{ declOfNum(total, [ 'корпус', 'корпуса', 'корпусов' ]) }}</span>
        </h2>
        <!-- <div slot="header" style="display: flex; flex-direction: column; justify-content: start;">
            <div class="mt-2" style="font-weight: 700!important; padding-left: 8px; text-align: center">
                <template v-if="!total">

                </template>
                <template v-else>
                    <div style="font-size: 14px; line-height: 14px" class="mt-1"></div>
                    <h2 class="mt-0 mb-3 search-num">
                        <span style="font-weight: 400!important;"> Найдено </span>
                        <span style="font-weight: 700!important;">{{total}} </span>
                        <span style="font-weight: 400!important;">{{ declOfNum(total, [ 'корпус', 'корпуса', 'корпусов' ]) }}</span>

                    </h2>

                </template>

            </div>

            <v-pagination v-if="false"
                v-model="current_page"
                :length="length"
                circle
                color="primary"
                style="flex: 1"
            />
        </div> -->

        <!--<v-divider class="ma-1" slot="divider"/>-->

        <building-card v-for="(item, inx) in filter" :key="inx" :building="item"/>
        <!-- <building-card v-for="(item, inx) in filter" :key="inx" :building="item" :filters="filters"/> -->

        <!-- <v-flex v-if="filter.length === 0" d-flex justify-center>
            {{ loading ? 'ПОИСК' : initial ? 'ПОИСК' : 'НИЧЕГО НЕ НАЙДЕНО'}}
            ПОИСК
        </v-flex> -->
    </div>
</template>

<script>
  //import Widget from './class_widget';
  //import dropdownFilter from '../elements/filter';

  export default {
        //extends: Widget,
        props: {
            buildings: {
                required: true
            },
            total: {}
        },
        components: {
            //dropdownFilter,
            buildingCard: () => import('~/components/common/building-card-in-list')
        },
        data() {
            return {
                initial: true,
                increase: false,
                current_page: 1,
                buildingOnPage: 20,
                sort: [
                    { text: 'по дате' },
                    { text: 'по стоимости' },
                    { text: 'по площади' },
                    { text: 'по плюшкам' }
                ]
            }
        },
        computed: {
            offset() {
                return this.buildingOnPage * (this.current_page - 1);
            },
            /* total() {
                //debugger
                return 0;
                //return (this.entities.filter && this.entities.filter.count && this.entities.filter.count.value) || 0;
            }, */
            length() {
                //debugger
                let count = this.total;
                return Math.ceil(count / 20) - 0;
            },
            filter() {
                //debugger
                let buildings = this.buildings;
                /* buildings = (buildings && this.entities.database.v1.buildings.reduce((memo, id) => {
                    this.entities.list[id] && this.entities.list[id].visible !== false && memo.push(this.entities.list[id]);

                    return memo;
                }, [])) || []; */
                buildings = Object.values(buildings);
              console.log(buildings);
                return buildings;
                //return this.raw_data;
            }
        },
        watch: {
            'current_page': function(val) {
                this.$store.commit('SET_FILTER_VALUE', { key: 'offset', value: this.offset });
                this.$emit('page-changed', val);
                this.$store.dispatch('loadBuildings');
            },
            'page': function(val) {
                //debugger
                this.current_page = val;

                if(this.current_page === 1) {
                    let element = this.$el.querySelector('#scroll');
                    element.scrollTop = 0;
                }
            },
            loading(val) {
                !val && (this.increase = false);
                val && this.filter.length && (this.initial = false);
            },
            increase(val) {
                
                if(val && this.filter.length !== this.total) {
                    //debugger
                    this.current_page = this.current_page + 1;
                    //this.increase = false;
                }
            }
        },
        methods: {
            declOfNum(number, titles) {
                const cases = [2, 0, 1, 1, 1, 2];
                return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
            },
            onScroll(params) {
                //debugger
                let { height, position, scrollHeight } = params;
                let breakpoint = position >= (scrollHeight - height * 1);
                !this.increase && breakpoint && (this.increase = breakpoint);

                console.log(breakpoint);
                console.log(params);
                console.log(scrollHeight / height);
            }
        }
    }
</script>


<style scoped>
    @media screen and (max-width: 400px) {
        .search-num {
            font-size: 1.4rem;
        }
    }
</style>
