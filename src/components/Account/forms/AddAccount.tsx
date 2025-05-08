/* eslint-disable import/no-extraneous-dependencies */
import React, {useEffect, useState} from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, ButtonIcon} from '@gravity-ui/uikit';
import {FieldArray, Form, Formik} from 'formik';

import {Routes} from '../../../utils/constants';
import {fetchGet} from '../../../utils/fetchHelpers';
import {CustomField} from '../../CustomField/CustomField';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddAccount = ({initialValues, onSubmit}: any) => {
    const [scenarios, setScenarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const json = await fetchGet({
                route: Routes.getScenarios,
                query: {},
                isProd: false,
            });

            setScenarios(json);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Account Form</h1>
            <Formik
                initialValues={
                    initialValues
                        ? initialValues
                        : {
                              slug: '',
                              enabled: true,
                              token: '',
                              availableScenarios: [],
                          }
                }
                onSubmit={(values) => {
                    // same shape as initial values
                    onSubmit?.(values);
                }}
            >
                {({values}) => (
                    <Form>
                        <CustomField type="text" name="slug" label="Slug" />
                        <CustomField type="checkbox" name="enabled" label="Enabled" />
                        <CustomField type="text" name="token" label="Token" />
                        <div style={{backgroundColor: '#111', padding: 20, marginBlockEnd: 20}}>
                            <h2>Scenarios</h2>
                            <FieldArray name="availableScenarios">
                                {({remove, push}) => (
                                    <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
                                        <select
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value, 10);
                                                if (
                                                    value &&
                                                    !values.availableScenarios.includes(value)
                                                ) {
                                                    push(value);
                                                }
                                                // eslint-disable-next-line no-param-reassign
                                                e.target.value = '';
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select Scenario
                                            </option>
                                            {scenarios
                                                .filter(
                                                    (opt) =>
                                                        !values.availableScenarios.includes(opt.id),
                                                )
                                                .map((opt) => (
                                                    <option key={opt.id} value={opt.id}>
                                                        {opt.slug} ({opt.id})
                                                    </option>
                                                ))}
                                        </select>
                                        {values.availableScenarios.map((id, index) => {
                                            const option = scenarios.find((opt) => opt.id === id);
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        border: '2px solid #f70',
                                                        padding: 12,
                                                        borderRadius: 18,
                                                        display: 'inline-flex',
                                                        gap: 10,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {option?.slug}
                                                    <Button onClick={() => remove(index)}>
                                                        <ButtonIcon>
                                                            <Xmark />
                                                        </ButtonIcon>
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <Button type="submit" view="action" size="xl">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
