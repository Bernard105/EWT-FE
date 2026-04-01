import { useMemo, useState } from 'react';

export function useSubmitState() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  return useMemo(
    () => ({
      submitting,
      error,
      start: () => {
        setError('');
        setSubmitting(true);
      },
      fail: (message) => {
        setError(message || 'Something went wrong');
        setSubmitting(false);
      },
      done: () => setSubmitting(false),
      clear: () => setError(''),
    }),
    [error, submitting]
  );
}
