import { DataTypes } from "sequelize";
import { db } from "..";

export const Control = db.define("control", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
