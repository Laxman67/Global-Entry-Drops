const LOCATION_URL =
  'https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true';

export const fetchLocations = () => {
  fetch(LOCATION_URL)
    .then((response) => response.json())
    .then((data) => {
      const filteredLocations = data.map((loc) => ({
        id: loc.id,
        name: loc.name,
        shortName: loc.shortName,
        tzData: loc.tzData,
      }));

      filteredLocations.sort((a, b) => a.name.localeCompare(b.name));
      chrome.storage.local.set({ locations: filteredLocations });
      // console.log(filteredLocations);
    })
    .catch((error) => {
      console.log(error);
    });
};
