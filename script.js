// Showing Present or Real Time
const presentTime = document.querySelector('h1');

let alarmTime = null;
let alarmTimeout = null;

const comingAlarmList = document.querySelector('#upcoming-alarms-list');
const addAlarm = document.querySelector('.Alarm-set');

const AlarmList = []; // It contains already set alarms 

//Alerts when alarms starts
function rightTime(realTime) {
    alert(`It's ${realTime}`);
}

// For Real Time
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const realTime = `${hour}:${minutes}:${seconds}`;

    presentTime.innerText = `${hour}:${minutes}:${seconds}`;

    //     check if the alarmList includes the present or current time , "realTime"
    //     if yes, ring() is called
    if (AlarmList.includes(realTime)) {
        rightTime(realTime);
    }
}

// Adding 0 for number less than 10
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// To Stop the Alarm
function stopAlarm() {
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
}

// For Deleting the Alarm from the list
comingAlarmList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});

// For removing alarm from the array
remove = (value) => {
    let newList = AlarmList.filter((time) => time != value);
    AlarmList.length = 0; // Clear contents
    AlarmList.push.apply(AlarmList, newList);
}

// For adding new alarm to the list
function addNewAlarm(newAlarm) {
    const html = 
    `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    comingAlarmList.innerHTML += html
};

// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', event => {

    event.preventDefault(); // to prevent default behaviour of webpage

    let hour = formatTime(addAlarm.hr.value);
    if (hour === '0') {
        hour = '00'
    }
    let minute = formatTime(addAlarm.min.value);
    if (minute === '0') {
        minute = '00'
    }
    let second = formatTime(addAlarm.sec.value);
    if (second === '0') {
        second = '00'
    }

    const newAlarm = `${hour}:${minute}:${second}`

    // add newAlarm to alarmList array
    if (isNaN(newAlarm)) {
        if (!AlarmList.includes(newAlarm)) {
            AlarmList.push(newAlarm);
            addNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})


// updateTime() every second
setInterval(updateTime, 1000);

