import React from 'react';

import {ScenarioRouter} from '../../components/Scenario/forms/ScenarioRouter';
import {IScenario} from '../../sharedTypes';

interface FormProps {
    initialValues?: IScenario;
    onSubmit: (values: IScenario) => void;
}

export const Form: React.FC<FormProps> = ({initialValues, onSubmit}) => {
    return <ScenarioRouter initialValues={initialValues} onSubmit={onSubmit} />;
};
