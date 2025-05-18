import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Button, Modal, Table, TextInput, useToaster} from '@gravity-ui/uikit';
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

    // State for delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteScenario, setDeleteScenario] = useState<IScenario | null>(null);
    const [deleteInput, setDeleteInput] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

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

    const openDeleteDialog = (scenario: IScenario) => {
        setDeleteScenario(scenario);
        setDeleteInput('');
        setDeleteDialogOpen(true);
    };

    const handleDelete = useCallback(async () => {
        if (!deleteScenario) {
            return;
        }
        setDeleteLoading(true);
        await fetchDelete({
            route: Routes.deleteScenario,
            query: {id: deleteScenario.id},
            isProd,
        });
        setDeleteDialogOpen(false);
        setDeleteScenario(null);
        setDeleteInput('');
        setDeleteLoading(false);
        loadScenarios();
        add({
            name: Math.random() + '-delete-scenario',
            title: 'Scenario deleted successfully',
            theme: 'success',
        });
        navigate('/scenario');
    }, [add, isProd, loadScenarios, navigate, deleteScenario]);

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
                                    onClick={() => openDeleteDialog(row)}
                                >
                                    Delete
                                </Button>
                            </>
                        ),
                    },
                ]}
            />
            <Modal open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <div style={{padding: 24, minWidth: 350}}>
                    <h3>Confirm Deletion</h3>
                    {deleteScenario && (
                        <>
                            <p>
                                To confirm deletion, type the scenario slug:{' '}
                                <b style={{color: 'orange'}}>{deleteScenario.slug}</b>
                            </p>
                            <TextInput
                                value={deleteInput}
                                onChange={(e) => setDeleteInput(e.target.value)}
                                placeholder="Enter scenario slug"
                                style={{width: '100%', marginBottom: 16}}
                                autoFocus
                            />
                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                                <Button
                                    view="flat"
                                    onClick={() => setDeleteDialogOpen(false)}
                                    disabled={deleteLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    view="outlined-danger"
                                    loading={deleteLoading}
                                    disabled={deleteInput !== deleteScenario.slug}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};
