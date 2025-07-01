import { DataTypes } from "sequelize";
import { db } from "..";

export const Control = db.define("control", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
