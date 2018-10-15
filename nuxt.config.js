
require('dotenv').config({
    path: '.env.local'
});

module.exports = {
    server: {
        port: process.env.NUXT_HOST,
        host: process.env.NUXT_PORT
    },

    router: {
        middleware: [ 'history']
    },
    /*
    ** Headers of the page
    */
    head: {
        title: 'nuxt-auth',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:100i,300,400,500,600,700&amp;subset=cyrillic' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css' }
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
        //'~/plugins/history.js'
        {src: '~/plugins/intercept.js', ssr: false}
    ],

    modules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/axios', 
        '@nuxtjs/auth'
    ],

    axios: {
        //baseURL: 'http://127.0.0.1:3333/api'
    },

    auth: {
        plugins: [
            //'~/plugins/history.js'
        ],
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
