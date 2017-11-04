var background = chrome.extension.getBackgroundPage();
//var values = new Array(10, 15, 20, 30, 60);
var values = new Array(1, 2, 3, 4, 5);

function changeInterval(interval) {
  background.interval = interval;
  var label = document.getElementById('interval_label');
  label.innerHTML = interval === 60 ? "hour" : interval + " minutes";
  var int = background.millisTillNext();
  background.timeout = setTimeout(background.promptUser, int);
}

function getSavedInterval(callback) {
  chrome.storage.sync.get('interval', (interval) => {
    callback(chrome.runtime.lastError ? null : interval);
  });
}

function saveInterval(interval) {
  chrome.storage.sync.set({'interval':interval});
}

document.addEventListener('DOMContentLoaded', () => {
  var interval = document.getElementById('interval');
  document.getElementById('test').addEventListener('click', () => {
    background.message('Testing...');
  });
  getSavedInterval((savedInterval) => {
    if (savedInterval) {
      changeInterval(savedInterval['interval']);
      interval.value = values.indexOf(savedInterval['interval']);
    }
  });
  interval.addEventListener('change', () => {
    var value = values[interval.value];
    changeInterval(value);
    saveInterval(value);
  });
});
