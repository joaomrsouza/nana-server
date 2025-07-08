import { DataTypes } from "sequelize";
import { db } from "..";

export const Event = db.define("event", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  extra: {
    type: DataTypes.STRING,
  }
})