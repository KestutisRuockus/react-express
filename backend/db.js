import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./blog.db", (err) => {
  if (err) {
    console.error("DB error:", err.message);
  } else {
    console.log("SQLiteconnected");
  }
});

db.run(
  `
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
    )
    `,
  (err) => {
    if (err) {
      console.error("Table error:", err.message);
    } else {
      console.log("Table ready");
    }
  }
);

export default db;
