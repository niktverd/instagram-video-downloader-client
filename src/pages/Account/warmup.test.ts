import {getWarmupStatusText} from './warmup';

describe('getWarmupStatusText', () => {
    it('returns Enabled when warmup is enabled', () => {
        expect(getWarmupStatusText(true)).toBe('Enabled');
    });

    it('returns Disabled when warmup is false or missing', () => {
        expect(getWarmupStatusText(false)).toBe('Disabled');
        expect(getWarmupStatusText(undefined)).toBe('Disabled');
    });
});
