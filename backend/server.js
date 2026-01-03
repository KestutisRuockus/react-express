import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

let blogPosts = [
  {
    title: "The Journey of a thoudsand Miles",
    content:
      "An exploration of the importance of taking the first step in any journey",
  },
  {
    title: "Understanding the Universe: A Neginner's Guide",
    content:
      "A simple introduction to the vastness and wonders of the universe.",
  },
  {
    title: "The Art of Cooking: Tips and Tricks",
    content: "Essential tips for becoming a better cook in your own kitchen",
  },
];

app.get("/", (req, res) => {
  res.json(blogPosts);
});

app.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing data" });
  }

  const newPost = {
    title,
    content,
  };

  blogPosts.push(newPost);

  res.status(200).json(newPost);
});

app.delete("/", (req, res) => {
  const { title } = req.body;

  blogPosts = blogPosts.filter((post) => post.title !== title);

  res.status(200).json(blogPosts);
});

app.put("/", (req, res) => {
  const { oldTitleForPutMethod, title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing Data" });
  }

  const postIndex = blogPosts.findIndex(
    (post) => post.title === oldTitleForPutMethod
  );

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  blogPosts[postIndex].title = title;
  blogPosts[postIndex].content = content;

  res.status(200).json(blogPosts[postIndex]);
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
