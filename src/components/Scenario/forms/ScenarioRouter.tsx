/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';

import {ScenarioType} from '../../../types';

import {AddBannerInTheEnd} from './AddBannerInTheEnd';
import {LongScenarioWithInjections} from './LongScenarioWithInjections';

type ScenarioRouterArgs = {
    initialValues: any;
    onSubmit: any;
};

export const ScenarioRouter = ({initialValues, onSubmit}: ScenarioRouterArgs) => {
    const [type, setType] = useState<null | ScenarioType>(initialValues.type);

    if ((type as ScenarioType) === ScenarioType.ScenarioAddBannerAtTheEndType) {
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

    return null;
};
