import React, {useCallback, useContext, useEffect, useState} from 'react';

import {ArrowLeft} from '@gravity-ui/icons';
import {Button, Icon, TextArea, TextInput, useToaster} from '@gravity-ui/uikit';
import {useNavigate, useParams} from 'react-router-dom';

import {AppEnvContext} from '../../contexts/AppEnv';
import {IInstagramLocation} from '../../sharedTypes/types/instagramLocation';
import {Routes} from '../../utils/constants';
import {fetchGet, fetchPatch, fetchPost} from '../../utils/fetchHelpers';

interface FormProps {
    mode?: 'create' | 'edit';
}

interface LocationFormData {
    externalId: string;
    externalIdSource?: string;
    name?: string;
    address?: string;
    lat?: number;
    lng?: number;
    group?: string;
}

const DEFAULT_LOCATION: LocationFormData = {
    externalId: '',
    externalIdSource: '',
    name: '',
    address: '',
    lat: undefined,
    lng: undefined,
    group: '',
};

const Form: React.FC<FormProps> = ({mode = 'create'}) => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);
    const [formMode, setFormMode] = useState<'single' | 'bulk'>('single');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<LocationFormData>(DEFAULT_LOCATION);
    const [bulkData, setBulkData] = useState<string>('');
    const [bulkError, setBulkError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const loadLocation = useCallback(async () => {
        if (mode !== 'edit' || !id) return;

        setLoading(true);
        try {
            const response = await fetchGet<IInstagramLocation>({
                route: Routes.getInstagramLocationById,
                query: {id: Number(id)},
                isProd,
            });

            if (response) {
                setFormData({
                    externalId: response.externalId || '',
                    externalIdSource: response.externalIdSource || '',
                    name: response.name || '',
                    address: response.address || '',
                    lat: response.lat,
                    lng: response.lng,
                    group: response.group || '',
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            add({
                name: 'load-error',
                title: err.message || 'Failed to load location',
                theme: 'danger',
            });
        } finally {
            setLoading(false);
        }
    }, [id, mode, isProd, add]);

    useEffect(() => {
        loadLocation();
    }, [loadLocation]);

    const handleInputChange =
        (field: keyof LocationFormData) => (value: string | number | undefined) => {
            setFormData((prev) => ({
                ...prev,
                [field]: field === 'lat' || field === 'lng' ? Number(value) || undefined : value,
            }));
        };

    const validateSingleForm = (): boolean => {
        if (!formData.externalId) {
            add({
                name: 'validation-error',
                title: 'External ID is required',
                theme: 'danger',
            });
            return false;
        }
        return true;
    };

    const parseBulkData = (): LocationFormData[] | null => {
        setBulkError(null);
        try {
            const parsed = JSON.parse(bulkData);

            if (!Array.isArray(parsed)) {
                setBulkError('Input must be a JSON array');
                return null;
            }

            for (const item of parsed) {
                if (!item.externalId) {
                    setBulkError('Each location must have an externalId');
                    return null;
                }
            }

            return parsed;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            setBulkError('Invalid JSON format');
            return null;
        }
    };

    const handleSubmit = async () => {
        if (submitting) return;

        if (formMode === 'single') {
            if (!validateSingleForm()) return;

            setSubmitting(true);
            try {
                if (mode === 'edit' && id) {
                    await fetchPatch({
                        route: Routes.updateInstagramLocation,
                        body: {
                            id: Number(id),
                            ...formData,
                        },
                        isProd,
                    });

                    add({
                        name: 'update-success',
                        title: 'Location updated successfully',
                        theme: 'success',
                    });
                } else {
                    await fetchPost({
                        route: Routes.createInstagramLocation,
                        body: formData,
                        isProd,
                    });

                    add({
                        name: 'create-success',
                        title: 'Location created successfully',
                        theme: 'success',
                    });
                }

                navigate('/instagram-locations');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                add({
                    name: 'submit-error',
                    title: err.message || 'Failed to save location',
                    theme: 'danger',
                });
            } finally {
                setSubmitting(false);
            }
        } else {
            // Bulk mode
            const locations = parseBulkData();
            if (!locations) return;

            setSubmitting(true);
            try {
                for (const location of locations) {
                    await fetchPost({
                        route: Routes.createInstagramLocation,
                        body: location,
                        isProd,
                    });
                }

                add({
                    name: 'bulk-success',
                    title: `${locations.length} locations imported successfully`,
                    theme: 'success',
                });

                navigate('/instagram-locations');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                add({
                    name: 'bulk-error',
                    title: err.message || 'Failed to import locations',
                    theme: 'danger',
                });
            } finally {
                setSubmitting(false);
            }
        }
    };

    const handleBack = () => {
        navigate('/instagram-locations');
    };

    return (
        <div style={{padding: 20, maxWidth: 800, margin: '0 auto'}}>
            <div style={{marginBottom: 20, display: 'flex', alignItems: 'center'}}>
                <Button
                    view="flat"
                    onClick={handleBack}
                    leftContent={<Icon data={ArrowLeft} />}
                    style={{marginRight: 16}}
                >
                    Back
                </Button>
                <h2>{mode === 'edit' ? 'Edit Location' : 'Create Location'}</h2>
            </div>

            {mode === 'create' && (
                <div style={{marginBottom: 20, display: 'flex', gap: 10}}>
                    <Button
                        view={formMode === 'single' ? 'action' : 'normal'}
                        onClick={() => setFormMode('single')}
                    >
                        Single Location
                    </Button>
                    <Button
                        view={formMode === 'bulk' ? 'action' : 'normal'}
                        onClick={() => setFormMode('bulk')}
                    >
                        Bulk Import
                    </Button>
                </div>
            )}

            {formMode === 'single' ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                    <div>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            External ID *
                        </label>
                        <TextInput
                            value={formData.externalId}
                            onUpdate={handleInputChange('externalId')}
                            placeholder="Enter external ID"
                            size="l"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            External ID Source
                        </label>
                        <TextInput
                            value={formData.externalIdSource || ''}
                            onUpdate={handleInputChange('externalIdSource')}
                            placeholder="Enter external ID source"
                            size="l"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Name
                        </label>
                        <TextInput
                            value={formData.name || ''}
                            onUpdate={handleInputChange('name')}
                            placeholder="Enter location name"
                            size="l"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Address
                        </label>
                        <TextInput
                            value={formData.address || ''}
                            onUpdate={handleInputChange('address')}
                            placeholder="Enter address"
                            size="l"
                            disabled={loading}
                        />
                    </div>

                    <div style={{display: 'flex', gap: 16}}>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                                Latitude
                            </label>
                            <TextInput
                                value={formData.lat?.toString() || ''}
                                onUpdate={handleInputChange('lat')}
                                placeholder="Enter latitude"
                                size="l"
                                disabled={loading}
                            />
                        </div>

                        <div style={{flex: 1}}>
                            <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                                Longitude
                            </label>
                            <TextInput
                                value={formData.lng?.toString() || ''}
                                onUpdate={handleInputChange('lng')}
                                placeholder="Enter longitude"
                                size="l"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Group
                        </label>
                        <TextInput
                            value={formData.group || ''}
                            onUpdate={handleInputChange('group')}
                            placeholder="Enter group"
                            size="l"
                            disabled={loading}
                        />
                    </div>
                </div>
            ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                    <div>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Bulk Import JSON (Array of locations)
                        </label>
                        <TextArea
                            value={bulkData}
                            onUpdate={setBulkData}
                            placeholder={`[
  {
    "externalId": "123456789",
    "externalIdSource": "instagram",
    "name": "Example Location",
    "address": "123 Main St",
    "lat": 40.7128,
    "lng": -74.0060,
    "group": "NYC"
  },
  {
    "externalId": "987654321",
    "externalIdSource": "instagram",
    "name": "Another Location",
    "address": "456 Broadway",
    "lat": 40.7580,
    "lng": -73.9855,
    "group": "NYC"
  }
]`}
                            size="l"
                            rows={15}
                            disabled={loading}
                        />
                        {bulkError && (
                            <div style={{color: '#c62828', marginTop: 8}}>{bulkError}</div>
                        )}
                    </div>
                </div>
            )}

            <div style={{marginTop: 24}}>
                <Button
                    view="action"
                    size="l"
                    onClick={handleSubmit}
                    loading={submitting}
                    disabled={loading || submitting}
                >
                    {mode === 'edit' ? 'Update' : 'Create'}
                </Button>
            </div>
        </div>
    );
};

export default Form;
