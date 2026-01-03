import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [oldTitleForPutMethod, setOldTitleForPutMethod] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000");
    setPosts(res.data);
    console.log("fetch");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000", { title, content });

    await fetchPosts();

    setTitle("");
    setContent("");
  };

  const deletePost = async (title) => {
    await axios.delete("http://localhost:3000", { data: { title } });

    await fetchPosts();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:3000", {
      oldTitleForPutMethod,
      title,
      content,
    });

    await fetchPosts();

    setTitle("");
    setContent("");
    setIsUpdating(false);
  };

  const handleUpdatingStates = (title, conten) => {
    setIsUpdating(true);
    setOldTitleForPutMethod(title);
    setTitle(title);
    setContent(conten);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold text-gray-800">
          Backend with Express & Node
        </h1>

        <form
          onSubmit={isUpdating ? handleUpdate : handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="border px-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Content"
            className="border px-2"
          />
          <button className="border">{isUpdating ? "Update" : "Submit"}</button>
        </form>

        <ul className="rounded-2xl shadow-lg p-5 bg-white space-y-3">
          {posts.map((blog, index) => (
            <li
              key={index}
              className="bg-sky-100 p-4 rounded-2xl transition-transform transform hover:scale-105"
            >
              <div className="flex justify-between w-lg">
                <div>
                  <p className="text-xl text-gray-800">{blog.title}</p>
                  <p className="text-sm text-gray-600">{blog.content}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => deletePost(blog.title)}
                    className="border bg-red-300 w-20 h-10"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleUpdatingStates(blog.title, blog.content)
                    }
                    className="border bg-green-300 w-20 h-10"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
