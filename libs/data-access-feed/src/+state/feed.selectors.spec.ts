import { feedAdapter, feedFeature, FeedState } from './feed.reducer';
import { FeedPost } from './feed.models';
import {
  selectAllPosts,
  selectFeedError,
  selectFeedLoaded,
  selectFeedLoading,
  selectFeedPagination,
  selectPostEntities,
} from './feed.selectors';

const makePost = (id: string, likes = 0, liked = false): FeedPost => ({
  id,
  author: 'alice',
  avatarUrl: '',
  time: '1m ago',
  images: [],
  caption: 'Test',
  location: null,
  likes,
  liked,
  createdAt: '2024-01-01T00:00:00Z',
});

const stateWithPosts = (posts: FeedPost[]): FeedState =>
  feedAdapter.setAll(posts, feedAdapter.getInitialState({ callState: 'loaded' as const, pagination: null }));

describe('Feed Selectors', () => {
  describe('selectFeedLoading', () => {
    it('returns true when callState is "loading"', () => {
      expect(selectFeedLoading.projector('loading')).toBe(true);
    });

    it('returns false for other states', () => {
      expect(selectFeedLoading.projector('init')).toBe(false);
      expect(selectFeedLoading.projector('loaded')).toBe(false);
      expect(selectFeedLoading.projector({ error: 'err' })).toBe(false);
    });
  });

  describe('selectFeedLoaded', () => {
    it('returns true when callState is "loaded"', () => {
      expect(selectFeedLoaded.projector('loaded')).toBe(true);
    });

    it('returns false for other states', () => {
      expect(selectFeedLoaded.projector('init')).toBe(false);
      expect(selectFeedLoaded.projector('loading')).toBe(false);
    });
  });

  describe('selectFeedError', () => {
    it('returns error string from error callState', () => {
      expect(selectFeedError.projector({ error: 'load failed' })).toBe('load failed');
    });

    it('returns null for non-error states', () => {
      expect(selectFeedError.projector('init')).toBeNull();
      expect(selectFeedError.projector('loaded')).toBeNull();
    });
  });

  describe('selectAllPosts', () => {
    it('returns all posts from entity state', () => {
      const state = stateWithPosts([makePost('1'), makePost('2')]);
      const result = selectAllPosts.projector(state);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
    });

    it('returns empty array when no posts', () => {
      const emptyState = feedAdapter.getInitialState({ callState: 'init' as const, pagination: null });
      expect(selectAllPosts.projector(emptyState)).toEqual([]);
    });
  });

  describe('selectPostEntities', () => {
    it('returns entity dictionary keyed by id', () => {
      const state = stateWithPosts([makePost('p1')]);
      const entities = selectPostEntities.projector(state);
      expect(entities['p1']).toBeDefined();
      expect(entities['p1']?.id).toBe('p1');
    });
  });

  describe('selectFeedPagination', () => {
    it('returns pagination from state', () => {
      const pagination = { page: 1, size: 5, totalItems: 10, totalPages: 2 };
      const state = feedAdapter.getInitialState({ callState: 'loaded' as const, pagination });
      const result = selectFeedPagination.projector(state);
      expect(result).toEqual(pagination);
    });

    it('returns null when pagination not set', () => {
      const state = feedAdapter.getInitialState({ callState: 'init' as const, pagination: null });
      expect(selectFeedPagination.projector(state)).toBeNull();
    });
  });
});
