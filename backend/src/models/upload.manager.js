const fs = require("fs");

const AbstractManager = require("./AbstractManager");

class UploadManager extends AbstractManager {
  constructor() {
    super({ table: "upload" });
  }

  create(data) {
    let filename = data.destination.replace("public/", "");
    filename += `${data.filename}.`;
    filename += data.originalname.split(".").slice(-1);

    return new Promise((resolve, reject) => {
      fs.rename(`${data.path}`, `public/${filename}`, async (err) => {
        if (err) {
          reject(err);
        }
        const [result] = await this.database.query(
          `INSERT INTO ${this.table} (url) VALUES(?)`,
          [filename]
        );
        resolve({
          id: result.insertId,
          url: filename,
        });
      });
    });
  }
}

module.exports = UploadManager;
