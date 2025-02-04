export enum Method {
    Post = 'POST',
    Get = 'Get',
}

export const defaultHeaders = {
    'Content-Type': 'application/json',
};

export enum Routes {
    getMediaPosts = '/ui-get-media-posts',
    splitVideoInTheMiddle = '/ui-split-video-in-the-middle',
    testGreenScreen = '/ui-test-green-screen',
}
