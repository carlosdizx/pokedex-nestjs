export const EnvConfig = () => ({
  environment: process.env.NODE_ENV || "dev",
  dbHost: process.env.DB_HOST,
  port: process.env.PORT || 3000,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
});
