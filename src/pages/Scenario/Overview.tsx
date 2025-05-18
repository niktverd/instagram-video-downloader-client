import React, {useState} from 'react';

import {Button, Card, Modal} from '@gravity-ui/uikit';

import {ScenarioRouter} from '../../components/Scenario/forms/ScenarioRouter';
import {IScenario} from '../../sharedTypes';

interface OverviewProps {
    scenario: IScenario;
    onDelete?: () => void;
    onUpdate?: (values: IScenario) => void;
}

export const Overview: React.FC<OverviewProps> = ({scenario, onDelete, onUpdate}) => {
    const [openModal, setOpenModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const {slug, id, ...extra} = scenario;
    return (
        <Card type="container" view="outlined">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <h2>{slug}</h2>
                    <p style={{color: '#888'}}>{id}</p>
                </div>
                <div style={{display: 'flex', gap: 8}}>
                    <Button onClick={() => setOpenModal(true)}>Edit</Button>
                    {onDelete && (
                        <Button view="outlined-danger" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
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
                        if (onUpdate) onUpdate({...values, id});
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </Card>
    );
};
