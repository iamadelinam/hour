const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "root",
  database: "hoursApp",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
    return;
  }
});

function getUserById(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM authorization WHERE id = ?`,
      [id],
      (error, users) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(users[0]);
      }
    );
  });
}

function addUser(userName, mail, hash, salt) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM authorization WHERE user_mail = ?`,
      [mail],
      (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        if (data.length > 0) {
          reject(new Error("User exists"));
          return;
        }
        connection.query(
          `
          INSERT INTO authorization
          (user_name, user_mail, hash, salt)
          VALUES
          (?, ?, ?, ?)
          `,
          [userName, mail, hash, salt],
          (error, data) => {
            if (error) {
              reject(error);
              return;
            }
            getUserById(data.insertId)
              .then((user) => {
                resolve(user);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      }
    );
  });
}

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM authorization WHERE user_mail = ?`,
      [email],
      (error, users) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(users[0]);
      }
    );
  });
}

function setToken(userId, token) {
  return new Promise((resolve, reject) => {
    connection.query(
      `
        UPDATE authorization
        SET token = ?
        WHERE id = ?
      `,
      [token, userId],
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

function findUserByToken(token) {
  return new Promise((resolve, reject) => {
    connection.query(
      `
        SELECT * FROM authorization
        WHERE token = ?;
      `,
      [token],
      (error, pairs) => {
        if (error) {
          reject(error);
          return;
        }
        if (pairs.length === 0) {
          reject(new Error("Invalid token"));
          return;
        }

        const userId = pairs[0].id;
        getUserById(userId)
          .then((user) => resolve(user))
          .catch(reject);
      }
    );
  });
}

function getMonthlyActivities(categoryId, userId, month) {
  //GET for CalendarItem
  return new Promise((resolve, reject) => {
    const sqlDataArgs = [userId, categoryId];
    if (month) {
      sqlDataArgs.push(month.getMonth() + 1);
    }
    connection.query(
      `SELECT * FROM activities
      WHERE
      authorization_id = ?
      AND category_id = ?
      ${month ? "AND MONTH(time_stamp) = ?" : ""}
      AND act_minutes > 0;`,
      sqlDataArgs,
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  });
}

function nameCategorie(title, user_id) {
  //POST for ModalName
  return new Promise((resolve, reject) => {
    connection.query(
      `
    INSERT INTO categories
    (title, authorization_id)
    VALUES
    (?, ?)
    `,
      [title, user_id],
      (error, data) => {
        if (error) {
          reject(error);
          return;
        }

        connection.query(
          `SELECT * FROM categories WHERE id = ?`,
          [data.insertId],
          (err, categories) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(categories[0]);
          }
        );
      }
    );
  });
}

function getCategories(user_id) {
  // GET for HomePage
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM categories WHERE authorization_id = ?",
      [user_id],
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  });
}

function getCategory(categoryId) {
  // GET for HomePage
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM categories WHERE id = ?",
      [categoryId],
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data[0]);
      }
    );
  });
}
function postActivitie(categoryId, timeStamp, actMinutes, authorizationId) {
  //POST for ModalTime
  return new Promise((resolve, reject) => {
    connection.query(
      `
  INSERT INTO activities
  (category_id, time_stamp, act_minutes, authorization_id)
  VALUES
  (?, ?, ?, ?)
  `,
      [categoryId, timeStamp, actMinutes, authorizationId],
      (error, data) => {
        if (error) {
          reject(error);
          return;
        }

        connection.query(
          `SELECT * FROM activities WHERE id = ?`,
          [data.insertId],
          (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(data[0]);
          }
        );
      }
    );
  });
}

module.exports = {
  addUser,
  findUserByEmail,
  findUserByToken,
  setToken,
  getMonthlyActivities,
  nameCategorie,
  getCategories,
  postActivitie,
  getCategory,
};
