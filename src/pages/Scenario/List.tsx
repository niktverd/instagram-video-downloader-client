import React from 'react';

import {Button, Table, TextInput} from '@gravity-ui/uikit';

import {IScenario} from '../../sharedTypes';

interface ListProps {
    scenarios: IScenario[];
    filterText: string;
    onFilterTextChange: (v: string) => void;
    onLoad: () => void;
    onAdd: () => void;
    onCreateVideo: () => void;
    onDelete: (id: string | number) => void;
    onEdit: (scenario: IScenario) => void;
}

export const List: React.FC<ListProps> = ({
    scenarios,
    filterText,
    onFilterTextChange,
    onLoad,
    onAdd,
    onCreateVideo,
    onDelete,
    onEdit,
}) => {
    return (
        <div>
            <h2>Scenarios</h2>
            <div style={{display: 'flex', gap: '10px', marginBottom: '16px'}}>
                <Button view="action" onClick={onLoad}>
                    Get Data
                </Button>
                <Button view="outlined-action" onClick={onAdd}>
                    add
                </Button>
                <Button view="outlined-action" onClick={onCreateVideo}>
                    create video
                </Button>
                <TextInput
                    placeholder="Filter by name or type..."
                    value={filterText}
                    onChange={(e) => onFilterTextChange(e.target.value)}
                    style={{minWidth: '300px'}}
                />
            </div>
            <Table
                data={scenarios}
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
                                    onClick={() => onEdit(row)}
                                    style={{marginRight: 8}}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="s"
                                    view="outlined-danger"
                                    onClick={() => onDelete(String(row.id))}
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
