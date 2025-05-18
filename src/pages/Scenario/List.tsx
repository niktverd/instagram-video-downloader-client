import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Button, Table, TextInput, useToaster} from '@gravity-ui/uikit';
import {useNavigate} from 'react-router-dom';

import {AppEnvContext} from '../../contexts/AppEnv';
import {IScenario} from '../../sharedTypes';
import {Routes} from '../../utils/constants';
import {fetchDelete, fetchGet} from '../../utils/fetchHelpers';

export const List: React.FC = () => {
    const [scenarios, setScenarios] = useState<IScenario[]>([]);
    const [filterText, setFilterText] = useState('');
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);
    const navigate = useNavigate();

    const loadScenarios = useCallback(async () => {
        const json = await fetchGet({
            route: Routes.getScenarios,
            query: {},
            isProd,
        });
        setScenarios(json as IScenario[]);
    }, [isProd]);

    useEffect(() => {
        loadScenarios();
    }, [loadScenarios]);

    const handleCreateVideo = useCallback(async () => {
        const json = await fetchGet({
            route: Routes.createVideoByScenario,
            query: {},
            isProd,
        });
        add({
            name: Math.random() + '-create-video',
            title: JSON.stringify(json),
            theme: 'info',
        });
    }, [add, isProd]);

    const handleDelete = useCallback(
        async (id: string) => {
            await fetchDelete({
                route: Routes.deleteScenario,
                query: {id},
                isProd,
            });
            loadScenarios();
            add({
                name: Math.random() + '-delete-scenario',
                title: 'Scenario deleted successfully',
                theme: 'success',
            });
            navigate('/scenario');
        },
        [add, isProd, loadScenarios, navigate],
    );

    const filteredScenarios = scenarios.filter((scenario) => {
        if (!filterText) return true;
        const search = filterText.toLowerCase();
        return (
            scenario.slug.toLowerCase().includes(search) ||
            scenario.type.toLowerCase().includes(search)
        );
    });

    return (
        <div>
            <h2>Scenarios</h2>
            <div style={{display: 'flex', gap: '10px', marginBottom: '16px'}}>
                <Button view="action" onClick={loadScenarios}>
                    Get Data
                </Button>
                <Button view="outlined-action" href="/scenario/add">
                    add
                </Button>
                <Button view="outlined-action" onClick={handleCreateVideo}>
                    create video
                </Button>
                <TextInput
                    placeholder="Filter by name or type..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{minWidth: '300px'}}
                />
            </div>
            <Table
                data={filteredScenarios}
                columns={[
                    {id: 'slug', name: 'Slug'},
                    {id: 'type', name: 'Type'},
                    {id: 'id', name: 'ID'},
                    {
                        id: 'actions',
                        name: 'Actions',
                        template: (row: IScenario) => (
                            <>
                                <Button
                                    size="s"
                                    style={{marginRight: 8}}
                                    href={`/scenario/${row.id}/edit`}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="s"
                                    view="outlined-danger"
                                    onClick={() => handleDelete(String(row.id))}
                                >
                                    Delete
                                </Button>
                            </>
                        ),
                    },
                ]}
            />
        </div>
    );
};
