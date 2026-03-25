import {useCallback, useState} from 'react';

export const useHttp = () => {
  const [processState, setProcessState] = useState('IDLE');

  const request = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {
      'Content-Type': 'application/json', // Не факт, что обязательно нужен (нужно потестить)
      'User-Agent': 'MyComicApp/1.0' // ComicVine requires an User-Agent
    },
    retries = 3 // количество попыток установить соединение
  ) => {
    setProcessState('LOADING');

    for (let i = 0; i < retries; i++) {
      const controller = new AbortController();

      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`);

        const data = await response.json();
        return data;
      } catch (error) {
        clearTimeout(timeoutId);

        const isTimeout = error.name === 'AbortError';
        const errorMessage = isTimeout ? `Request timed out after 5s` : error.message;

        if (i === retries - 1) {
          console.error(`Fetch failed after ${retries} attempts. Reason:`, errorMessage);
          setProcessState('ERROR');
          throw error;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }, []);

  const clearError = useCallback(() => setProcessState('LOADING'), []);

  return {processState, setProcessState, request, clearError};
};