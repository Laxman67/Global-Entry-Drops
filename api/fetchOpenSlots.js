// Fetch the list of open interview at a location in a given period of time

export const fetchOpenSlots = async (result) => {
  // https://ttp.cbp.dhs.gov/schedulerapi/locations/9240/slots?startTimestamp=2024-11-11T00:00:00&endTimestamp=2024-12-22T00:00:00
  console.log(result);

  const { locationId, startDate, endDate } = result;

  const oppointmentUrl = `https://ttp.cbp.dhs.gov/schedulerapi/locations/${locationId}/slots?startTimestamp=${startDate}T00:00:00&endTimestamp=${endDate}T00:00:00`;

  await fetch(oppointmentUrl)
    .then((response) => response.json())
    .then((data) => {
      data.filter(() => slot.active > 0);
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
