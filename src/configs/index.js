require("dotenv").config();
console.log("ENV PORT:", process.env.PORT);
// <-- penting! harus paling atas

module.exports = {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT,
  JWT_Key: process.env.JWT_SecretKey,
  JWT_Refresh: process.env.JWT_RefreshKey,
};
