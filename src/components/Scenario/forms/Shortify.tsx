/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {ScenarioFormCommon} from './ScenarioFormCommon';

const numberFields = ['minDuration', 'maxDuration'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Shortify = ({initialValues, onSubmit, setType}: any) => {
    const [values, setValues] = useState(initialValues || {});

    const onSubmitLocal: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit?.(values);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.name;
        setValues({
            ...values,
            [name]: numberFields.includes(name) ? Number(event.target.value) : event.target.value,
        });
    };

    return (
        <form onSubmit={onSubmitLocal}>
            <ScenarioFormCommon values={values} setValues={setValues} setType={setType} />
            <div>
                <label htmlFor="finalBanner">finalBanner</label>
                <input
                    name="finalBanner"
                    type="text"
                    value={values['finalBanner']}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    name="minDuration"
                    type="number"
                    value={values['minDuration'] || 5}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    name="maxDuration"
                    type="number"
                    value={values['maxDuration'] || 7}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>

            <input type="submit" />
        </form>
    );
};
