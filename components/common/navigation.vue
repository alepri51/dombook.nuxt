<template>
    <v-toolbar color="background" :height="isCurrentRouteLanding ? toolbarHeight : '64px'" flat
               :class="[{'landing-top-toolbar': isCurrentRouteLanding},'top-toolbar']">
		<!--<v-icon large color="background shadow">fab fa-empire</v-icon>-->
        <v-layout row wrap justify-space-between :align-end="$vuetify.breakpoint.smAndDown">
            <v-flex d-flex align-start xs4 sm3 md2 lg2 xl2>
                <v-toolbar-title class="toolbar-title">
                    <a tag="div" href="/">
                        <img class="logo" src="~/assets/images/DB_logo_Black_Green.svg" alt="dombook.ru - все новостройки, точный подбор, никакой рекламы.">
                    </a>
                </v-toolbar-title>
            </v-flex>
            <no-ssr>
                <v-flex v-if="$vuetify.breakpoint.mdAndUp" d-flex align-end justify-center xs12 sm4 md6 lg6 xl4 class="text-sm-center">
                    <h4 class="primary--text top-toolbar-subtitle">Все новостройки. Точный подбор. <s>Реклама</s></h4>
                </v-flex>
            </no-ssr>
	        <v-flex d-flex align-end justify-end xs6 sm5 md2 lg2 xl2>
                <v-btn @click="commit('SHOW_MODAL', { developing: void 0 })" class="toolbar-actions-btn">
                        <span class="actions-btn-icon"></span>
                        {{$vuetify.breakpoint.smAndUp ? 'Мои действия' : ''}}
                    </v-btn>

            </v-flex>
        </v-layout>

        <!-- <developing></developing> -->
        <!-- <signin/>
        <signup/>
        <signout/> -->
    </v-toolbar>
</template>

<script>
  //import Base from './class_base';

  export default {
        //extends: Base,
        props: ['menu'],
        components: {
/*             signin: () => import('./modals/signin'),
            signup: () => import('./modals/signup'),
          signout: () => import('./modals/signout'),
          developing: () => import('./modals/developing'),
 */
        },
        data() {
            return {
              active: void 0,
              isCurrentRouteLanding: true,
              bp: void 0
            }
        },
        created() {
            this.isCurrentRouteLanding = this.$router.currentRoute.path == "/";
        },
        watch: {
            $route(to, from) {
                this.isCurrentRouteLanding = this.$router.currentRoute.path == "/";
            },
        },
        computed: {
            toolbarHeight() {
                switch (this.$vuetify.breakpoint.name) {
                case 'sm':
                    return '80px';
                case 'md':
                    return '120px';
                case 'lg':
                    return '140px';
                case 'xl':
                    return '140px';
                }
            },
        },
    }
</script>

<style>
    .top-toolbar .logo {
        height: 28px;
        vertical-align: bottom;
        width: auto;
    }

    .top-toolbar .v-toolbar__content {
	    padding-bottom: 6px;
        transition: all .5s ease-in-out;
    }

    .top-toolbar .v-toolbar__content {
        padding: 12px 38px 12px 38px;
    }

    .landing-top-toolbar.top-toolbar .v-toolbar__content {
        padding: 0px 60px 12px 60px;
    }

    .landing-top-toolbar.top-toolbar .toolbar-title .logo {
        vertical-align: baseline;
        height: 40px;
        width: auto;
    }

    .top-toolbar-subtitle {
        font-weight: bold;
        font-size: 18px;
        /*line-height: 1;*/
    }

    .landing-top-toolbar .top-toolbar-subtitle {
        font-size: 22px;
    }

    .toolbar-title {
        overflow: unset;
    }

    .top-toolbar .v-menu .toolbar-actions-btn.v-btn {
        box-shadow: none !important;
        background-color: transparent !important;
        font-size: 18px;
        height: 24px;
        font-weight: normal;
        text-decoration: underline;
        text-transform: none;
        margin: 0px;
        padding: 0px;
        margin-left: auto;
    }

    .toolbar-actions-btn.v-btn {
	    box-shadow: none !important;
	    background: transparent !important;
        margin-bottom: -8px;
        text-transform: none;
    }

    .toolbar-actions-btn.v-btn--active:before, .v-btn:focus:before, .v-btn:hover:before {
	    box-shadow: none !important;
	    background: transparent !important;
    }
    .landing-top-toolbar .v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
        box-shadow: none !important;
        background: transparent !important;
    }
    .landing-top-toolbar.top-toolbar .v-menu .toolbar-actions-btn.v-btn {
        font-size: 20px;
        height: 30px;
    }

    .top-toolbar .v-menu .toolbar-actions-btn.v-btn:hover:before, .top-toolbar .v-menu .toolbar-actions-btn.v-btn:active:before {
        background-color: transparent;
    }

    .toolbar-actions-btn .actions-btn-icon {
        display: inline-block;
        margin-right: 12px;
        height: 22px;
        width: 22px;
        border: 2px solid var(--v-primary-base);
        border-radius: 50%;
    }

    .landing-top-toolbar .toolbar-actions-btn .actions-btn-icon {
        height: 26px;
        width: 26px;
    }

    @media screen and (max-width: 1904px) {
        .landing-top-toolbar.top-toolbar .logo {
            height: auto !important;
            width: 100% !important;
        }

        .landing-top-toolbar .top-toolbar-subtitle {
            font-size: 20px;
            line-height: 1.4;
        }
    }

    @media screen and (max-width: 1264px) {
        .landing-top-toolbar.top-toolbar .v-toolbar__content {
            padding: 0 50px;
        }

        .landing-top-toolbar .top-toolbar-subtitle {
            font-size: 18px;
        }

        .landing-top-toolbar .toolbar-actions-btn .actions-btn-icon {
            height: 22px;
            width: 22px;
        }

        .landing-top-toolbar.top-toolbar .v-menu .toolbar-actions-btn.v-btn {
            font-size: 18px;
            height: 28px;
        }
    }

    @media screen and (max-width: 960px) {
	    .top-toolbar .v-toolbar__content {
		    padding: 12px 38px 12px 28px;
	    }
        .landing-top-toolbar.top-toolbar .v-toolbar__content {
            padding: 0 26px;
        }

        .landing-top-toolbar.top-toolbar .v-menu .toolbar-actions-btn.v-btn {
            font-size: 16px;
            height: 30px;
        }

        .toolbar-actions-btn .actions-btn-icon {
            display: inline-block;
            margin-right: 8px;
            margin-right: 8px;
        }
    }

    @media screen and (max-width: 600px) {
	    .toolbar-actions-btn {
		    visibility: hidden;
	    }
        .landing-top-toolbar.top-toolbar .v-menu .toolbar-actions-btn.v-btn {
            min-width: 28px;
            height: 28px;
        }

        .landing-top-toolbar .toolbar-actions-btn .actions-btn-icon {
            height: 24px;
            width: 24px;
            margin-right: 0px;
        }

        .top-toolbar .logo {
            vertical-align: bottom;
            min-width: 130px;
            max-width: 130px;
        }

        .top-toolbar:not(.landing-top-toolbar) .toolbar-title {
            padding-bottom: 8px;
        }
    }

    @media screen and (max-width: 400px) {
        .top-toolbar .v-toolbar__content {
            padding: 12px 26px 12px 26px;
        }

        .toolbar-actions-btn .v-btn__content {
            text-align: right !important;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-end;
        }

        .toolbar-actions-btn .actions-btn-icon {
            margin-right: 0px;
        }
    }
</style>
