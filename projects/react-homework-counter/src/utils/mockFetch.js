// This function will intercept the URLs you pass to it, wait half a second to simulate network latency, and then return fake data in the exact same format the real fetch uses.

// Change this to 'false' when you want to use the REAL API

export const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true';

const MOCK_DELAY_MS = 500;

// This lives outside the function, so it persists between calls!
let internalMockQuota = Number(localStorage.getItem('mock_quota')) || 999999;

export const mockFetch = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {

      // 1. Mocking the Quota Endpoint
      if (url.includes('quota')) {
        // Decrease the quota by 1 each time it's checked
        internalMockQuota -= 1;
        localStorage.setItem('mock_quota', internalMockQuota);

        resolve({
          ok: true,
          json: async () => internalMockQuota
        });
      }

      // 2. Mocking the Random Integer Endpoint
      else if (url.includes('integers')) {
        // Generate a random number between -50 and 50 using standard JS
        const fakeRandom = Math.floor(Math.random() * 101) - 50;
        resolve({
          ok: true,
          json: async () => fakeRandom
        });
      }

      // 3. Fallback for unknown URLs
      else {
        resolve({
          ok: false,
          status: 404,
          json: async () => ({ error: 'Not Found' })
        });
      }

    }, MOCK_DELAY_MS);
  });
};