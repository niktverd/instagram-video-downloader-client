/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback, useContext, useEffect, useState} from 'react';

import {ArrowLeft, ChevronDown, ChevronUp} from '@gravity-ui/icons';
import {
    Button,
    Card,
    Flex,
    Icon,
    Spin,
    Tab,
    TabList,
    TabPanel,
    TabProvider,
    Text,
} from '@gravity-ui/uikit';
import {useNavigate, useParams} from 'react-router-dom';

import {AppEnvContext} from '../contexts/AppEnv';
import {Routes} from '../utils/constants';
import {fetchGet} from '../utils/fetchHelpers';

interface SourceData {
    id: string;
    name: string;
    url: string;
    type: string;
    description?: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    firebaseUrl?: string;
    sender?: string;
    recipient?: string;
    duration?: number;
    sources?: Record<string, any>;
    bodyJSONString?: Record<string, any>;
}

export const SourceDetails = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [source, setSource] = useState<SourceData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {isProd} = useContext(AppEnvContext);
    const [activeSourceTab, setActiveSourceTab] = useState<string>('');
    const [jsonExpanded, setJsonExpanded] = useState(false);

    const fetchSourceDetails = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetchGet({
                route: Routes.getOneSource,
                query: {id},
                isProd,
            });

            if (response.error) {
                setError(response.error);
            } else {
                setSource(response || null);
                if (response.sources && Object.keys(response.sources).length > 0) {
                    setActiveSourceTab(Object.keys(response.sources)[0]);
                }
            }
        } catch (err) {
            setError(err.message || 'Failed to load source details');
        } finally {
            setLoading(false);
        }
    }, [id, isProd]);

    useEffect(() => {
        fetchSourceDetails();
    }, [fetchSourceDetails]);

    const handleBack = () => {
        navigate('/sources');
    };

    const toggleJsonExpanded = () => {
        setJsonExpanded(!jsonExpanded);
    };

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', padding: '40px'}}>
                <Spin size="l" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <Button
                    view="flat"
                    onClick={handleBack}
                    leftContent={<Icon data={ArrowLeft} />}
                    style={{marginBottom: '20px'}}
                >
                    Back to Sources
                </Button>
                <Card>
                    <Text variant="subheader-1">Error</Text>
                    <Text>{error}</Text>
                    <Button
                        view="action"
                        size="m"
                        onClick={fetchSourceDetails}
                        style={{marginTop: '16px'}}
                    >
                        Retry
                    </Button>
                </Card>
            </div>
        );
    }

    if (!source) {
        return (
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <Button
                    view="flat"
                    onClick={handleBack}
                    leftContent={<Icon data={ArrowLeft} />}
                    style={{marginBottom: '20px'}}
                >
                    Back to Sources
                </Button>
                <Card>
                    <Text variant="subheader-1">Source not found</Text>
                    <Text>The requested source could not be found.</Text>
                </Card>
            </div>
        );
    }

    const sourceTabs = source.sources
        ? Object.keys(source.sources).map((key) => ({
              id: key,
              title: key,
              content: (
                  <div
                      style={{
                          padding: '12px',
                          borderRadius: '4px',
                          marginTop: '12px',
                      }}
                  >
                      <pre style={{overflowX: 'auto'}}>
                          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                          {JSON.stringify(source.sources![key], null, 2)}
                      </pre>
                  </div>
              ),
          }))
        : [];

    return (
        <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <Button
                view="flat"
                onClick={handleBack}
                leftContent={<Icon data={ArrowLeft} />}
                style={{marginBottom: '20px'}}
            >
                Back to Sources
            </Button>

            <Card className="source-details-card">
                <Flex direction="column" gap={4} style={{padding: '20px'}}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text variant="header-1">{source.name}</Text>
                        <Text color="secondary">{source.type}</Text>
                    </Flex>

                    <div style={{marginTop: '20px'}}>
                        <Text variant="subheader-2">URL</Text>
                        <Text as="a" href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.url}
                        </Text>
                    </div>

                    {source.firebaseUrl && (
                        <div style={{marginTop: '20px'}}>
                            <Text variant="subheader-2">Video Preview</Text>
                            <video
                                controls
                                style={{
                                    width: '100%',
                                    maxHeight: '400px',
                                    borderRadius: '8px',
                                    marginTop: '8px',
                                }}
                                src={source.firebaseUrl}
                            />
                        </div>
                    )}

                    {source.sender && source.recipient && (
                        <div style={{marginTop: '20px'}}>
                            <Flex gap={4}>
                                <div>
                                    <Text variant="subheader-2">Sender ID</Text>
                                    <Text>{source.sender}</Text>
                                </div>
                                <div>
                                    <Text variant="subheader-2">Recipient ID</Text>
                                    <Text>{source.recipient}</Text>
                                </div>
                                {source.duration !== undefined && (
                                    <div>
                                        <Text variant="subheader-2">Duration</Text>
                                        <Text>{source.duration?.toFixed(2)}s</Text>
                                    </div>
                                )}
                            </Flex>
                        </div>
                    )}

                    {source.sources && Object.keys(source.sources).length > 0 && (
                        <div style={{marginTop: '20px'}}>
                            <Text variant="subheader-2">Sources</Text>
                            <TabProvider value={activeSourceTab} onUpdate={setActiveSourceTab}>
                                <TabList>
                                    {sourceTabs.map((item) => (
                                        <Tab key={item.id} value={item.id}>
                                            {item.title}
                                        </Tab>
                                    ))}
                                </TabList>
                                <div>
                                    {sourceTabs.map((item) => (
                                        <TabPanel key={item.id} value={item.id}>
                                            {item.content}
                                        </TabPanel>
                                    ))}
                                </div>
                            </TabProvider>
                        </div>
                    )}

                    {source.description && (
                        <div style={{marginTop: '16px'}}>
                            <Text variant="subheader-2">Description</Text>
                            <Text>{source.description}</Text>
                        </div>
                    )}

                    {source.metadata && (
                        <div style={{marginTop: '16px'}}>
                            <Text variant="subheader-2">Metadata</Text>
                            <pre
                                style={{
                                    background: '#f5f5f5',
                                    padding: '12px',
                                    borderRadius: '4px',
                                    overflowX: 'auto',
                                }}
                            >
                                {JSON.stringify(source.metadata, null, 2)}
                            </pre>
                        </div>
                    )}

                    <div style={{marginTop: '20px'}}>
                        <Button
                            view="flat"
                            onClick={toggleJsonExpanded}
                            rightContent={<Icon data={jsonExpanded ? ChevronUp : ChevronDown} />}
                            style={{width: '100%', justifyContent: 'space-between'}}
                        >
                            <Text variant="subheader-2">Full JSON Data</Text>
                        </Button>
                        {jsonExpanded && (
                            <pre
                                style={{
                                    padding: '12px',
                                    borderRadius: '4px',
                                    overflowX: 'auto',
                                    marginTop: '8px',
                                }}
                            >
                                {JSON.stringify(source, null, 2)}
                            </pre>
                        )}
                    </div>

                    <Flex gap={4} style={{marginTop: '16px'}}>
                        <div>
                            <Text variant="caption-1" color="secondary">
                                Created
                            </Text>
                            <Text>{new Date(source.createdAt).toLocaleString()}</Text>
                        </div>
                        <div>
                            <Text variant="caption-1" color="secondary">
                                Last Updated
                            </Text>
                            <Text>{new Date(source.updatedAt).toLocaleString()}</Text>
                        </div>
                    </Flex>

                    <Flex justifyContent="flex-end" style={{marginTop: '24px'}}>
                        <Button view="action" size="m" onClick={fetchSourceDetails}>
                            Refresh
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
};
