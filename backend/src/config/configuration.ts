export default () => ({
  port: parseInt(process.env.PORT ?? "3000"),
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN ?? "1d",
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: parseInt(process.env.DB_PORT ?? "5432"),
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
});
