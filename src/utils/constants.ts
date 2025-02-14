export enum Method {
    Post = 'POST',
    Get = 'GET',
    Patch = 'PATCH',
    Delete = 'DELETE',
}

export const defaultHeaders = {
    'Content-Type': 'application/json',
};

export enum Routes {
    getMediaPosts = '/ui-get-media-posts',
    splitVideoInTheMiddle = '/ui-split-video-in-the-middle',
    testGreenScreen = '/ui-test-green-screen',
    // scenarios
    getScenarios = '/ui-get-scenarios',
    patchScenario = '/ui-patch-scenario',
    addScenario = '/ui-add-scenario',
    // accounts
    getAccounts = '/ui-get-accounts',
    patchAccount = '/ui-patch-account',
    addAccount = '/ui-add-account',

    getInsights = '/ui-get-insights',
    getMedia = '/ui-get-media',
    getUserById = '/ui-get-user-by-id',
    getOwnerByMediaId = '/ui-get-owner-by--media-id',
    // test
    createVideoByScenario = '/ui-create-video-by-scenario',
    createInjectVideoByScenario = '/ui-run-injection-scenarios',
    downloadVideoFromSourceV3 = '/ui-download-video-from-source-v3',
    clearPreprodDatabase = '/ui-clear-proprod-database',
}
