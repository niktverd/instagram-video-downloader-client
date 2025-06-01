import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Button, Pagination} from '@gravity-ui/uikit';
import {useNavigate} from 'react-router-dom';

import {AppEnvContext} from '../../contexts/AppEnv';
import {
    GetCloudRunScenarioExecutionResponse,
    ICloudRunScenarioExecution,
} from '../../sharedTypes/types/cloudRunScenarioExecution';
import {FetchRoutes} from '../../utils/constants';
import {fetchGet} from '../../utils/fetchHelpers';

import styles from './cloudRunScenarioExecution.module.css';

const PAGE_SIZE = 10;

const List: React.FC = () => {
    const navigate = useNavigate();
    const {isProd} = useContext(AppEnvContext);
    const [executions, setExecutions] = useState<ICloudRunScenarioExecution[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // TODO: добавить фильтры (status, scenarioId, sourceId, accountId) если надо
    const loadExecutions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const query = {page, limit: PAGE_SIZE};
            const res = await fetchGet<GetCloudRunScenarioExecutionResponse>({
                route: FetchRoutes.getAllCloudRunScenarioExecution, // TODO: заменить на правильный route, если появится
                query,
                isProd,
            });
            setExecutions(res.executions || []);
            setTotal(res.count || 0);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            setError(e.message || 'Ошибка загрузки');
        } finally {
            setLoading(false);
        }
    }, [page, isProd]);

    useEffect(() => {
        loadExecutions();
    }, [loadExecutions]);

    return (
        <section className={styles.root}>
            <h3>Список запусков Cloud Run Scenario</h3>
            {/* TODO: добавить фильтры/поиск */}
            <div className={styles.section}>
                <Button view="action" onClick={() => navigate('new')}>
                    Создать запуск
                </Button>
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {executions.map((exec) => (
                        <tr key={exec.id}>
                            <td>{exec.id}</td>
                            <td>{exec.status}</td>
                            <td>
                                {exec.startedAt ? new Date(exec.startedAt).toLocaleString() : '-'}
                            </td>
                            <td>
                                <Button
                                    size="s"
                                    view="outlined"
                                    onClick={() => navigate(`${exec.id}`)}
                                >
                                    Подробнее
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {!executions.length && !loading && (
                        <tr>
                            <td colSpan={4} style={{textAlign: 'center'}}>
                                Нет данных
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={styles.section}>
                <Pagination
                    page={page}
                    pageSize={PAGE_SIZE}
                    total={total}
                    onUpdate={(p) => setPage(p)}
                />
            </div>
        </section>
    );
};

export {List};
