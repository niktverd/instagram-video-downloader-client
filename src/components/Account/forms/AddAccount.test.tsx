import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {AppEnvContext} from '../../../contexts/AppEnv';
import {IAccount} from '../../../sharedTypes';
import {fetchGet} from '../../../utils/fetchHelpers';

import {AddAccount} from './AddAccount';

jest.mock('../../../utils/fetchHelpers', () => ({
    fetchGet: jest.fn(),
}));

jest.mock('../../InstagramLocationSelector', () => ({
    InstagramLocationSelector: () => <div>Instagram Locations</div>,
}));

const mockedFetchGet = fetchGet as jest.MockedFunction<typeof fetchGet>;

const renderAddAccount = (props: Partial<React.ComponentProps<typeof AddAccount>> = {}) =>
    render(
        <AppEnvContext.Provider value={{isProd: false}}>
            <AddAccount onSubmit={jest.fn()} {...props} />
        </AppEnvContext.Provider>,
    );

describe('AddAccount', () => {
    beforeEach(() => {
        mockedFetchGet.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('defaults needWarmup to false and submits it when missing', async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();

        renderAddAccount({onSubmit});

        const checkbox = screen.getByLabelText('Need Warmup') as HTMLInputElement;

        expect(checkbox).not.toBeChecked();
        expect(
            screen.getByText('Limits automatic publishing to once per 24 hours.'),
        ).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: 'Submit'}));

        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    slug: '',
                    enabled: true,
                    needWarmup: false,
                    token: '',
                    availableScenarios: [],
                    instagramLocations: [],
                }),
            ),
        );
    });

    it('hydrates needWarmup from initial values and allows toggling it off', async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();
        const initialValues: Partial<IAccount> = {
            id: 1,
            slug: 'account-1',
            enabled: true,
            needWarmup: true,
            token: 'token',
            availableScenarios: [],
            instagramLocations: [],
        };

        renderAddAccount({initialValues, onSubmit});

        const checkbox = screen.getByLabelText('Need Warmup') as HTMLInputElement;

        expect(checkbox).toBeChecked();

        await user.click(checkbox);
        await user.click(screen.getByRole('button', {name: 'Submit'}));

        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: 1,
                    slug: 'account-1',
                    needWarmup: false,
                }),
            ),
        );
    });
});
