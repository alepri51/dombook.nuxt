
export const routeComponent = (route) => {
    return route.matched.length ? Object.values(route.matched[0].components)[0] : void 0;
}

export const path2val = (path, obj) => {
    return path.split('.').reduce((memo, key) => {
        return memo && memo[key];
    }, obj);
}

export const routeOption = (route, key) => {
    
    let value = void 0;

    value = route.matched.reduce((val, matched) => {
        if (process.browser) {
            Object.values(matched.components).filter(component => component.options && (val = component.options[key]))
        } else {
            // SSR
            Object.values(matched.components).filter(component => Object.values(component._Ctor).filter(ctor => ctor.options && (val = ctor.options[key])))
        }

        return val;
    }, void 0);

    return value;
}

export default async function (context) {
    let query = routeOption(context.route, 'query');
    query = query === false ? false : query;
    //query = query === false ? false : query || true;

    if(query) {
        let endpoint = typeof query === 'string' ? query : context.route.path;

        typeof query !== 'object' ? query = { endpoint } : query = { endpoint, ...query };
            
        const response = await context.store.dispatch('execute', query);

        let component = routeComponent(context.route);
        let { merge = false } = query;

        if(component && merge) {
            let { data } = response;

            let dataset = {};

            switch(typeof merge) {
                case 'string':
                    merge = path2val(merge, data);
                    break;
                case 'function':
                    merge = merge(data, context.route.params);
                    break;
                default:
                    break;
            }

            component.options.asyncData = (ctx) => ({
                ...merge
            });

            console.log(component.$data);
        }
    }
}