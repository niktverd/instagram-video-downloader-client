import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Button, Card, Modal, useToaster} from '@gravity-ui/uikit';
import {useNavigate, useParams} from 'react-router-dom';

import {ScenarioRouter} from '../../components/Scenario/forms/ScenarioRouter';
import {AppEnvContext} from '../../contexts/AppEnv';
import {IScenario} from '../../sharedTypes';
import {Routes} from '../../utils/constants';
import {fetchDelete, fetchGet, fetchPatch} from '../../utils/fetchHelpers';

export const Overview: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [scenario, setScenario] = useState<IScenario | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);
    const navigate = useNavigate();

    const loadScenario = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const json = await fetchGet({
                route: Routes.getScenario,
                query: {id},
                isProd,
            });
            setScenario(json as IScenario);
        } catch {
            setError('Failed to load scenario');
        } finally {
            setLoading(false);
        }
    }, [id, isProd]);

    useEffect(() => {
        if (id) loadScenario();
    }, [id, loadScenario]);

    const handleDelete = useCallback(async () => {
        if (!id) return;
        await fetchDelete({
            route: Routes.deleteScenario,
            query: {id},
            isProd,
        });
        add({
            name: Math.random() + '-delete-scenario',
            title: 'Scenario deleted successfully',
            theme: 'success',
        });
        navigate('/scenario');
    }, [id, isProd, add, navigate]);

    const handleUpdate = useCallback(
        async (values: IScenario) => {
            await fetchPatch({
                route: Routes.patchScenario,
                body: {...values, id},
                isProd,
            });
            add({
                name: Math.random() + '-update-scenario',
                title: 'Scenario updated successfully',
                theme: 'success',
            });
            loadScenario();
        },
        [add, isProd, loadScenario, id],
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!scenario) return <div>Not found</div>;

    const {slug, ...extra} = scenario;

    return (
        <Card type="container" view="outlined">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <h2>{slug}</h2>
                    <p style={{color: '#888'}}>{id}</p>
                </div>
                <div style={{display: 'flex', gap: 8}}>
                    <Button onClick={() => setOpenModal(true)}>Edit</Button>
                    <Button view="outlined-danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button view="flat" onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Hide' : 'Show'} details
                    </Button>
                </div>
            </div>
            {expanded && (
                <div style={{marginTop: 16}}>
                    <pre>{JSON.stringify(extra, null, 2)}</pre>
                </div>
            )}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ScenarioRouter
                    initialValues={{...extra, slug, id}}
                    onSubmit={async (values: IScenario) => {
                        await handleUpdate(values);
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </Card>
    );
};
