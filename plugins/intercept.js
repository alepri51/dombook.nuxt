export default function ({ app, store }) {
    console.log('AUTH', store.state.auth)

    if(process.browser) {
        /* window.onNuxtReady((app) => {
            console.log('Nuxt ready!');
        });
        //app.router.setStateKey();
        debugger
        let currentState = window.history.state;
        console.log('state:', currentState); */
        /* app._push = app._push || window.history.pushState;
        app._replace = app._replace || window.history.replaceState;

        window.history.pushState = (...args) => {
            
            console.log('from:', window.location.href);
            sessionStorage.setItem('from', window.location.href);

            let [data, title, url] = args;
            app._push(data, title, url);
            //_replace(data, title, url);
        };

        window.history.replaceState = (...args) => {
            console.log('from:', window.location.href);
            sessionStorage.setItem('from', window.location.href);

            let [data, title, url] = args;
            app._replace(data, title, url);
        } */
    }

    app.router.afterEach((to, from, next) => {
        //debugger
        //console.log(window.history.state, from, to);
        //sessionStorage.setItem('from', window.location.href);
        /* let data = { ...window.history.state, my_state: Date.now() };
        try {
            app._replace(data, '', window.location.href);
        }
        catch(err) {
            window.history.replaceState(data, '', window.location.href);
        } */
        //next()
    });

    app.router.beforeEach((to, from, next) => {
        //debugger
        //console.log(from, to);
        next()
    });

}