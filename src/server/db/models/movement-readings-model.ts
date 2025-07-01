import { DataTypes } from "sequelize";
import { db } from "..";

export const MovementReadings = db.define("movementReadings", {
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  movement: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
