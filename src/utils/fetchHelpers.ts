import {FetchRoutes, Method, defaultHeaders} from './constants';

const API_ENDPOINT_PROD = process.env.REACT_APP_API_ENDPOINT_PROD;
const API_ENDPOINT_PREPROD = process.env.REACT_APP_API_ENDPOINT_PREPROD;

const objectToSearchParams = (obj: Record<string, string | number | boolean | string[]>) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
        } else if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
        }
    }
    return params;
};

const prepareFetchUrl = (
    route: FetchRoutes,
    query: Record<string, string | number | boolean | string[]>,
    isProd: boolean,
) => {
    if (!API_ENDPOINT_PROD) {
        throw new Error('API_ENDPOINT is not provided');
    }

    const searchParams = objectToSearchParams(query);

    const url = `${isProd ? API_ENDPOINT_PROD : API_ENDPOINT_PREPROD}/api${route}?${searchParams} `;
    // eslint-disable-next-line no-console
    console.log(url);

    return url;
};

type FetchGet = {
    route: FetchRoutes;
    query?: Record<string, string | number | boolean | string[] | null>;
    isProd: boolean;
};

export const fetchGet = async <T>({route, query = {}, isProd = false}: FetchGet) => {
    const response = await fetch(prepareFetchUrl(route, query, isProd), {
        headers: defaultHeaders,
        method: Method.Get,
    });
    const json = await response.json();

    return json as T;
};

type FetchPost = {
    route: FetchRoutes;
    query?: Record<string, string | number | boolean | string[]>;
    body?: unknown;
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
    route: FetchRoutes;
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
