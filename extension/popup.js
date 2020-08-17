const toggleSwitch = document.getElementById('toggle');
const checkBox = document.getElementById('toggle-check');

const clock = document.getElementsByClassName('time')[0];

let startTime = null;
let timer = null;

// We need to force a load screen until this completes.
chrome.runtime.sendMessage({
    action: "getStatus"
}, (response) => {

    if (response.startTime !== null) {
        // Setting the value like this will not trigger
        //  change event.
        checkBox.checked = true;
        startTimer(response.startTime);
    }
});


// chrome.tabs.remove(id) will close a tab by tabId.

// toggleSwitch.addEventListener('change', () => {
//     if (this.checked) startMonitoring();
//     else stopMonitoring();
// });

// Time function needs to be offloaded to background,
//  popup ceases to run once closed.  Duh.

toggleSwitch.addEventListener('change', () => {
    console.log('toggle change')

    if (checkBox.checked) {
        startMonitoring();
    } else {
        stopMonitoring();
    }
});


const startMonitoring = () => {
    chrome.runtime.sendMessage({
        action: "startWork"
    }, (response) => {
        startTimer(response.startTime);
    });
};

const stopMonitoring = () => {
    chrome.runtime.sendMessage({
        action: "stopWork"
    }, () => {
        clearInterval(timer);
    });
};

// This suffers from drift, low priority,
//  but is fixable later.
const startTimer = (startTime) => {
    this.startTime = startTime;

    timer = setInterval(() => {
        let nextTime =
            msToTime(Date.now() - this.startTime);
        clock.textContent = nextTime;
    }, 1000);
}

const msToTime = (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}




