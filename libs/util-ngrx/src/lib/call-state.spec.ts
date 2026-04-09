import { getError } from './call-state';

describe('getError', () => {
  it('returns null for "init"', () => {
    expect(getError('init')).toBeNull();
  });

  it('returns null for "loading"', () => {
    expect(getError('loading')).toBeNull();
  });

  it('returns null for "loaded"', () => {
    expect(getError('loaded')).toBeNull();
  });

  it('returns the error string for an error object', () => {
    expect(getError({ error: 'something went wrong' })).toBe('something went wrong');
  });

  it('returns empty string when error property is empty', () => {
    expect(getError({ error: '' })).toBe('');
  });
});
