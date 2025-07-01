import { DataTypes } from "sequelize";
import { db } from "..";

export const TemperatureReadings = db.define("temperatureReadings", {
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
