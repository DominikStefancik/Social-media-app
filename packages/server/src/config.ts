const DEFAULT_CONFIG = {
  appName: 'social-media-app',
  serverUrl: process.env.SERVER_URL || 'localhost:3000',
  databaseUrl: '',
  databaseName: 'sma-store',
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET || 'temporary secret',
};

export const getAppConfig = () => DEFAULT_CONFIG;
