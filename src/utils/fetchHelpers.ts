import {Method, Routes, defaultHeaders} from './constants';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT_PREPROD = process.env.REACT_APP_API_ENDPOINT_PREPROD;

const objectToSearchParams = (obj: Record<string, string | number | boolean>): URLSearchParams => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(obj)) {
        if (value) {
            params.append(key, value.toString()); // Important: Convert values to strings
        }
    }
    return params;
};

const prepareFetchUrl = (
    route: Routes,
    query: Record<string, string | number | boolean>,
    isProd: boolean,
) => {
    if (!API_ENDPOINT) {
        throw new Error('API_ENDPOINT is not provided');
    }

    const searchParams = objectToSearchParams(query);

    const url = `${isProd ? API_ENDPOINT : API_ENDPOINT_PREPROD}/api${route}?${searchParams} `;
    // eslint-disable-next-line no-console
    console.log(url);

    return url;
};

type FetchGet = {
    route: Routes;
    query?: Record<string, string | number | boolean | null>;
    isProd: boolean;
};

export const fetchGet = async ({route, query = {}, isProd = false}: FetchGet) => {
    const response = await fetch(prepareFetchUrl(route, query, isProd), {
        headers: defaultHeaders,
        method: Method.Get,
    });
    const json = await response.json();

    return json;
};

type FetchPost = {
    route: Routes;
    query?: Record<string, string | number | boolean>;
    body?: Record<string, string | number | boolean>;
    isProd: boolean;
};

export const fetchPost = async ({route, query = {}, body = {}, isProd = false}: FetchPost) => {
    const response = await fetch(prepareFetchUrl(route, query, isProd), {
        headers: defaultHeaders,
        method: Method.Post,
        body: JSON.stringify(body),
    });
    const json = await response.json();

    return json;
};

export const fetchPatch = async ({route, query = {}, body = {}, isProd}: FetchPost) => {
    const response = await fetch(prepareFetchUrl(route, query, isProd), {
        headers: defaultHeaders,
        method: Method.Patch,
        body: JSON.stringify(body),
    });
    const json = await response.json();

    return json;
};

type FetchDelete = {
    route: Routes;
    query?: Record<string, string | number | boolean | null>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Record<string, any>;
    isProd: boolean;
};

export const fetchDelete = async ({route, query = {}, body = {}, isProd = false}: FetchDelete) => {
    const response = await fetch(prepareFetchUrl(route, query, isProd), {
        headers: defaultHeaders,
        method: Method.Delete,
        body: JSON.stringify(body),
    });
    const json = await response.json();

    return json;
};
