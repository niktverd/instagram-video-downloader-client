import {defaultHeaders} from './constants';

describe('constants', () => {
    describe('defaultHeaders', () => {
        it('should not contain hard-coded x-admin-secret header', () => {
            expect(defaultHeaders).not.toHaveProperty('x-admin-secret');
        });

        it('should contain required headers', () => {
            expect(defaultHeaders).toHaveProperty('Content-Type', 'application/json');
            expect(defaultHeaders).toHaveProperty('x-organization-id', '1');
        });
    });
});
