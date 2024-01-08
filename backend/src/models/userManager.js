const bcrypt = require("bcrypt");
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  create(user) {
    return UserManager.hashPassword(user.password).then((hash) => {
      return this.database.query(
        `insert into ${this.table} (email, password, is_admin) values (?, ?, ?)`,
        [user.email, hash, user.is_admin]
      );
    });
  }

  async login({ email, password }) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email like ?`,
      [email]
    );

    if (!rows.length) {
      return undefined;
    }

    const user = rows[0];
    // console.log(user);

    const result = await bcrypt.compare(password, user.password);
    // console.log(result);

    return result ? user : undefined;
  }
  // update(user) {
  //   return this.database.query(
  //     `update ${this.table} set email = ?, password = ?, isAdmin = ? where id = ?`,
  //     [user.email, user.password, user.isAdmin, user.id]
  //   );
  // }

  getProfile(id) {
    return this.database.query(
      `SELECT id, email, is_admin AS isAdmin FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  static hashPassword(password, workFactor = 5) {
    return bcrypt.hash(password, workFactor);
  }
}

module.exports = UserManager;
