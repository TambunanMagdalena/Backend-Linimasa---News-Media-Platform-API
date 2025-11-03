const { poolPromise, sql } = require("../configs/mysql");

module.exports = {
  insertUserRole: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        await pool
          .request()
          .input("user_role_name", sql.NVarChar, data.user_role_name)
          .input("created_at", sql.DateTime, data.date_created)
          .input("updated_at", sql.DateTime, data.date_updated)
          .query(`INSERT INTO user_role_table (user_role_name, created_at, updated_at) 
                VALUES (@user_role_name, @created_at, @updated_at)`);

        const result = await pool
          .request()
          .query(`SELECT * FROM user_role_table ORDER BY user_role_name ASC`);

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  checkUserRoleName: (user_role_name) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("user_role_name", sql.NVarChar, user_role_name)
          .query(
            `SELECT * FROM user_role_table WHERE user_role_name = @user_role_name`
          );

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  readUserRole: (search_user_role_name, sort_by, order_by) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        const result = await pool.request()
          .query(`SELECT * FROM user_role_table 
                  WHERE user_role_table.user_role_name LIKE '%${search_user_role_name}%' 
                  ORDER BY ${sort_by} ${order_by}`);

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  updateUserRole: (data, user_role_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        await pool
          .request()
          .input("user_role_name", sql.NVarChar, data.user_role_name)
          .input("updated_at", sql.DateTime, data.date_updated)
          .input("id", sql.Int, user_role_id)
          .query(
            `UPDATE user_role_table SET user_role_name = @user_role_name, updated_at = @updated_at WHERE id = @id`
          );

        const result = await pool
          .request()
          .query(`SELECT * FROM user_role_table ORDER BY user_role_name ASC`);

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  deleteUserRole: (user_role_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        await pool
          .request()
          .input("id", sql.Int, user_role_id)
          .query(`DELETE FROM user_role_table WHERE id = @id`);

        const result = await pool
          .request()
          .query(`SELECT * FROM user_role_table ORDER BY user_role_name ASC`);

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },
};
