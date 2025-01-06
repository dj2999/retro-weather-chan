// src/consts/provincetracking.consts.ts
import { DEFAULT_WEATHER_STATION_ID } from "./server.consts";
import { readFileSync, writeFileSync } from "fs";

export const PROVINCE_TRACKING_DEFAULT_STATIONS = loadProvinceTrackingStations();

export const PROVINCE_TRACKING_TEMP_TO_TRACK = {
  MIN_TEMP: "min",
  MAX_TEMP: "max",
};

export const PROVINCE_TRACKING_MAX_STATIONS = 6;

function loadProvinceTrackingStations() {
  try {
    const data = readFileSync("./config/province_stations.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    // Fallback to default stations if the config file is not found or invalid
    return [
      { name: "Winnipeg", code: `MB/${DEFAULT_WEATHER_STATION_ID}` },
      { name: "Portage", code: "MB/s0000626" },
      { name: "Brandon", code: "MB/s0000492" },
      { name: "Dauphin", code: "MB/s0000508" },
      { name: "Kenora", code: "ON/s0000651" },
      { name: "Thompson", code: "MB/s0000695" },
    ];
  }
}

export function saveProvinceTrackingStations(stations) {
  writeFileSync("./config/province_stations.json", JSON.stringify(stations, null, 2), "utf8");
}
