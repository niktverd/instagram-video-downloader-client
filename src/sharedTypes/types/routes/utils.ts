type PrefixedRoutes<T extends Record<string, string>, Prefix extends string> = {
    [K in keyof T]: `${Prefix}${T[K]}`;
};

// Then update your getFullRoutes return type
export const getFullRoutes = <T extends Record<string, string>, Prefix extends string>({
    rootName,
    routes,
}: {
    rootName: Prefix;
    routes: T;
}): PrefixedRoutes<T, Prefix> => {
    const newObject = {} as PrefixedRoutes<T, Prefix>;
    for (const [key, value] of Object.entries(routes)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newObject as any)[key] = `${rootName}${value}`;
    }
    return newObject;
};
