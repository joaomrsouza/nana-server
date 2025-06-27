import { DataTypes } from "sequelize";
import { db } from "..";

export const NoiseReadings = db.define("noiseReadings", {
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  noiseLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
