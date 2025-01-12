import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Mahasiswa = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:5000/articles");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const article = { title, content };

    try {
      let response;
      if (editingArticle) {
        // Update existing article
        response = await fetch(`http://localhost:5000/articles/${editingArticle.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(article),
        });
      } else {
        // Add new article
        response = await fetch("http://localhost:5000/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(article),
        });
      }

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editingArticle ? "Article updated successfully!" : "Article added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTitle("");
        setContent("");
        setEditingArticle(null);
        fetchArticles(); // Refresh article list
        closeModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to save article.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred while saving the article.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/articles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Article deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchArticles(); // Refresh article list
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to delete article.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred while deleting the article.",
      });
    }
  };

  const openModal = (article = null) => {
    setEditingArticle(article);
    if (article) {
      setTitle(article.title);
      setContent(article.content);
    } else {
      setTitle("");
      setContent("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingArticle(null);
    setTitle("");
    setContent("");
    setIsModalOpen(false);
  };

  return (
    
    <div className="flex flex-col w-2/3 mx-auto">
      
      <button
        onClick={() => openModal()}
        className="bg-black text-white w-[200px] px-4 py-2 rounded text-sm"
      >
        Tambah Artikel
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <span
              className="text-gray-500 float-right text-2xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Judul:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Isi:</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button type="submit" className="bg-black text-sm text-white px-4 py-2 rounded">
                {editingArticle ? "Update Article" : "Add Article"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        <h2 className="my-4 font-semibold">Informasi</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id} className="my-3">
              <h3 className="text-blue-700 font-semibold">{article.title}</h3>
              <p>{article.content}</p>
              <button
                onClick={() => openModal(article)}
                className="text-sm text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(article.id)}
                className="text-sm text-red-500"
              >
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Mahasiswa;