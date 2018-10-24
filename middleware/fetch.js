
export const routeComponent = (route) => {
    return route.matched.length ? Object.values(route.matched[0].components)[0] : void 0;
}

const path2val = (path, obj) => {
    return path.split('.').reduce((memo, key) => {
        return memo && memo[key];
    }, obj);
}

const routeOption = (route, key) => {
    
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

const execute = async ({ context, query, component }) => {
    query = query === false ? false : query;

    if(query) {
        let endpoint = typeof query === 'string' ? query : context.route.path;

        typeof query !== 'object' ? query = { endpoint } : query = { endpoint, ...query };
            
        const response = await context.store.dispatch('execute', query);

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

            return {
                ...merge
            }

            console.log(component.$data);
        }
    }
}

export default async function (context) {
    //debugger

    let merge = {};
    let component = routeComponent(context.route);

    let query = routeOption(context.route, 'query');
    merge = query && await execute({ context, query, component });

    let quieries = routeOption(context.route, 'queries');
    if(quieries) {
        for(let query of quieries) {
            let data = await execute({ context, query, component });
            merge = { ...merge, ...data };
        }
    }

    component.options.asyncData = (ctx) => ({
        ...merge
    });

}