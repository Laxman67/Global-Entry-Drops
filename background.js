import fetchLocations from './api/fetchLocationStatus.js';
const ALARM_JOB_NAME = 'DROP_ALARM';

chrome.runtime.onInstalled.addListener(() => {
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
  stopAlarm();
};

const handleOnStart = (prefs) => {
  console.log('On Start in Background');
  console.log('prefs : ', prefs);
  //   Storage
  chrome.storage.local.set(prefs);
  createAlarm();
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

chrome.alarms.onAlarm.addListener(() => {
  console.log('OnAlarm schedules code running...');
});
