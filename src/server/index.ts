import express from "express";
import path from "path";
import { postController } from "./controllers";
import { db } from "./db";
import { env } from "./env";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (_req, res) => {
  res.render("index");
});

app.use(postController);

db.afterSync(() => {
  app.emit("ready");
});

db.authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch(error => {
    console.error("Unable to connect to the database:", error);
  });

app.on("ready", () => {
  app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
  });
});
