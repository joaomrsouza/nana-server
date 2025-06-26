import express from "express";
import path from "path";
import { postController, rootController } from "./controllers";
import { db } from "./db";
import { env } from "./env";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use("/", rootController);
app.use("/posts", postController);

db.afterSync(() => {
  app.emit("ready");
});

db.authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    db.sync({ force: false });
  })
  .catch(error => {
    console.error("Unable to connect to the database:", error);
  });

app.on("ready", () => {
  app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
  });
});
