import { NationalStationConfig } from "./national.types";
import { ProvinceStation } from "./provincetracking.types";
import { USAStationConfig } from "./usa.types";

export type StationDataFile = {
  national: {
    mb: NationalStationConfig[];
    east: NationalStationConfig[];
    west: NationalStationConfig[];
  };
  usa: USAStationConfig[];
  provinceTrackingDefaults: ProvinceStation[];
};
