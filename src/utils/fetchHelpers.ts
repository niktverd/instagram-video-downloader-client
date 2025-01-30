import {Method, Routes, defaultHeaders} from './constants';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const objectToSearchParams = (obj: Record<string, string | number | boolean>): URLSearchParams => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(obj)) {
        if (value) {
            params.append(key, value.toString()); // Important: Convert values to strings
        }
    }
    return params;
};

const prepareFetchUrl = (route: Routes, query: Record<string, string | number | boolean>) => {
    if (!API_ENDPOINT) {
        throw new Error('API_ENDPOINT is not provided');
    }

    const searchParams = objectToSearchParams(query);
    const url = `${API_ENDPOINT}${route}?${searchParams} `;
    // eslint-disable-next-line no-console
    console.log(url);

    return url;
};

type FetchGet = {
    route: Routes;
    query?: Record<string, string | number | boolean | null>;
};

export const fetchGet = async ({route, query = {}}: FetchGet) => {
    const response = await fetch(prepareFetchUrl(route, query), {
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
};

export const fetchPost = async ({route, query = {}, body = {}}: FetchPost) => {
    const response = await fetch(prepareFetchUrl(route, query), {
        headers: defaultHeaders,
        method: Method.Post,
        body: JSON.stringify(body),
    });
    const json = await response.json();

    return json;
};
