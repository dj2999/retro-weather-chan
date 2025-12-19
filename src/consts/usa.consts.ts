import { getUSAStationData } from "lib/stationData";
import { USAStationConfig } from "types";

export const USA_WEATHER_STATIONS: USAStationConfig[] = getUSAStationData();

export const MAX_USA_STATIONS_PER_PAGE = 7;
export const MAX_USA_STATION_NAME_LENGTH = 13;
export const MIN_USA_STATIONS_NEEDED_TO_DISPLAY = 2;
