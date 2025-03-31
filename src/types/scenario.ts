export type ScenarioBase = {
    id: string;
    name: ScenarioName;
    onlyOnce: boolean;
    enabled: boolean;
    texts: Record<string, string[]>;
};

export enum ScenarioName {
    ScenarioAddBannerAtTheEnd1 = 'add-banner-at-the-end-1',
    ScenarioAddBannerAtTheEnd2 = 'add-banner-at-the-end-2',
}

export type ScenarioAddBannerAtTheEnd = {
    type: 'ScenarioAddBannerAtTheEnd';
    extraBannerUrl: string;
};

export type ScenarioShortify = {
    type: 'ScenarioShortifyType';
    finalBanner: string;
    minDuration: number;
    maxDuratio: number;
};

export type ScenarioCoverWithImage = {
    type: 'ScenarioCoverWithImageType';
    imageUrl: string;
    imageTop: number;
    imageLeft: number;
    imageWidth: number;
    imageHeight: number;
    videoTop: number;
    videoLeft: number;
    videoWidth: number;
    videoHeight: number;
};

export type ScenarioLongVideoWithInjections = {
    type: 'ScenarioLongVideoWithInjections';
    adsBannerUrl: string;
    startBannerUrl: string;
    injections: string[];
    limit: number;
};
