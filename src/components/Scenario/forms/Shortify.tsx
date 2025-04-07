/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {Button} from '@gravity-ui/uikit';

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

    const handleChangeInjection =
        (index: number): React.ChangeEventHandler<HTMLInputElement> =>
        (event) => {
            const extraBannerUrls = [...(values.extraBannerUrls || [])];
            extraBannerUrls[index] = event.target.value;

            setValues({
                ...values,
                extraBannerUrls,
            });
        };

    const handleAddInjectionClick = () => {
        const extraBannerUrls = [...(values.extraBannerUrls || [])];
        extraBannerUrls.push('');

        setValues({
            ...values,
            extraBannerUrls,
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
                    disabled
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
            <div>
                <h4>extraBannerUrls</h4>
                <div>
                    {(values.extraBannerUrls || []).map((extraBannerUrl: string, index) => {
                        return (
                            <div key={extraBannerUrl + index}>
                                <input
                                    value={extraBannerUrl || ''}
                                    onChange={handleChangeInjection(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <div>
                    <Button onClick={handleAddInjectionClick}>add</Button>
                </div>
            </div>

            <input type="submit" />
        </form>
    );
};
