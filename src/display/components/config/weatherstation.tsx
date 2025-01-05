import { ChangeEvent, FormEvent, useState } from "react";
import { Stack, Text, FormControl, FormLabel, Input, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, useToast, Heading, Select } from "@chakra-ui/react";
import axios from "lib/axios";
import { ECCCWeatherStation, PrimaryLocation } from "types";

type WeatherStationConfigProps = { weatherStation: PrimaryLocation };

export function WeatherStationConfig({ weatherStation }: WeatherStationConfigProps) {
  const toast = useToast();
  const [search, setSearch] = useState<string>();
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Array<ECCCWeatherStation>>();
  const [isUpdatingPrimaryLocation, setIsUpdatingPrimaryLocation] = useState<string>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSearching || !search?.length) return;
    setIsSearching(true);

    axios
      .post("config/stations", { search })
      .then((resp) => {
        const {
          data: { results },
        } = resp;

        setResults(results);
      })
      .catch(() => {})
      .finally(() => setIsSearching(false));
  };

  const selectStation = (station: ECCCWeatherStation) => {
    toast.closeAll();
    setIsUpdatingPrimaryLocation(station.location);

    axios
      .post("config/primaryLocation", { station })
      .then(() => {
        toast({
          title: "Weather station updated",
          description: "Your main weather station has been updated, changes will take affect shortly",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Unable to save",
          description: "An error occured updating your weather station, please try again",
          status: "error",
        });
      })
      .finally(() => setIsUpdatingPrimaryLocation(undefined));
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    axios
      .post("config/primaryLocationByCity", { city })
      .then(() => {
        toast({
          title: "Weather station updated",
          description: `Your main weather station has been updated to ${city}, changes will take affect shortly`,
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Unable to save",
          description: "An error occured updating your weather station, please try again",
          status: "error",
        });
      });
  };

  return (
    <Stack spacing={6}>
      <Stack>
        <Text>Configure the weather station that the observed conditions will be fetched from.</Text>
        <Text fontSize="sm" color={"gray"}>
          <b>Note:</b> Not all weather stations have the conditions (such as sunny, cloudy, rain, etc.) observed. Some
          stations are also manually operated and may not update outside of business hours.
        </Text>
      </Stack>

      <Stack>
        <Text>
          <b>Current Station:</b>{" "}
          {weatherStation && (
            <>
              {weatherStation.name}, {weatherStation.province} ({weatherStation.location})
            </>
          )}
          {!weatherStation && <>Default</>}
        </Text>
      </Stack>

      <Stack>
        <Heading as="h2" size="md">
          Select City
        </Heading>
        <FormControl>
          <Select placeholder="Select city" onChange={handleCityChange}>
            <option value="Winnipeg">Winnipeg</option>
            <option value="Edmonton">Edmonton</option>
          </Select>
        </FormControl>
      </Stack>

      <Stack>
        <Heading as="h2" size="md">
          Search weather stations
        </Heading>

        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>Town/City Name</FormLabel>
            <Input value={search} onChange={handleSearchChange} />
            <FormHelperText>This will be the main weather station for the channel</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            mt={4}
            colorScheme="teal"
            isLoading={isSearching}
            isDisabled={!search || search.length < 3}
          >
            Search
          </Button>
        </form>
      </Stack>

      {results && (
        <Stack>
          <Heading as="h3" size="md">
            Available weather stations
          </Heading>

          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Th>Name</Th>
                <Th>Province</Th>
                <Th>Station Code</Th>
                <Th></Th>
              </Thead>
              <Tbody>
                {results?.length ? (
                  results.map((station) => (
                    <Tr key={station.location}>
                      <Td>{station.name}</Td>
                      <Td>{station.province}</Td>
                      <Td>{station.location}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          onClick={() => selectStation(station)}
                          isLoading={isUpdatingPrimaryLocation === station.location}
                        >
                          Select
                        </Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={4}>No stations found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
}
