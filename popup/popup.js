// Elements

const locationIdElement = document.getElementById('locationId');
const startDateElement = document.getElementById('startDate');
const endDateElement = document.getElementById('endDate');

// Button Element
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('stopButton');

startButton.onclick = () => {
  const prefs = {
    locationId: locationIdElement.value,
    startDate: startDateElement.value,
    endDate: endDateElement.value,
    tzData:
      locationIdElement.options[locationIdElement.selectedIndex].getAttribute(
        'data-tz'
      ),
  };
  chrome.runtime.sendMessage({ event: 'OnStart', prefs });
};
stopButton.onclick = () => {
  chrome.runtime.sendMessage({ event: 'OnStop' });
};

// Get Values from Storage
chrome.storage.local.get(
  ['locationId', 'startDate', 'endDate', 'locations'],
  (result) => {
    const { locationId, startDate, endDate, locations } = result;

    setLocations(locations);

    if (locationId) {
      locationIdElement.value = locationId;
    }
    if (startDate) {
      startDateElement.value = startDate;
    }
    if (endDate) {
      endDateElement.value = endDate;
    }
  }
);

const setLocations = (locations) => {
  locations.forEach((location) => {
    let optionElement = document.createElement('option');
    optionElement.value = location.id; //<option value={value}><option/>
    optionElement.innerHTML = location.name; //<option value={value}>...Name..<option/>
    optionElement.setAttribute('data-tz', location.tzData); //<option value={value} data-tz="America/New_York"><option/>
    locationIdElement.appendChild(optionElement);
  });
};
