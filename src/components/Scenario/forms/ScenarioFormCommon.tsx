/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import React, {Fragment, useCallback, useState} from 'react';

import {Button, Checkbox, Select, useToaster} from '@gravity-ui/uikit';
import {omit} from 'lodash';

import {ScenarioType} from '../../../types';

type ScenarioFormCommonProps = {
    values: any;
    setValues: any;
    setType: any;
};

export const ScenarioFormCommon = ({values, setValues, setType}: ScenarioFormCommonProps) => {
    // eslint-disable-next-line no-console
    console.log('ScenarioFormCommon', {values});
    const [textArrayName, setTextArrayName] = useState('');

    const {add} = useToaster();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.name;
        setValues({...values, [name]: event.target.value});
    };

    const handleAddTextArrayClick = () => {
        if (!textArrayName) {
            // eslint-disable-next-line no-console
            console.error('textArrayName must not be empty');
            add({
                name: Math.random() + 'textArrayName_must_not_be_empty',
                content: 'textArrayName must not be empty',
            });
            return;
        }

        if (values?.texts?.[textArrayName]) {
            // eslint-disable-next-line no-console
            console.error('textArrayName is already in texts');
            add({
                name: Math.random() + 'textArrayName_is_already_in_texts',
                content: 'textArrayName is already in texts',
            });
            return;
        }

        setValues({...values, texts: {...(values.texts || {}), [textArrayName]: []}});
        setTextArrayName('');
    };

    const handleAddOneTextClick = (key: string) => () => {
        const vals = values.texts?.[key] || [];
        setValues({...values, texts: {...values.texts, [key]: [...vals, '']}});
    };

    const handleDeleteOneTextClick = (key: string) => () => {
        const texts = {...values.texts};
        setValues({...values, texts: omit(texts, key)});
    };

    const handleSelectScenarioType = useCallback(
        ([value]: string[]) => {
            setValues({...values, type: value as ScenarioType});
            setType(value);
        },
        [setType, setValues, values],
    );

    const handleChangeOneText =
        (key: string, index: number): React.ChangeEventHandler<HTMLInputElement> =>
        (event) => {
            const texts = {...values.texts};
            const topic = [...texts[key]];
            topic[index] = event.target.value;

            texts[key] = topic;

            setValues({...values, texts});
        };

    return (
        <Fragment>
            <div style={{border: '1px solid white', padding: 10, marginBlock: 20}}>
                <div>
                    <label htmlFor="slug">Name</label>
                    <input
                        name="slug"
                        type="text"
                        value={values.slug}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <Select
                        filterable={true}
                        label="Scenario Type"
                        onUpdate={handleSelectScenarioType}
                        value={[values.type]}
                    >
                        {Object.entries(ScenarioType).map(([key, value]) => {
                            return (
                                <Select.Option key={key} value={value}>
                                    {key}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </div>
                <div>
                    <Checkbox
                        checked={values.enabled}
                        content="Enabled"
                        onUpdate={(checked) => setValues({...values, enabled: checked})}
                    />
                </div>
                <div>
                    <Checkbox
                        checked={values.onlyOnce}
                        content="Use each video only once"
                        onUpdate={(checked) => setValues({...values, onlyOnce: checked})}
                    />
                </div>
                <div>
                    <h4>Texts</h4>
                    <div>
                        <input
                            value={textArrayName}
                            onChange={(event) => setTextArrayName(event.target.value)}
                        />
                        <Button onClick={handleAddTextArrayClick}>add array</Button>
                    </div>
                    {Object.entries(values.texts || {}).map(([key, vals = []]) => {
                        return (
                            <div key={key}>
                                <h5>{key}</h5>
                                <div>
                                    <Button onClick={handleAddOneTextClick(key)}>add</Button>
                                    <Button onClick={handleDeleteOneTextClick(key)}>delete</Button>
                                </div>
                                <div>
                                    {(vals as string[]).map((val, indx) => {
                                        return (
                                            <div key={indx + val}>
                                                <input
                                                    value={val}
                                                    onChange={handleChangeOneText(key, indx)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};
