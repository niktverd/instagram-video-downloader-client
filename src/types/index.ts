// import {ScenarioAddBannerAtTheEnd, ScenarioBase} from './scenario';
import {Timestamp} from './timestamp';

export type SourceInstagramReel = {
    url: string;
    senderId: string;
    owner: string;
    title: string;
    originalHashtags: string[];
};

export type SourceYoutubeShort = {
    url: string;
};

export type Sources = {
    instagramReel?: SourceInstagramReel;
    youtubeShort?: SourceYoutubeShort;
};

type PublishedCommon = {
    published: boolean;
};

type ReportInstagramReel = PublishedCommon & {
    mediaContainerId?: string;
    status: 'empty' | 'uploaded' | 'finished' | 'published';
};

type ReportYoutubeShort = PublishedCommon & {
    videoId?: string;
};

export type MediaPostModel = {
    id: string;
    createdAt: Timestamp;
    firebaseUrl: string;
    sources: Sources;
    publishedOnInstagramCarcarKz: ReportInstagramReel;
    publishedOnInstagramCarcarTech: ReportInstagramReel;
    publishedOnYoutubeCarcentreKz: ReportYoutubeShort;
    attempt: number;
    randomIndex: number;
};

// export type MediaPostModelOld = {
//     id: string;
//     account: string;
//     createdAt: Timestamp;
//     firebaseUrl: string;
//     mediaContainerId: string;
//     senderId: string;
//     status: string;
//     type: string;
//     url: string;
// };

// export type SourceV3 = {
//     id: string;
//     createdAt: Timestamp;
//     firebaseUrl: string;
//     sources: Sources;
//     randomIndex: number;
//     bodyJSONString: string;
//     attempt: number;
//     scenarios: string[];
//     lastUsed: Timestamp;
//     timesUsed: number;
// };

// export type ScenarioV3 = ScenarioBase & ScenarioAddBannerAtTheEnd;

// export enum ScenarioType {
//     // ScenarioAddBannerAtTheEndType = 'ScenarioAddBannerAtTheEnd',
//     ScenarioAddBannerAtTheEndUnique = 'ScenarioAddBannerAtTheEndUnique',
//     // ScenarioLongVideoWithInjectionsType = 'ScenarioLongVideoWithInjections',
//     // ScenarioShortifyType = 'ScenarioShortifyType',
//     ScenarioShortifyUnique = 'ScenarioShortifyUnique',
//     // ScenarioCoverWithImageType = 'ScenarioCoverWithImageType',
// }

// export type PreparedVideoV3 = {
//     firebaseUrl: string;
//     scenarioType: ScenarioType;
//     scenarioName: string;
//     title: string;
//     originalHashtags: string[];
//     accounts: string[];
// };

// export type AccountV3 = {
//     id: number;
//     slug: string;
//     token: string;
//     userIdIG: string;
//     disabled: boolean;
//     availableScenarios: number[] | ScenarioV3[];
//     accountBackgrounMusic?: string;
//     userId?: string;
// };

// export type AccountMediaContainerV3 = {
//     id: string;
//     mediaContainerId: string;
//     createdAt: Timestamp;
//     status: 'created' | 'published';
// };
