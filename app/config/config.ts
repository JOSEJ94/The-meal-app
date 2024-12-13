const { EXPO_PUBLIC_API_URL } = process.env

/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
if (!EXPO_PUBLIC_API_URL) {
  console.error(`You're missing some env vars in your .env file`)
}

export default {
  API_URL: EXPO_PUBLIC_API_URL!,
} as const
