export enum Method {
    Post = 'POST',
    Get = 'GET',
    Patch = 'PATCH',
}

export const defaultHeaders = {
    'Content-Type': 'application/json',
};

export enum Routes {
    getMediaPosts = '/ui-get-media-posts',
    splitVideoInTheMiddle = '/ui-split-video-in-the-middle',
    testGreenScreen = '/ui-test-green-screen',
    getScenarios = '/ui-get-scenarios',
    patchScenario = '/ui-patch-scenario',
    addScenario = '/ui-add-scenario',
    createVideoByScenario = '/ui-create-video-by-scenario',
    downloadVideoFromSourceV3 = '/ui-download-video-from-source-v3',
}
