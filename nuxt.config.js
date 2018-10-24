
require('dotenv').config({
    path: '.env.local'
});

module.exports = {
    server: {
        port: process.env.NUXT_HOST,
        host: process.env.NUXT_PORT
    },

    router: {
        //middleware: [ 'history']
        //middleware: ['auth']
        middleware: ['fetch']
    },
    /*
    ** Headers of the page
    */
    head: {
        title: 'dombook.ru',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'dombook.ru' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico?v2' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:100i,300,400,500,600,700&amp;subset=cyrillic' },
            /* { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css' } */
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
        vendor: ['axios'],
        //vendor: ['axios', 'vuetify'],
        extractCss: true,
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
            isClient && (config.devtool = 'eval-source-map');

            /* if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            } */
        }
    },
    
    css: [
        '~/assets/custom.css'
    ],

    plugins: [
        '~/plugins/axios.js'
        //{src: '~/plugins/intercept.js', ssr: false}
    ],

    env: {
        baseURL: `${process.env.API_PROTOCOL || 'http'}://${process.env.API_HOST || 'localhost'}${process.env.API_PORT ? ':' + process.env.API_PORT : ''}${process.env.API_SUFFIX}`
    },

    modules: [
        '@nuxtjs/vuetify',
        //'@nuxtjs/axios', 
        '@nuxtjs/auth',
        //'~/modules/auth-intercept',
    ],

    vuetify: {
        theme: {
            primary: '#A9C833',
            secondary: '#5300BC',
            secondaryLighten1: '#7831D1',
            secondaryLighten2: '#9154DD',
            secondaryLighten3: '#AC7AEA',
            darkGrey: '#2E2E2E',
            background: '#ffffff'
        },
        options: {
            customProperties: true
        }
    },

    /* axios: {
        baseURL: `${process.env.API_PROTOCOL || 'http'}://${process.env.API_HOST || 'localhost'}${process.env.API_PORT ? ':' + process.env.API_PORT : ''}${process.env.API_SUFFIX}`
    }, */

    auth: {
        plugins: [
            '~/plugins/redirect-fix.js'
        ],
        cookie: false,
        resetOnError: true,
        strategies: {
            local: {
                rewriteRedirects: true,
                endpoints: {
                    login: { url: '/api/login', method: 'post', propertyName: 'token.accessToken' },
                    user: { url: '/api/me', method: 'get' },
                    logout: { url: '/api/logout', method: 'post' }
                }
            }
        }
    },

    serverMiddleware: [
        '~/api'
    ],
    watch: [
        './.env.local'
    ]
}
