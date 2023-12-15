const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  create(user) {
    return this.database.query(
      `insert into ${this.table} (email, password, isAdmin) values (?, ?, ?)`,
      [user.email, user.password, user.isAdmin]
    );
  }

  // update(user) {
  //   return this.database.query(
  //     `update ${this.table} set email = ?, password = ?, isAdmin = ? where id = ?`,
  //     [user.email, user.password, user.isAdmin, user.id]
  //   );
  // }
}

module.exports = UserManager;
