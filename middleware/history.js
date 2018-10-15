export default function (context) {
    
    // Add the userAgent property in the context (available in `asyncData` and `fetch`)
    context.route.name && context.store.commit('PUSH_ROUTE', context.route.path);
    //console.log(context.store.state.history);
    //context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
    if(process.browser) {
        debugger
        let currentState = window.history.state;
        console.log('state:', currentState)
    }
}