/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {Fragment} from 'react';

import {ScenarioType} from '../../../sharedTypes/types/enums';
import {CustomField} from '../../CustomField/CustomField';

import {ScenarioTexts} from './components/ScenarioTexts';

type ScenarioFormCommonProps = {
    values: any;
    updateOnly?: boolean;
    setType?: any;
};

export const ScenarioFormCommon = ({
    values,
    updateOnly = false,
    setType,
}: ScenarioFormCommonProps) => {
    React.useEffect(() => {
        setType(values.type);
    }, [setType, values.type]);
    return (
        <Fragment>
            <div style={{backgroundColor: 'rgb(0 0 0 / 0.5)', padding: 10, marginBlock: 20}}>
                <CustomField name="slug" placeholder="Slug" type="text" disabled={updateOnly} />
                <CustomField name="type" placeholder="Type" as="select" disabled={updateOnly}>
                    {Object.entries(ScenarioType).map(([key, value]) => {
                        return (
                            <option key={key} value={value}>
                                {key}
                            </option>
                        );
                    })}
                </CustomField>
                <CustomField name="enabled" type="checkbox" />
                <CustomField name="onlyOnce" type="checkbox" label="Use the scenario only once" />
                <ScenarioTexts values={values} />
            </div>
        </Fragment>
    );
};
