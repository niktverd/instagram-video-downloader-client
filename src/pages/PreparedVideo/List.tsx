import React, {useCallback, useContext, useEffect, useState} from 'react';

import {
    Button,
    Pagination,
    Select,
    Table,
    TableColumnConfig,
    TableDataItem,
    withTableActions,
    withTableSelection,
    withTableSorting,
} from '@gravity-ui/uikit';
import {useNavigate} from 'react-router-dom';

import {AppEnvContext} from '../../contexts/AppEnv';
import {GetAllPreparedVideosResponse, IPreparedVideo} from '../../sharedTypes/types/preparedVideo';
import {Routes} from '../../utils/constants';
import {fetchGet} from '../../utils/fetchHelpers';

const EnhancedTable = withTableSelection(withTableSorting(withTableActions(Table)));

const List: React.FC = () => {
    const navigate = useNavigate();
    const [preparedVideos, setPreparedVideos] = useState<IPreparedVideo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sortOrder, setSortOrder] = useState({
        columnId: 'id',
        order: 'desc' as 'asc' | 'desc',
    });
    const {isProd} = useContext(AppEnvContext);

    const loadPreparedVideos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchGet<GetAllPreparedVideosResponse>({
                route: Routes.getAllPreparedVideos,
                query: {
                    page,
                    limit: pageSize,
                    sortBy: sortOrder.columnId,
                    sortOrder: sortOrder.order,
                },
                isProd,
            });
            setPreparedVideos(response.preparedVideos || []);
            setTotalItems(response.count || 0);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to load prepared videos');
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, sortOrder, isProd]);

    useEffect(() => {
        loadPreparedVideos();
    }, [loadPreparedVideos]);

    const handlePageChange = (newPage: number) => setPage(newPage);
    const handlePageSizeChange = ([value]: string[]) => {
        setPageSize(Number(value));
        setPage(1);
    };
    const handleSortChange = (sort: {column: string; order: 'asc' | 'desc'}) => {
        setSortOrder({columnId: sort.column, order: sort.order});
    };

    const columns: TableColumnConfig<TableDataItem>[] = [
        {id: 'id', name: 'id'},
        {
            id: 'firebaseUrl',
            name: 'URL',
            template: (item: IPreparedVideo) => (
                <a href={item.firebaseUrl} target="_blank" rel="noopener noreferrer">
                    watch
                </a>
            ),
        },
        {
            id: 'duration',
            name: 'Duration',
            template: (item: IPreparedVideo) => (item.duration ? `${item.duration}s` : '-'),
        },
        {id: 'scenarioId', name: 'Scenario ID'},
        {id: 'sourceId', name: 'Source ID'},
        {id: 'accountId', name: 'Account ID'},
        {
            id: 'actions',
            name: 'Actions',
            template: () => null,
        },
    ];

    return (
        <div style={{padding: 20, maxWidth: 1200, margin: '0 auto'}}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <h2>Prepared Videos</h2>
                <Button view="action" onClick={loadPreparedVideos} loading={loading}>
                    Refresh
                </Button>
            </div>
            <div style={{marginBottom: 20}}>
                <Select
                    label="Page size:"
                    value={[pageSize.toString()]}
                    onUpdate={handlePageSizeChange}
                    filterable={false}
                >
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="5">5</Select.Option>
                    <Select.Option value="10">10</Select.Option>
                    <Select.Option value="25">25</Select.Option>
                    <Select.Option value="50">50</Select.Option>
                </Select>
            </div>
            {error && (
                <div
                    style={{
                        padding: 12,
                        background: '#ffebee',
                        color: '#c62828',
                        borderRadius: 4,
                        marginBottom: 20,
                    }}
                >
                    {error}
                </div>
            )}
            <EnhancedTable
                data={preparedVideos}
                columns={columns}
                getRowId={(item) => item.id}
                sortState={[{column: sortOrder.columnId, order: sortOrder.order}]}
                onSortStateChange={(sort) => handleSortChange(sort[0])}
                // loading={loading}
                emptyMessage="No prepared videos found"
                onSelectionChange={() => {}}
                selectedIds={[]}
                onRowClick={(row) => {
                    navigate(`/prepared-video/${row.id}`);
                }}
            />
            <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    total={totalItems}
                    onUpdate={handlePageChange}
                />
            </div>
        </div>
    );
};

export default List;
