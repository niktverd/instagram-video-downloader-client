/* eslint-disable import/no-extraneous-dependencies */
import React, {useContext, useEffect, useState} from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, ButtonIcon} from '@gravity-ui/uikit';
import {Form, Formik} from 'formik';

import {AppEnvContext} from '../../../contexts/AppEnv';
import {
    GetAllInstagramLocationsResponse,
    GetAllScenariosResponse,
    IInstagramLocation,
    IScenario,
} from '../../../sharedTypes';
import {Routes} from '../../../utils/constants';
import {fetchGet} from '../../../utils/fetchHelpers';
import {CustomField} from '../../CustomField/CustomField';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddAccount = ({initialValues, onSubmit}: any) => {
    const [scenarios, setScenarios] = useState<IScenario[]>([]);
    const [locations, setLocations] = useState<IInstagramLocation[]>([]);
    const {isProd} = useContext(AppEnvContext);

    useEffect(() => {
        const fetchData = async () => {
            // Get scenarios
            const scenariosData = await fetchGet<GetAllScenariosResponse>({
                route: Routes.getScenarios,
                query: {},
                isProd,
            });
            setScenarios(scenariosData);

            // Get locations
            try {
                const locationsData = await fetchGet<GetAllInstagramLocationsResponse>({
                    route: Routes.getAllInstagramLocations,
                    query: {},
                    isProd,
                });
                setLocations(locationsData.locations || []);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Failed to load Instagram locations:', err);
            }
        };

        fetchData();
    }, [isProd]);

    // Prepare initial form values with default arrays
    const defaultValues = {
        slug: '',
        enabled: true,
        token: '',
        availableScenarios: [],
        instagramLocations: [],
    };

    // Ensure that initial values have the required arrays
    const preparedInitialValues = initialValues
        ? {
              ...defaultValues,
              ...initialValues,
              availableScenarios: initialValues.availableScenarios || [],
              instagramLocations: initialValues.instagramLocations || [],
          }
        : defaultValues;

    // Transform form data before submitting
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (values: any) => {
        onSubmit?.(values);
    };

    return (
        <div>
            <h1>Account Form</h1>
            <Formik initialValues={preparedInitialValues} onSubmit={handleSubmit}>
                {({values, setFieldValue}) => (
                    <Form>
                        <CustomField type="text" name="slug" label="Slug" />
                        <CustomField type="checkbox" name="enabled" label="Enabled" />
                        <CustomField type="text" name="token" label="Token" />

                        {/* Scenarios Section */}
                        <div style={{backgroundColor: '#111', padding: 20, marginBlockEnd: 20}}>
                            <h2>Scenarios</h2>
                            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
                                <select
                                    onChange={(e) => {
                                        const scenarioId = parseInt(e.target.value, 10);
                                        if (
                                            scenarioId &&
                                            !values.availableScenarios.some(
                                                (s) => s.id === scenarioId,
                                            )
                                        ) {
                                            const scenarioToAdd = scenarios.find(
                                                (s) => s.id === scenarioId,
                                            );
                                            if (scenarioToAdd) {
                                                setFieldValue('availableScenarios', [
                                                    ...values.availableScenarios,
                                                    {
                                                        id: scenarioToAdd.id,
                                                        slug: scenarioToAdd.slug,
                                                        type: scenarioToAdd.type,
                                                    },
                                                ]);
                                            }
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
                                                !values.availableScenarios.some(
                                                    (s) => s.id === opt.id,
                                                ),
                                        )
                                        .map((opt) => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.slug} ({opt.id})
                                            </option>
                                        ))}
                                </select>
                                {values.availableScenarios.map((scenarioRef, index) => {
                                    const scenario = scenarios.find((s) => s.id === scenarioRef.id);
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
                                            {scenario ? scenario.slug : scenarioRef.id}
                                            <Button
                                                onClick={() => {
                                                    const newScenarios = [
                                                        ...values.availableScenarios,
                                                    ];
                                                    newScenarios.splice(index, 1);
                                                    setFieldValue(
                                                        'availableScenarios',
                                                        newScenarios,
                                                    );
                                                }}
                                            >
                                                <ButtonIcon>
                                                    <Xmark />
                                                </ButtonIcon>
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Instagram Locations Section */}
                        <div style={{backgroundColor: '#111', padding: 20, marginBlockEnd: 20}}>
                            <h2>Instagram Locations</h2>
                            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
                                <select
                                    onChange={(e) => {
                                        const locationId = parseInt(e.target.value, 10);
                                        if (
                                            locationId &&
                                            !values.instagramLocations.some(
                                                (l) => l.id === locationId,
                                            )
                                        ) {
                                            const locationToAdd = locations.find(
                                                (l) => l.id === locationId,
                                            );
                                            if (locationToAdd) {
                                                setFieldValue('instagramLocations', [
                                                    ...values.instagramLocations,
                                                    {
                                                        id: locationToAdd.id,
                                                        externalId: locationToAdd.externalId,
                                                        name: locationToAdd.name,
                                                        address: locationToAdd.address,
                                                        lat: locationToAdd.lat,
                                                        lng: locationToAdd.lng,
                                                        group: locationToAdd.group,
                                                    },
                                                ]);
                                            }
                                        }
                                        // eslint-disable-next-line no-param-reassign
                                        e.target.value = '';
                                    }}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select Instagram Location
                                    </option>
                                    {locations
                                        .filter(
                                            (loc) =>
                                                !values.instagramLocations.some(
                                                    (l) => l.id === loc.id,
                                                ),
                                        )
                                        .map((loc) => (
                                            <option key={loc.id} value={loc.id}>
                                                {loc.name || loc.externalId} ({loc.id})
                                            </option>
                                        ))}
                                </select>
                                {values.instagramLocations.map((locationRef, index) => {
                                    const location = locations.find((l) => l.id === locationRef.id);
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                border: '2px solid #2196f3',
                                                padding: 12,
                                                borderRadius: 18,
                                                display: 'inline-flex',
                                                gap: 10,
                                                alignItems: 'center',
                                            }}
                                        >
                                            {location
                                                ? location.name || location.externalId
                                                : locationRef.id}
                                            <Button
                                                onClick={() => {
                                                    const newLocations = [
                                                        ...values.instagramLocations,
                                                    ];
                                                    newLocations.splice(index, 1);
                                                    setFieldValue(
                                                        'instagramLocations',
                                                        newLocations,
                                                    );
                                                }}
                                            >
                                                <ButtonIcon>
                                                    <Xmark />
                                                </ButtonIcon>
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
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
