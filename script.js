// DOM Elements
const timer = document.getElementById("timer");
const selectHourElement = document.getElementById("hours");
const selectMinuteElement = document.getElementById("minutes");
const selectSecondElement = document.getElementById("seconds");
const alarmBoxElement = document.getElementById("set-alarm-container");
const setAlarmBtnElement = document.getElementById("set-alarm");
const selectTimeZoneElement = document.getElementById("am-pm");
const stopAlarmElement = document.getElementById("stop-alarm");

// Variables
const alarmArray = [];
let idNumber = 0;

// Event Listeners
setAlarmBtnElement.addEventListener("click", alarmContainer);

// Functions

// Function to display and update the current time every second
function updateTime() {
  let time = new Date().toLocaleTimeString();
  timer.textContent = `${time}`;
  ringAlarm();
}
setInterval(updateTime, 1000);
// Function to populate hour dropdown (1-12)
function selectHour() {
  for (let i = 1; i <= 12; i++) {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = i;
    optionElement.value = i.toString();
    selectHourElement.append(optionElement);
  }
}

// Function to populate minute dropdown (1-59)
function selectMinutes() {
  for (let i = 1; i < 60; i++) {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = i < 10 ? `0${i}` : i;
    optionElement.value = i < 10 ? `0${i}` : i.toString();
    selectMinuteElement.append(optionElement);
  }
}

// Function to populate second dropdown (1-59)
function selectSeconds() {
  for (let i = 1; i < 60; i++) {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = i < 10 ? `0${i}` : i;
    optionElement.value = i < 10 ? `0${i}` : i.toString();
    selectSecondElement.append(optionElement);
  }
}

// Function to handle setting an alarm
function alarmContainer() {
  const alarmElement = document.createElement("div");
  alarmElement.classList.add("alarm-element");
  alarmElement.id = idNumber++;

  const hours = selectHourElement.value;
  const minutes = selectMinuteElement.value;
  const seconds = selectSecondElement.value;
  const timeZone = selectTimeZoneElement.value;
  const time = `${hours}:${minutes}:${seconds} ${timeZone}`;

  if (
    time !== "HH:MM:SS AM" &&
    time !== "HH:MM:SS PM" &&
    !alarmArray.includes(time) &&
    alarmArray.length <= 5
  ) {
    alarmArray.push(time);

    console.log(alarmArray);

    alarmElement.innerHTML = `<h4>${time}</h4> 
      <button class="delete-btn">Delete</button>`;

    alarmBoxElement.append(alarmElement);

    const deleteAlarmBtnElement = alarmElement.querySelector(".delete-btn");
    deleteAlarmBtnElement.addEventListener("click", () => {
      alarmElement.remove();
      const alarmToDelete = deleteAlarmBtnElement.innerHTML;
      console.log(alarmToDelete);
    });
  }
}

// Function to check and ring the alarm
function ringAlarm() {
  const currentTime = new Date().toLocaleTimeString();
  if (alarmArray.includes(currentTime)) {
    ring();
  }
}

// Function to play the alarm sound
function ring() {
  const audioElement = document.createElement("audio");
  const stopAlarm = document.createElement("button");
  stopAlarm.classList.add("stop-alarm-btn");
  stopAlarm.innerHTML = "Stop Alarm";
  audioElement.src = "Faded.mp3";
  audioElement.autoplay = true;
  stopAlarmElement.append(audioElement, stopAlarm);
  alert("Alarm started successfully");
  stopAlarm.addEventListener("click", () => {
    audioElement.remove();
    stopAlarm.remove();
  });
}

// Initialize dropdowns and start updating time
selectHour();
selectMinutes();
selectSeconds();
updateTime();
