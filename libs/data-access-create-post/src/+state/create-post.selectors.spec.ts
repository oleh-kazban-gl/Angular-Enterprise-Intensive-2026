import { selectError, selectIsSubmitting } from './create-post.selectors';

describe('Create Post Selectors', () => {
  describe('selectIsSubmitting', () => {
    it('returns true when callState is "loading"', () => {
      expect(selectIsSubmitting.projector('loading')).toBe(true);
    });

    it('returns false when callState is "init"', () => {
      expect(selectIsSubmitting.projector('init')).toBe(false);
    });

    it('returns false when callState is "loaded"', () => {
      expect(selectIsSubmitting.projector('loaded')).toBe(false);
    });

    it('returns false when callState is an error object', () => {
      expect(selectIsSubmitting.projector({ error: 'err' })).toBe(false);
    });
  });

  describe('selectError', () => {
    it('returns the error string from error callState', () => {
      expect(selectError.projector({ error: 'upload failed' })).toBe('upload failed');
    });

    it('returns null for "init"', () => {
      expect(selectError.projector('init')).toBeNull();
    });

    it('returns null for "loading"', () => {
      expect(selectError.projector('loading')).toBeNull();
    });

    it('returns null for "loaded"', () => {
      expect(selectError.projector('loaded')).toBeNull();
    });
  });
});
