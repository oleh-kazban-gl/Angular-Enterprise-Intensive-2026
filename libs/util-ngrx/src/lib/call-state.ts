export type CallState = 'init' | 'loading' | 'loaded' | { error: string };

export const getError = (callState: CallState): string | null => {
  if (typeof callState === 'object' && 'error' in callState) {
    return callState.error;
  }
  return null;
};
