const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let articles = [];

app.post("/articles", (req, res) => {
  const { title, content } = req.body;
  const newArticle = { id: articles.length + 1, title, content };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.put("/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  article.title = title;
  article.content = content;

  res.json(article);
});

app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;
  const articleIndex = articles.findIndex((a) => a.id === parseInt(id));

  if (articleIndex === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  articles.splice(articleIndex, 1);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});