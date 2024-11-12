import fetchLocations from './api/fetchLocationStatus.js';
const ALARM_JOB_NAME = 'DROP_ALARM';

chrome.runtime.onInstalled.addListener(({ reason }) => {
  fetchLocations();
});

chrome.runtime.onMessage.addListener((data) => {
  const { event, prefs } = data;
  switch (event) {
    case 'OnStop':
      handleOnStop();

      break;
    case 'OnStart':
      handleOnStart(prefs);
      break;

    default:
      break;
  }
});

const handleOnStop = () => {
  console.log('On Stop in backgrounds');
  setRunningStatus(false);

  stopAlarm();
};

const handleOnStart = (prefs) => {
  console.log('prefs : ', prefs);
  chrome.storage.local.set(prefs);
  setRunningStatus(true);

  createAlarm();
};

const setRunningStatus = (isRunning) => {
  // set({ isRunning: true });
  chrome.storage.local.set({ isRunning });
};
const createAlarm = () => {
  chrome.alarms.get(ALARM_JOB_NAME, (existingAlarm) => {
    if (!existingAlarm) {
      chrome.alarms.create(ALARM_JOB_NAME, { periodInMinutes: 1 });
    }
  });
};

const stopAlarm = () => {
  chrome.alarms.clearAll();
};

// This code will run each min when alarms went off
chrome.alarms.onAlarm.addListener(() => {
  console.log('OnAlarm schedules code running...');
});
