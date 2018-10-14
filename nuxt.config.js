import bodyParser from 'body-parser'
import session from 'express-session'

export default {
    build: {
        extend (config, { isClient }) {
            // Extend only webpack config for client-bundle
            if (isClient) {
              config.devtool = '#eval-source-map'
            }
        }
    },
    head: {
        title: 'Auth Routes',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', content: 'Auth Routes example' }
        ]
    },
    /*
    ** Add server middleware
    ** Nuxt.js uses `connect` module as server
    ** So most of express middleware works with nuxt.js server middleware
    */
    serverMiddleware: [
        // body-parser middleware
        bodyParser.json(),
        // session middleware
        session({
            secret: 'super-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000 }
        }),
        // Api middleware
        // We add /api/login & /api/logout routes
        '~/api'
    ]
}
