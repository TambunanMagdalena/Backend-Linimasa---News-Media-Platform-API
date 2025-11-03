const sql = require("mssql");
const { database } = require("./index");

const dbConfig = {
  server: database.host, // bukan host tapi server
  port: parseInt(database.port, 10),
  user: database.user,
  password: database.password,
  database: database.database,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Database connected successfully");
    return pool;
  })
  .catch((err) => {
    console.log("❌ Database connection failed:", err);
  });

module.exports = {
  sql,
  poolPromise,
};
