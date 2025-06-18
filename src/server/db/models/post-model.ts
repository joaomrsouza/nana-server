import { STRING, TEXT } from "sequelize";
import { db } from "..";

export const Post = db.define("post", {
  titulo: {
    type: STRING,
    allowNull: false,
  },
  descricao: {
    type: TEXT,
    allowNull: false,
  },
});

Post.sync({ force: false }).then(() => {
  console.log("Post model synced successfully.");
});
