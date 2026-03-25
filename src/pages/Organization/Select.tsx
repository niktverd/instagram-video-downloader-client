import React, {useCallback, useEffect, useState} from 'react';

import {Button, Card, Text, useToaster} from '@gravity-ui/uikit';
import {uniq} from 'lodash';
import {useNavigate} from 'react-router-dom';

import {keycloak} from '../../configs/keycloakApi';
import {useAuth} from '../../contexts/AuthContext';
import {useOrganization} from '../../contexts/OrganizationContext';

import cn from './Organization.module.css';

export const Select = () => {
    const [organizations, setOrganizations] = useState<{id: string; name: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {add} = useToaster();
    const {setOrganization} = useOrganization();
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    const handleLoadOrganizations = useCallback(async () => {
        if (!currentUser?.uid && !keycloak.tokenParsed) {
            console.log('No user or token', keycloak.tokenParsed);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const tokenOrgs = keycloak.tokenParsed?.groups || [];
            let orgsArray = Array.isArray(tokenOrgs) ? tokenOrgs : [];
            if (!Array.isArray(tokenOrgs) && typeof tokenOrgs === 'object') {
                orgsArray = Object.keys(tokenOrgs);
            }
            const firstLevelOrgs = orgsArray
                .map((org: string) => org.split('/')[1])
                .filter(Boolean);

            const mappedOrgs = uniq(firstLevelOrgs).map((org: string) => ({
                id: org,
                name: org,
            }));

            setOrganizations(mappedOrgs);
        } catch {
            setError('Failed to load organizations. Please try again.');
            add({
                name: 'organization-load-error',
                title: 'Error',
                theme: 'danger',
                content: 'Failed to load organizations',
            });
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [add, currentUser?.uid, keycloak.tokenParsed]);

    useEffect(() => {
        handleLoadOrganizations();
    }, [handleLoadOrganizations]);

    const handleOrganizationSelect = useCallback(
        (organization: {id: string; name: string}) => {
            setOrganization(organization.id, organization.name);
            add({
                name: 'organization-selected',
                title: 'Success',
                theme: 'success',
                content: `Selected organization: ${organization.name}`,
            });
            navigate('/');
        },
        [setOrganization, add, navigate],
    );

    if (loading) {
        return (
            <div className={cn.container}>
                <div className={cn.header}>
                    <h2>Select Organization</h2>
                </div>
                <div style={{textAlign: 'center', padding: '2rem'}}>
                    <Text variant="body-1">Loading organizations...</Text>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn.container}>
                <div className={cn.header}>
                    <h2>Select Organization</h2>
                </div>
                <div style={{textAlign: 'center', padding: '2rem'}}>
                    <Text variant="body-1" color="danger">
                        {error}
                    </Text>
                    <div style={{marginTop: '1rem'}}>
                        <Button view="outlined-action" onClick={handleLoadOrganizations}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (organizations.length === 0) {
        return (
            <div className={cn.container}>
                <div className={cn.header}>
                    <h2>Select Organization</h2>
                </div>
                <div style={{textAlign: 'center', padding: '2rem'}}>
                    <Text variant="body-1">
                        You don&apos;t have access to any organizations. Please contact your
                        administrator.
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className={cn.container}>
            <div className={cn.header}>
                <h2>Select Organization</h2>
                <div className={cn.actions}>
                    <Button view="outlined-action" onClick={handleLoadOrganizations}>
                        Refresh
                    </Button>
                </div>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1rem',
                    padding: '1rem 0',
                }}
            >
                {organizations.map((organization) => (
                    <Card
                        key={organization.id}
                        view="outlined"
                        style={{cursor: 'pointer'}}
                        onClick={() => handleOrganizationSelect(organization)}
                    >
                        <div style={{padding: '1rem'}}>
                            <Text variant="header-2" style={{marginBottom: '0.5rem'}}>
                                {organization.name}
                            </Text>
                            <Text variant="body-1" color="secondary">
                                ID: {organization.id}
                            </Text>
                            <div style={{marginTop: '1rem'}}>
                                <Button
                                    view="action"
                                    size="s"
                                    onClick={() => handleOrganizationSelect(organization)}
                                >
                                    Select Organization
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
