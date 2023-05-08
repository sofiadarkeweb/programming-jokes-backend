import fetch from "node-fetch";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const port = 8000;

const url = "https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode&type=";

app.get("/jokes", (req, res) => {
  const { type, amount } = req.query;
  const apiUrl = `${url}${type}&amount=${amount}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => res.json(data.jokes))
    .catch((error) => console.error(error));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
