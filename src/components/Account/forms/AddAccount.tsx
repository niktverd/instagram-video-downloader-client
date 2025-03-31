/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {Button, Checkbox} from '@gravity-ui/uikit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddAccount = ({initialValues, onSubmit}: any) => {
    const [values, setValues] = useState(initialValues || {});

    const onSubmitLocal: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit?.(values);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.name;
        setValues({...values, [name]: event.target.value});
    };

    const handleDeleteAvailableScenario = (index: number) => {
        setValues({
            ...values,
            availableScenarios: values.availableScenarios?.filter(
                (_val, idx: number) => idx !== index,
            ),
        });
    };

    const handleScenarioChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = Number(event.target.name);
        const availableScenarios = [...values.availableScenarios];
        availableScenarios[name] = event.target.value;
        setValues({...values, availableScenarios});
    };

    return (
        <form onSubmit={onSubmitLocal}>
            <div>
                <label htmlFor="id">ID</label>
                <input
                    name="id"
                    type="text"
                    value={values.id}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="token">Token</label>
                <input
                    name="token"
                    type="text"
                    value={values['token']}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="accountBackgrounMusic">accountBackgrounMusic</label>
                <input
                    name="accountBackgrounMusic"
                    type="text"
                    value={values['accountBackgrounMusic']}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>

            <div>
                <h4>scenarios</h4>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                {values.availableScenarios?.map((scenario, index) => {
                    return (
                        <div key={`${scenario}-${index}`}>
                            <input name={index} value={scenario} onChange={handleScenarioChange} />
                            <Button onClick={() => handleDeleteAvailableScenario(index)}>
                                delete
                            </Button>
                        </div>
                    );
                })}
                <Button
                    onClick={() => {
                        setValues({
                            ...values,
                            availableScenarios: [...(values.availableScenarios || []), ''].filter(
                                (val) => typeof val === 'string',
                            ),
                        });
                    }}
                >
                    add
                </Button>
            </div>
            <div>
                <Checkbox
                    checked={values.disabled}
                    content="Disabled"
                    onUpdate={(checked) => setValues({...values, disabled: checked})}
                />
            </div>

            <input type="submit" />
        </form>
    );
};
