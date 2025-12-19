import { getNationalStationData } from "lib/stationData";
import { NationalStationConfig } from "types";

const nationalStationData = getNationalStationData();

export const MB_WEATHER_STATIONS: NationalStationConfig[] = nationalStationData.mb;
export const WEST_WEATHER_STATIONS: NationalStationConfig[] = nationalStationData.west;
export const EAST_WEATHER_STATIONS: NationalStationConfig[] = nationalStationData.east;

export const MAX_NATIONAL_STATIONS_PER_PAGE = 7;
export const MAX_NATIONAL_STATION_NAME_LENGTH = 13;
export const MIN_NATIONAL_STATIONS_NEEDED_TO_DISPLAY = 2;
export const NATIONAL_WEATHER_FETCH_INTERVAL = 5 * 60 * 1000;
