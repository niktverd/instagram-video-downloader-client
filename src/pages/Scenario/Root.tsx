import React, {useCallback, useContext, useEffect, useState} from 'react';

import {useToaster} from '@gravity-ui/uikit';
import {Route, Routes as RouterRoutes, useNavigate} from 'react-router-dom';

import {AppEnvContext} from '../../contexts/AppEnv';
import {GetAllScenariosResponse, IScenario} from '../../sharedTypes';
import {Routes} from '../../utils/constants';
import {fetchDelete, fetchGet, fetchPatch, fetchPost} from '../../utils/fetchHelpers';

import {Form, List, Overview} from './';

export const Root = () => {
    const [scenarios, setScenarios] = useState<IScenario[]>([]);
    const [filterText, setFilterText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editScenario, setEditScenario] = useState<IScenario | null>(null);
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);
    const navigate = useNavigate();

    const loadScenarios = useCallback(async () => {
        const json = await fetchGet<GetAllScenariosResponse>({
            route: Routes.getScenarios,
            query: {},
            isProd,
        });
        setScenarios(json);
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

    const handleUpdate = useCallback(
        async (values: IScenario) => {
            await fetchPatch({
                route: Routes.patchScenario,
                body: {...values},
                isProd,
            });
            loadScenarios();
            add({
                name: Math.random() + '-update-scenario',
                title: 'Scenario updated successfully',
                theme: 'success',
            });
        },
        [add, isProd, loadScenarios],
    );

    const handleAdd = () => {
        setEditScenario(null);
        setModalOpen(true);
    };

    const handleEdit = (scenario: IScenario) => {
        setEditScenario(scenario);
        setModalOpen(true);
    };

    const handleFormSubmit = async (values: IScenario) => {
        if (editScenario) {
            await handleUpdate(values);
        } else {
            await fetchPost({
                route: Routes.addScenario,
                body: {...values},
                isProd,
            });
            loadScenarios();
            add({
                name: Math.random() + '-add-scenario',
                title: 'Scenario added successfully',
                theme: 'success',
            });
        }
        setModalOpen(false);
        setEditScenario(null);
    };

    const filteredScenarios = scenarios.filter((scenario) => {
        if (!filterText) return true;
        const search = filterText.toLowerCase();
        return (
            scenario.slug.toLowerCase().includes(search) ||
            scenario.type.toLowerCase().includes(search)
        );
    });

    return (
        <RouterRoutes>
            <Route
                path=""
                element={
                    <>
                        <List
                            scenarios={filteredScenarios}
                            filterText={filterText}
                            onFilterTextChange={setFilterText}
                            onLoad={loadScenarios}
                            onAdd={handleAdd}
                            onCreateVideo={handleCreateVideo}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                        {modalOpen && (
                            <Form
                                initialValues={editScenario || undefined}
                                onSubmit={handleFormSubmit}
                            />
                        )}
                    </>
                }
            />
            <Route
                path=":id"
                element={
                    <Overview
                        scenario={
                            scenarios.find(
                                (s) =>
                                    String(s.id) ===
                                    String(window.location.pathname.split('/').pop()),
                            ) as IScenario
                        }
                        onDelete={
                            window.location.pathname.split('/').pop()
                                ? () =>
                                      handleDelete(
                                          String(window.location.pathname.split('/').pop()),
                                      )
                                : undefined
                        }
                        onUpdate={handleUpdate}
                    />
                }
            />
        </RouterRoutes>
    );
};
