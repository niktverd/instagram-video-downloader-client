/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {Fragment, useContext, useEffect, useState} from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, ButtonIcon} from '@gravity-ui/uikit';

import {AppEnvContext} from '../../../contexts/AppEnv';
import {GetAllInstagramLocationsResponse, IInstagramLocation} from '../../../sharedTypes';
import {InstagramLocationSource, ScenarioType} from '../../../sharedTypes/types/enums';
import {Routes} from '../../../utils/constants';
import {fetchGet} from '../../../utils/fetchHelpers';
import {CustomField} from '../../CustomField/CustomField';

import {ScenarioTexts} from './components/ScenarioTexts';

type ScenarioFormCommonProps = {
    values: any;
    updateOnly?: boolean;
    setType?: any;
    setFieldValue?: (field: string, value: any) => void;
};

// Helper function to filter out unwanted fields from location objects
const filterLocationFields = (location: IInstagramLocation) => {
    const {id, externalId, externalIdSource, name, address, lat, lng, group} = location;
    return {
        id,
        externalId,
        externalIdSource,
        name,
        address,
        lat,
        lng,
        group,
    };
};

export const ScenarioFormCommon = ({
    values,
    updateOnly = false,
    setType,
    setFieldValue,
}: ScenarioFormCommonProps) => {
    const {isProd} = useContext(AppEnvContext);
    const [locations, setLocations] = useState<IInstagramLocation[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setType(values.type);
    }, [setType, values.type]);

    // Filter out unwanted fields from instagramLocations on initial load
    useEffect(() => {
        if (values.instagramLocations?.length && setFieldValue) {
            const filteredLocations = values.instagramLocations.map(filterLocationFields);
            setFieldValue('instagramLocations', filteredLocations);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Fetch Instagram locations
    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [isProd]);

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

                {/* Instagram Location Source Selector */}
                <div style={{marginTop: 20, marginBottom: 10}}>
                    <h3>Instagram Location Source</h3>
                    <div style={{marginTop: 10}}>
                        <CustomField
                            name="instagramLocationSource"
                            as="select"
                            label="Where to fetch Instagram locations from"
                        >
                            {Object.entries(InstagramLocationSource).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {key}
                                </option>
                            ))}
                        </CustomField>
                    </div>
                </div>

                {/* Instagram Locations Section */}
                <div style={{marginTop: 20}}>
                    <h3>Instagram Locations</h3>
                    <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10}}>
                        <select
                            onChange={(e) => {
                                const locationId = parseInt(e.target.value, 10);
                                if (
                                    locationId &&
                                    !values.instagramLocations?.some(
                                        (l: any) => l.id === locationId,
                                    )
                                ) {
                                    const locationToAdd = locations.find(
                                        (l) => l.id === locationId,
                                    );
                                    if (locationToAdd && setFieldValue) {
                                        setFieldValue('instagramLocations', [
                                            ...(values.instagramLocations || []),
                                            filterLocationFields(locationToAdd),
                                        ]);
                                    }
                                }
                                // eslint-disable-next-line no-param-reassign
                                e.target.value = '';
                            }}
                            disabled={loading}
                            style={{minWidth: 200, padding: 8}}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                {loading ? 'Loading locations...' : 'Select Instagram Location'}
                            </option>
                            {locations
                                .filter(
                                    (loc) =>
                                        !values.instagramLocations?.some(
                                            (l: any) => l.id === loc.id,
                                        ),
                                )
                                .map((loc) => (
                                    <option key={loc.id} value={loc.id}>
                                        {loc.name || loc.externalId} ({loc.id})
                                    </option>
                                ))}
                        </select>

                        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10}}>
                            {(values.instagramLocations || []).map(
                                (locationRef: any, index: number) => {
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
                                                : locationRef.name ||
                                                  locationRef.externalId ||
                                                  locationRef.id}
                                            {setFieldValue && (
                                                <Button
                                                    onClick={() => {
                                                        const newLocations = [
                                                            ...(values.instagramLocations || []),
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
                                            )}
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
