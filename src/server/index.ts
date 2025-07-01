// "./utils/module-alias" deve ser o primeiro import deste arquivo
import "./utils/module-alias";

import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { dataController, fanController, rootController, sensorsController } from "./controllers";
import { db } from "./db";
import { env } from "./env";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use("/", rootController);
app.use("/api/data", dataController);
app.use("/api/fan", fanController);
app.use("/api/sensors", sensorsController);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Erro capturado pelo middleware:", err);

  if (!res.headersSent) {
    res.status(500).render("error", {
      error: err,
      message: "Erro interno do servidor",
    });
  }
});

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
