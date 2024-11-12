// Elements

const locationIdElement = document.getElementById('locationId');
const startDateElement = document.getElementById('startDate');
const endDateElement = document.getElementById('endDate');

// Button Element
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// Span Element
const runningSpan = document.getElementById('runningSpan');
const stoppedSpan = document.getElementById('stoppedSpan');

// ErrorMessageListeners

const locationIdError = document.getElementById('locationIdError');
const startDateError = document.getElementById('startDateError');
const endDateError = document.getElementById('endDateError');

const hideElement = (element) => {
  element.style.display = 'none';
};

const showElement = (element) => {
  element.style.display = '';
};

const disbleElement = (element) => {
  element.disabled = true;
  element.style.cursor = 'not-allowed';
};
const enableElement = (element) => {
  element.disabled = false;
  element.style.cursor = '';
};

const handleOnStartState = () => {
  // spans
  showElement(runningSpan);
  hideElement(stoppedSpan);
  // Buttons
  disbleElement(startButton); // Fixed typo here
  enableElement(stopButton);
  // Inputs
  disbleElement(locationIdElement);
  disbleElement(startDateElement);
  disbleElement(endDateElement);
};

const handleOnStopState = () => {
  // Spans
  showElement(stoppedSpan);
  hideElement(runningSpan);
  // Buttons
  disbleElement(stopButton);
  enableElement(startButton);

  // Inputs
  enableElement(locationIdElement);
  enableElement(startDateElement);
  enableElement(endDateElement);
};

const performOnStartValidations = () => {
  if (!locationIdElement.value) {
    showElement(locationIdError);
  } else {
    hideElement(locationIdError);
  }
  if (!startDateElement.value) {
    showElement(startDateError);
  } else {
    hideElement(startDateError);
  }

  if (!endDateElement.value) {
    showElement(endDateError);
  } else {
    hideElement(endDateError);
  }

  return (
    locationIdElement.value && startDateElement.value && endDateElement.value
  );
};

startButton.onclick = () => {
  const allfirldsValid = performOnStartValidations();
  if (allfirldsValid) {
    handleOnStartState();
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
  }
};

stopButton.onclick = () => {
  handleOnStopState();
  chrome.runtime.sendMessage({ event: 'OnStop' });
};

// Get Values from Storage
chrome.storage.local.get(
  ['locationId', 'startDate', 'endDate', 'locations', 'isRunning'],
  (result) => {
    const { locationId, startDate, endDate, locations, isRunning } = result;

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

    // for Persistense
    if (isRunning) {
      handleOnStartState();
    } else {
      handleOnStopState();
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
