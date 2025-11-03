const { poolPromise, sql } = require("../configs/mysql");

module.exports = {
  register: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        await pool
          .request()
          .input("user_name", sql.NVarChar, data.user_name)
          .input("user_email", sql.NVarChar, data.user_email)
          .input("user_password", sql.NVarChar, data.user_password)
          .input("user_salt", sql.NVarChar, data.user_salt) // TAMBAH INI
          .input("user_role", sql.Int, data.user_role)
          .input("created_at", sql.DateTime, data.date_created)
          .input("updated_at", sql.DateTime, data.date_updated)
          .query(`INSERT INTO user_table (user_name, user_email, user_password, user_salt, user_role, created_at, updated_at) 
                VALUES (@user_name, @user_email, @user_password, @user_salt, @user_role, @created_at, @updated_at)`);

        const result = await pool
          .request()
          .query(
            `SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id ORDER BY user_name ASC`
          );

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  checkEmail: (user_email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("user_email", sql.NVarChar, user_email)
          .query(`SELECT * FROM user_table WHERE user_email = @user_email`);

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  readUser: (
    user_id,
    search_user_name,
    search_role,
    sort_by,
    order_by,
    start_index,
    limit
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        if (user_id !== null) {
          const result = await pool
            .request()
            .input("user_id", sql.NVarChar, user_id)
            .query(
              `SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id WHERE user_table.id = @user_id`
            );

          resolve(result.recordset);
        } else {
          const result = await pool.request()
            .query(`SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id 
                    WHERE user_table.user_name LIKE '%${search_user_name}%' AND user_table.user_role LIKE '%${search_role}%' 
                    ORDER BY ${sort_by} ${order_by} 
                    OFFSET ${start_index} ROWS FETCH NEXT ${limit} ROWS ONLY`);

          resolve(result.recordset);
        }
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  checkId: (user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("user_id", sql.NVarChar, user_id)
          .query(`SELECT * FROM user_table WHERE id = @user_id`);

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  updateUser: (data, user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;

        let query = `UPDATE user_table SET `;
        const inputs = [];

        if (data.user_name) {
          inputs.push(`user_name = @user_name`);
        }
        if (data.user_email) {
          inputs.push(`user_email = @user_email`);
        }
        if (data.user_role) {
          inputs.push(`user_role = @user_role`);
        }
        if (data.user_birth_date) {
          inputs.push(`user_birth_date = @user_birth_date`);
        }
        if (data.user_phone_number) {
          inputs.push(`user_phone_number = @user_phone_number`);
        }
        if (data.user_points !== undefined) {
          inputs.push(`user_points = @user_points`);
        }
        if (data.user_image) {
          inputs.push(`user_image = @user_image`);
        }
        if (data.date_updated) {
          inputs.push(`date_updated = @date_updated`);
        }

        query += inputs.join(", ") + ` WHERE id = @user_id`;

        const request = pool.request();

        if (data.user_name)
          request.input("user_name", sql.NVarChar, data.user_name);
        if (data.user_email)
          request.input("user_email", sql.NVarChar, data.user_email);
        if (data.user_role)
          request.input("user_role", sql.NVarChar, data.user_role);
        if (data.user_birth_date)
          request.input("user_birth_date", sql.NVarChar, data.user_birth_date);
        if (data.user_phone_number)
          request.input(
            "user_phone_number",
            sql.NVarChar,
            data.user_phone_number
          );
        if (data.user_points !== undefined)
          request.input("user_points", sql.Int, data.user_points);
        if (data.user_image)
          request.input("user_image", sql.NVarChar, data.user_image);
        if (data.date_updated)
          request.input("date_updated", sql.DateTime, data.date_updated);

        request.input("user_id", sql.NVarChar, user_id);

        await request.query(query);

        const result = await pool
          .request()
          .query(
            `SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id ORDER BY user_name ASC`
          );

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  deleteUser: (user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        await pool
          .request()
          .input("user_id", sql.NVarChar, user_id)
          .query(`DELETE FROM user_table WHERE id = @user_id`);

        const result = await pool
          .request()
          .query(
            `SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id ORDER BY user_name ASC`
          );

        resolve(result.recordset);
      } catch (error) {
        reject(new Error(error));
      }
    });
  },

  countUser: (user_id, search_user_name, search_role, sort_by, order_by) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        if (user_id !== null) {
          const result = await pool
            .request()
            .input("user_id", sql.NVarChar, user_id)
            .query(
              `SELECT count(*) as total_data FROM user_table WHERE user_table.id = @user_id`
            );

          resolve(result.recordset[0].total_data);
        } else {
          const result = await pool.request()
            .query(`SELECT count(*) as total_data FROM user_table 
                    WHERE user_table.user_name LIKE '%${search_user_name}%' AND user_table.user_role LIKE '%${search_role}%'`);

          resolve(result.recordset[0].total_data);
        }
      } catch (error) {
        reject(new Error(error));
      }
    });
  },
};
