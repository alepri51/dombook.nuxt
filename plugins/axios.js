//import { Cache, cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
import axios from 'axios';
//import Vue from 'vue';



export default (ctx, inject) => {

    const api = axios.create({
        baseURL: process.env.baseURL,
        //headers: { 'Cache-Control': 'no-cache' },
        //adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter), { threshold: 100 })
    });

    let onRequest = (config => {
        return config;
    });

    let onResponse = (async response => {
        return response;
    });

    let onError = (error => {
        console.log('error:', error);
    });

    api.interceptors.request.use(onRequest, onError);
    api.interceptors.response.use(onResponse, onError);

    ctx.$axios = api;
    inject('axios', api);
}

//const cache = new Cache();

/* export default function ({ $axios, redirect }) {
    baseURL: `${process.env.API_PROTOCOL || 'http'}://${process.env.API_HOST || 'localhost'}${process.env.API_PORT ? ':' + process.env.API_PORT : ''}${process.env.API_SUFFIX}`
    $axios.defaults.headers.common['Cache-Control'] = 'no-cache';
    //$axios.setHeader('Cache-Control', 'no-cache');

    $axios.defaults.adapter = throttleAdapterEnhancer(cacheAdapterEnhancer($axios.defaults.adapter), { threshold: 100 })

    $axios.onRequest(config => {
        //config.cache = cache;
        console.log('Making request to ' + config.url)
        //console.log('cl', cache.length);
    });

    $axios.onResponse(response => {
        //cache.set(response.config.url, response);
        //config.cache = cache;
        console.log('Making request to ' + response.config.url)
        //console.log('cl', cache.length);
    });

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    });
  } */