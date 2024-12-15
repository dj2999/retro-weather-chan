import { DEFAULT_WEATHER_STATION_ID } from "./server.consts";

export const PROVINCE_TRACKING_DEFAULT_STATIONS = [
  { name: "Edmonton", code: `AB/${DEFAULT_WEATHER_STATION_ID}` },
  { name: "Jasper", code: "AB/s0000218" },
  { name: "Calgary", code: "AB/s0000047" },
  { name: "Lethbridge", code: "AB/s0000652" },
  { name: "Grande Prairie". code: "AB/s0000661" },
  { name: "High Level", code: "AB/s0000621" },
  { name: "Saskatoon", code: "SK/s0000797" },
];

export const PROVINCE_TRACKING_TEMP_TO_TRACK = {
  MIN_TEMP: "min",
  MAX_TEMP: "max",
};

export const PROVINCE_TRACKING_MAX_STATIONS = 6;
