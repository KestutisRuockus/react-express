import express, { json } from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

let blogPosts = [
  {
    id: 1,
    title: "The Journey of a thoudsand Miles",
    content:
      "An exploration of the importance of taking the first step in any journey",
  },
  {
    id: 2,
    title: "Understanding the Universe: A Neginner's Guide",
    content:
      "A simple introduction to the vastness and wonders of the universe.",
  },
  {
    id: 3,
    title: "The Art of Cooking: Tips and Tricks",
    content: "Essential tips for becoming a better cook in your own kitchen",
  },
];

app.get("/", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});

app.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing data" });
  }

  db.run(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [title, content],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        id: this.lastID,
        title,
        content,
      });
    }
  );
});

app.delete("/", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing Id" });
  }

  db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({ deleted: this.changes });
  });
});

app.put("/", (req, res) => {
  const { id, title, content } = req.body;

  if (!id || !title || !content) {
    return res.status(400).json({ message: "Missing Data" });
  }

  db.run(
    `
    UPDATE posts
    SET title = ?, content = ?
    WHERE id = ?
    `,
    [title, content, id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ id, title, content });
    }
  );
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
