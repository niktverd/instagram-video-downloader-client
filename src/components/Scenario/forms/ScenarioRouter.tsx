/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';

import {ScenarioType} from '../../../types';

import {AddBannerInTheEnd} from './AddBannerInTheEnd';
import {CoverWithImage} from './CoverWithImage';
import {LongScenarioWithInjections} from './LongScenarioWithInjections';
import {Shortify} from './Shortify';

type ScenarioRouterArgs = {
    initialValues: any;
    onSubmit: any;
};

export const ScenarioRouter = ({initialValues, onSubmit}: ScenarioRouterArgs) => {
    const [type, setType] = useState<null | ScenarioType>(initialValues.type);

    if (
        (type as ScenarioType) === ScenarioType.ScenarioAddBannerAtTheEndType ||
        (type as ScenarioType) === ScenarioType.ScenarioAddBannerAtTheEndUniqueType
    ) {
        return (
            <AddBannerInTheEnd
                initialValues={initialValues}
                onSubmit={onSubmit}
                setType={setType}
            />
        );
    }
    if ((type as ScenarioType) === ScenarioType.ScenarioLongVideoWithInjectionsType) {
        return (
            <LongScenarioWithInjections
                initialValues={initialValues}
                onSubmit={onSubmit}
                setType={setType}
            />
        );
    }

    if ((type as ScenarioType) === ScenarioType.ScenarioShortifyType) {
        return <Shortify initialValues={initialValues} onSubmit={onSubmit} setType={setType} />;
    }

    if ((type as ScenarioType) === ScenarioType.ScenarioCoverWithImageType) {
        return (
            <CoverWithImage initialValues={initialValues} onSubmit={onSubmit} setType={setType} />
        );
    }

    return null;
};
