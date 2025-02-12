/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {ScenarioFormCommon} from './ScenarioFormCommon';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddBannerInTheEnd = ({initialValues, onSubmit, setType}: any) => {
    const [values, setValues] = useState(initialValues || {});

    const onSubmitLocal: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit?.(values);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.name;
        setValues({...values, [name]: event.target.value});
    };

    return (
        <form onSubmit={onSubmitLocal}>
            <ScenarioFormCommon values={values} setValues={setValues} setType={setType} />
            <div>
                <label htmlFor="extraBannerUrl">extraBannerUrl</label>
                <input
                    name="extraBannerUrl"
                    type="text"
                    value={values['extraBannerUrl']}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>

            <input type="submit" />
        </form>
    );
};
