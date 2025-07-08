import { Event } from "@/db/models";
import { DeviceDataSchema, DeviceDataSchemaType } from "@/schemas";
import { memoryMap } from "./memory";

export async function verifyAndCreateDataEvents(data: DeviceDataSchemaType) {
  const lastData = DeviceDataSchema.safeParse(
    JSON.parse(memoryMap.get("last-data") || "{}"),
  );

  if (!lastData.success) return;

  const ops = [];

  if (
    lastData.data.noiseLevel &&
    data.noiseLevel &&
    lastData.data.noiseLevel <= 1500 &&
    data.noiseLevel > 1500
  ) {
    ops.push(
      Event.create({
        name: "high-noise",
        timestamp: new Date(),
      }),
    );
  }

  if (lastData.data.temperature && data.temperature) {
    if (lastData.data.temperature > 30 && data.temperature <= 30) {
      ops.push(
        Event.create({
          name: "low-temp",
          timestamp: new Date(),
        }),
      );
    }

    if (
      (lastData.data.temperature <= 30 || lastData.data.temperature > 32) &&
      data.temperature > 30 &&
      data.temperature <= 32
    ) {
      ops.push(
        Event.create({
          name: "mid-temp",
          timestamp: new Date(),
        }),
      );
    }

    if (lastData.data.temperature <= 32 && data.temperature > 32) {
      ops.push(
        Event.create({
          name: "high-temp",
          timestamp: new Date(),
        }),
      );
    }
  }

  if (lastData.data.movSensorStatus !== data.movSensorStatus) {
    ops.push(
      Event.create({
        name: data.movSensorStatus ? "sensor-working" : "sensor-stop",
        timestamp: new Date(),
        extra: "movement-sensor",
      }),
    );
  }

  if (lastData.data.tempSensorStatus !== data.tempSensorStatus) {
    ops.push(
      Event.create({
        name: data.tempSensorStatus ? "sensor-working" : "sensor-stop",
        timestamp: new Date(),
        extra: "temperature-sensor",
      }),
    );
  }

  if (lastData.data.noiseSensorStatus !== data.noiseSensorStatus) {
    ops.push(
      Event.create({
        name: data.noiseSensorStatus ? "sensor-working" : "sensor-stop",
        timestamp: new Date(),
        extra: "noise-sensor",
      }),
    );
  }

  await Promise.all(ops);
}
