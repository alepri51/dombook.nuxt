import { Cache, cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

export default function ({ $axios, redirect }) {
    $axios.defaults.headers.common['cache-control'] = 'no-cache'
    $axios.defaults.adapter = throttleAdapterEnhancer(cacheAdapterEnhancer($axios.defaults.adapter), { threshold: 100 })

    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    });

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    });
  }